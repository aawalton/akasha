"""Narration sessions: chapters read aloud as one growing HLS stream.

A session takes the chapters the web server hands it, in order. Each chapter
is a list of segments the caller already divided, each with the pause after
it. Every segment is synthesized under the shared inference lock, one segment
at a time, so other callers interleave between segments. The PCM of every
segment and its pause is fed to ONE ffmpeg AAC encoder per session, so no
encoder priming falls between segments or chapters. The encoded pieces stay
in this process's memory (voice_hls) and nothing is written to disk.

  POST   /v1/narration                 {"voice","chapter","segments"} -> 201 {"id"}
  POST   /v1/narration/{id}/chapters   {"chapter","segments"}         -> 200
  POST   /v1/narration/{id}/end        no more chapters               -> 200
  GET    /v1/narration/{id}            {"state","error","ended","renderedSeconds"}
  GET    /v1/narration/{id}/playlist.m3u8
  GET    /v1/narration/{id}/chapters   [{"id","title","startSeconds","durationSeconds"}]
  GET    /v1/narration/{id}/{name}     init.mp4 or pNNNNN.m4s
  DELETE /v1/narration/{id}
A session nobody fetches for SESSION_IDLE_SECONDS is dropped. At most
MAX_SESSIONS live at once; a new one drops the oldest.
"""

import asyncio
import secrets
import time

from fastapi import Request
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import JSONResponse, Response

from voice_hls import SAMPLE_RATE, Pieces, encoder_args, piece_index, playlist
from voice_inference import _INFER_LOCK, _pcm_bytes, _synthesize, app

BITRATE = "64k"
MAX_SESSIONS = 2
SESSION_IDLE_SECONDS = 30 * 60
MAX_SESSION_BYTES = 256 * 1024 * 1024
MAX_SEGMENTS = 3000
MAX_SEGMENT_CHARS = 2000
MAX_PAUSE_MS = 5000
# A player treats a playlist with no end as live and leaps to near its newest
# piece. Rendering runs far ahead of listening, so the playlist names only a
# few pieces past the furthest one the player has fetched.
REVEAL_AHEAD = 3

_SESSIONS: "dict[str, Session]" = {}
_SWEEPER: "list[asyncio.Task]" = []


def _error(status: int, message: str) -> JSONResponse:
    return JSONResponse(status_code=status, content={"error": message})


def _segments_of(body: dict) -> "tuple[list[tuple[str, int]] | None, str | None]":
    segments = body.get("segments")
    if not isinstance(segments, list) or not segments:
        return None, "segments must be a non-empty list"
    if len(segments) > MAX_SEGMENTS:
        return None, f"at most {MAX_SEGMENTS} segments"
    out: "list[tuple[str, int]]" = []
    for n, seg in enumerate(segments):
        if not isinstance(seg, dict) or not isinstance(seg.get("text"), str):
            return None, f"segment {n} needs a string text"
        text, pause = seg["text"], seg.get("pauseAfterMs", 0)
        if len(text) > MAX_SEGMENT_CHARS:
            return None, f"segment {n} runs past {MAX_SEGMENT_CHARS} characters"
        if isinstance(pause, bool) or not isinstance(pause, int) or not 0 <= pause <= MAX_PAUSE_MS:
            return None, f"segment {n} pauseAfterMs must be an integer from 0 to {MAX_PAUSE_MS}"
        out.append((text.strip(), pause))
    if not any(text for text, _ in out):
        return None, "every segment is empty"
    return out, None


def _chapter_of(body: dict) -> "tuple[dict | None, str | None]":
    chapter = body.get("chapter")
    if not isinstance(chapter, dict):
        return None, "chapter must be an object"
    cid, title = chapter.get("id"), chapter.get("title")
    if not isinstance(cid, str) or not cid or not isinstance(title, str):
        return None, "chapter needs a string id and title"
    return {"id": cid, "title": title}, None


