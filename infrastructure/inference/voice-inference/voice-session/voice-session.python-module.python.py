"""One narration being made: the chapters handed in, the encoder they go
through, and the pieces of audio that come out.

A session takes the chapters the web server hands it, in order. Each chapter is
a list of segments the caller already divided, each with the pause after it.
Every segment is synthesized under the shared inference lock, one segment at a
time, so other callers interleave between segments. Kokoro opens and closes each
call with several hundred milliseconds of silence, so each segment's speech is
trimmed to TRIM_MARGIN_SECONDS of quiet on either side, and the pause the caller
asked for is the gap the listener hears. The PCM of every segment and its pause
is fed to ONE ffmpeg AAC encoder per session, so no encoder priming falls
between segments or chapters.

The pieces are written under the session's own directory on the pod's disk, so a
long listen costs disk rather than this process's memory. A session renders only
while it holds less than RENDER_AHEAD_SECONDS of audio ahead of the piece the
player last fetched, so what it makes is what the player is about to hear.
"""

import asyncio
import os
import secrets
import shutil
import time

import numpy as np
from fastapi.concurrency import run_in_threadpool

from voice_hls import SAMPLE_RATE, Pieces, encoder_args
from voice_inference import _INFER_LOCK, _pcm_bytes
from voice_timing import sentence_seconds, synthesize_timed

BITRATE = "64k"
MAX_SESSION_BYTES = 4 * 1024 * 1024 * 1024
# The pieces of every session live here, one directory each. The pod mounts a
# volume here; a directory left by a process that died is cleared by the sweep.
PIECES_DIR = os.environ.get("VOICE_PIECES_DIR", "/tmp/voice-pieces")
# How much audio a session may hold ahead of the piece the player last fetched.
# The player itself keeps about ten minutes; this is that with room to spare.
RENDER_AHEAD_SECONDS = 15 * 60
TRIM_THRESHOLD = 0.01
TRIM_MARGIN_SECONDS = 0.04


def trimmed(audio: np.ndarray) -> "tuple[np.ndarray, float]":
    """The speech with its silence trimmed to TRIM_MARGIN_SECONDS on either side,
    and the seconds trimmed from its start."""
    loud = np.flatnonzero(np.abs(audio) > TRIM_THRESHOLD)
    if loud.size == 0:
        return audio, 0.0
    margin = int(SAMPLE_RATE * TRIM_MARGIN_SECONDS)
    start = max(0, int(loud[0]) - margin)
    end = min(len(audio), int(loud[-1]) + 1 + margin)
    return audio[start:end], start / SAMPLE_RATE


class Session:
    def __init__(self, voice: str) -> None:
        self.id = secrets.token_urlsafe(12)
        self.voice = voice
        self.directory = os.path.join(PIECES_DIR, self.id)
        os.makedirs(self.directory, exist_ok=True)
        self.created = time.monotonic()
        self.touched = self.created
        self.queue: "asyncio.Queue" = asyncio.Queue()
        self.chapters: "list[dict]" = []
        self.fed_samples = 0
        self.fetched_to = 0.0
        self.sentences_timed = 0
        self.sentences_shared = 0
        self.ended = False
        self.done = False
        self.error: "str | None" = None
        self.pieces = Pieces(self.directory)
        self.process: "asyncio.subprocess.Process | None" = None
        self.tasks: "list[asyncio.Task]" = []

    async def start(self) -> None:
        self.process = await asyncio.create_subprocess_exec(
            *encoder_args(BITRATE),
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        self.tasks = [asyncio.create_task(self._render()), asyncio.create_task(self._read())]

    def end(self) -> None:
        if not self.ended:
            self.ended = True
            self.queue.put_nowait(None)

    def fail(self, message: str) -> None:
        if self.error is None:
            self.error = message
            print(f"[voice-infer] narration {self.id} failed: {message}", flush=True)

    def fetched(self, n: int) -> None:
        """The player has taken a piece, so the window moves up with it."""
        self.fetched_to = max(self.fetched_to, self.pieces.end_of(n))

    async def _window(self) -> None:
        """Wait while the player already holds a window of audio to hear."""
        while self.error is None and self.pieces.seconds() - self.fetched_to > RENDER_AHEAD_SECONDS:
            await asyncio.sleep(0.5)

    async def _speak(self, text: str, pause: int, sentences: list, marks: list) -> None:
        pcm = b""
        if text:
            async with _INFER_LOCK:
                audio, starts, chars = await run_in_threadpool(synthesize_timed, text, self.voice)
            if audio is not None:
                audio, lead = trimmed(audio)
                starts = [(char, max(0.0, seconds - lead)) for char, seconds in starts]
                pcm = _pcm_bytes(audio)
            begun = self.fed_samples / SAMPLE_RATE
            timed, by_tokens = sentence_seconds(text, sentences, starts, chars, len(pcm) / 2 / SAMPLE_RATE)
            marks.extend([round(begun + s, 3), w] for s, w in timed)
            self.sentences_timed += len(timed) if by_tokens else 0
            self.sentences_shared += 0 if by_tokens else len(timed)
        pcm += b"\x00\x00" * (SAMPLE_RATE * pause // 1000)
        if self.pieces.bytes > MAX_SESSION_BYTES:
            raise RuntimeError("narration ran past the audio a session may hold")
        self.process.stdin.write(pcm)
        await self.process.stdin.drain()
        self.fed_samples += len(pcm) // 2

    async def _render(self) -> None:
        try:
            while (item := await self.queue.get()) is not None:
                chapter, segments = item
                start = self.fed_samples / SAMPLE_RATE
                record = {**chapter, "startSeconds": start, "durationSeconds": None, "marks": []}
                self.chapters.append(record)
                for text, pause, word, sentences in segments:
                    await self._window()
                    if word is not None:
                        record["marks"].append([round(self.fed_samples / SAMPLE_RATE, 3), word])
                    await self._speak(text, pause, sentences, record["marks"])
                record["durationSeconds"] = self.fed_samples / SAMPLE_RATE - start
        except asyncio.CancelledError:
            raise
        except Exception as exc:
            self.fail(str(exc) or type(exc).__name__)
        finally:
            if self.process.stdin and not self.process.stdin.is_closing():
                self.process.stdin.close()

    async def _read(self) -> None:
        try:
            while chunk := await self.process.stdout.read(65536):
                self.pieces.feed(chunk)
            code = await self.process.wait()
            if code != 0:
                err = (await self.process.stderr.read()).decode(errors="replace").strip()
                self.fail(f"encoder exited {code}: {err[-500:]}")
            self.pieces.finish()
            self.done = True
        except asyncio.CancelledError:
            raise
        except Exception as exc:
            self.fail(str(exc) or type(exc).__name__)

    def close(self) -> None:
        for task in self.tasks:
            task.cancel()
        if self.process and self.process.returncode is None:
            try:
                self.process.kill()
            except ProcessLookupError:
                pass
        shutil.rmtree(self.directory, ignore_errors=True)

    def state(self) -> str:
        if self.error:
            return "failed"
        return "done" if self.done else "rendering"