class Session:
    def __init__(self, voice: str) -> None:
        self.id = secrets.token_urlsafe(12)
        self.voice = voice
        self.created = time.monotonic()
        self.touched = self.created
        self.queue: "asyncio.Queue" = asyncio.Queue()
        self.chapters: "list[dict]" = []
        self.fed_samples = 0
        self.ended = False
        self.done = False
        self.error: "str | None" = None
        self.pieces = Pieces()
        self.furthest = -1
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

    async def _speak(self, text: str, pause: int) -> None:
        pcm = b""
        if text:
            async with _INFER_LOCK:
                audio = await run_in_threadpool(_synthesize, text, self.voice)
            if audio is not None:
                pcm = _pcm_bytes(audio)
        pcm += b"\x00\x00" * (SAMPLE_RATE * pause // 1000)
        if self.pieces.bytes > MAX_SESSION_BYTES:
            raise RuntimeError("narration ran past the memory a session may hold")
        self.process.stdin.write(pcm)
        await self.process.stdin.drain()
        self.fed_samples += len(pcm) // 2

    async def _render(self) -> None:
        try:
            while (item := await self.queue.get()) is not None:
                chapter, segments = item
                start = self.fed_samples / SAMPLE_RATE
                record = {**chapter, "startSeconds": start, "durationSeconds": None}
                self.chapters.append(record)
                for text, pause in segments:
                    await self._speak(text, pause)
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

    def state(self) -> str:
        if self.error:
            return "failed"
        return "done" if self.done else "rendering"


def _session(sid: str) -> "Session | None":
    session = _SESSIONS.get(sid)
    if session is not None:
        session.touched = time.monotonic()
    return session


def _drop(sid: str) -> None:
    session = _SESSIONS.pop(sid, None)
    if session is not None:
        session.close()


async def _sweep() -> None:
    while True:
        await asyncio.sleep(60)
        now = time.monotonic()
        for sid, session in list(_SESSIONS.items()):
            if now - session.touched > SESSION_IDLE_SECONDS:
                _drop(sid)


async def _body(request: Request) -> "tuple[dict | None, list | None, str | None]":
    try:
        body = await request.json()
    except Exception:
        body = None
    if not isinstance(body, dict):
        return None, None, "body must be a JSON object"
    chapter, problem = _chapter_of(body)
    if problem:
        return None, None, problem
    segments, problem = _segments_of(body)
    if problem:
        return None, None, problem
    return {"body": body, "chapter": chapter}, segments, None


@app.post("/v1/narration")
async def narration_create(request: Request):
    given, segments, problem = await _body(request)
    if problem:
        return _error(400, problem)
    voice = given["body"].get("voice") or "af_heart"
    if not isinstance(voice, str):
        return _error(400, "voice must be a string")
    if not _SWEEPER:
        _SWEEPER.append(asyncio.create_task(_sweep()))
    while len(_SESSIONS) >= MAX_SESSIONS:
        _drop(min(_SESSIONS.values(), key=lambda s: s.created).id)
    session = Session(voice)
    try:
        await session.start()
    except Exception as exc:
        session.close()
        return _error(500, f"encoder did not start: {exc}")
    _SESSIONS[session.id] = session
    session.queue.put_nowait((given["chapter"], segments))
    return JSONResponse(status_code=201, content={"id": session.id})


@app.post("/v1/narration/{sid}/chapters")
async def narration_append(sid: str, request: Request):
    session = _session(sid)
    if session is None:
        return _error(404, "no such narration")
    if session.ended:
        return _error(409, "narration has ended")
    given, segments, problem = await _body(request)
    if problem:
        return _error(400, problem)
    session.queue.put_nowait((given["chapter"], segments))
    return {"ok": True}


@app.post("/v1/narration/{sid}/end")
async def narration_end(sid: str):
    session = _session(sid)
    if session is None:
        return _error(404, "no such narration")
    session.end()
    return {"ok": True}


@app.get("/v1/narration/{sid}")
async def narration_state(sid: str):
    session = _session(sid)
    if session is None:
        return _error(404, "no such narration")
    return {
        "state": session.state(),
        "error": session.error,
        "ended": session.ended,
        "renderedSeconds": session.pieces.seconds(),
    }


@app.get("/v1/narration/{sid}/playlist.m3u8")
async def narration_playlist(sid: str):
    session = _session(sid)
    if session is None:
        return _error(404, "no such narration")
    if session.error:
        return _error(500, session.error)
    made = session.pieces.pieces
    shown = made[: session.furthest + 1 + REVEAL_AHEAD]
    return Response(
        content=playlist(shown, session.done and len(shown) == len(made)),
        media_type="application/vnd.apple.mpegurl",
        headers={"Cache-Control": "no-store"},
    )


@app.get("/v1/narration/{sid}/chapters")
async def narration_chapters(sid: str):
    session = _session(sid)
    if session is None:
        return _error(404, "no such narration")
    return session.chapters


@app.get("/v1/narration/{sid}/{name}")
async def narration_piece(sid: str, name: str):
    session = _session(sid)
    if session is None:
        return _error(404, "no such narration")
    headers = {"Cache-Control": "private, max-age=3600"}
    if name == "init.mp4":
        if session.pieces.init is None:
            return _error(404, "init section not made yet")
        return Response(content=session.pieces.init, media_type="audio/mp4", headers=headers)
    n = piece_index(name)
    if n is None:
        return _error(404, "no such piece")
    if n >= len(session.pieces.pieces):
        return _error(404, "piece not made yet")
    session.furthest = max(session.furthest, n)
    return Response(content=session.pieces.pieces[n][0], media_type="audio/mp4", headers=headers)


@app.delete("/v1/narration/{sid}")
async def narration_delete(sid: str):
    if sid not in _SESSIONS:
        return _error(404, "no such narration")
    _drop(sid)
    return {"ok": True}
