"""The voice inference this server runs on, and the app that fronts it.

Holds the two models loaded onto cuda, the single lock serialising them, the
blocking calls into them, the wire and audio shapes every endpoint shares, and
the FastAPI app whose lifespan does the loading.

Nothing here imports an endpoint module, so `server.py` stays the one entrypoint
and no module is executed twice.
"""

import asyncio
import time
from contextlib import asynccontextmanager

import numpy as np
from fastapi import FastAPI


_STT = None
_TTS = None

_INFER_LOCK = asyncio.Lock()


def _transcribe(audio_f32: np.ndarray) -> str:
    """Blocking STT. faster-whisper does its work lazily as `segments` is
    consumed, so the join runs here, off the event loop."""
    segments, _info = _STT.transcribe(audio_f32, language="en", vad_filter=False)
    return "".join(seg.text for seg in segments).strip()


def _synthesize(text: str, voice: str) -> "np.ndarray | None":
    """Blocking TTS. Returns the concatenated waveform, or None if Kokoro
    produced no audio."""
    chunks = [audio for _gs, _ps, audio in _TTS(text, voice=voice)]
    if not chunks:
        return None
    return np.concatenate(chunks)


_MAX_SEGMENTS = 500


def _coerce_segments(body: dict) -> "list[str] | None":
    """Validate + normalize the `segments` wire field: a non-empty list of
    non-empty strings. Returns the trimmed-non-empty segment list (capped at
    `_MAX_SEGMENTS`, matching the TS caller's own cap), or None when the field is
    missing/malformed/empty so the caller can 400."""
    segments = (body or {}).get("segments")
    if not isinstance(segments, list) or not segments:
        return None
    out: list[str] = []
    for seg in segments:
        if not isinstance(seg, str):
            return None
        stripped = seg.strip()
        if stripped:
            out.append(stripped)
    if not out:
        return None
    return out[:_MAX_SEGMENTS]


_STREAM_SAMPLE_RATE = 24000
_STREAM_HEADERS = {
    "X-Sample-Rate": str(_STREAM_SAMPLE_RATE),
    "X-Channels": "1",
    "X-Sample-Format": "s16le",
    "Cache-Control": "no-store",
}


def _pcm_bytes(audio: np.ndarray) -> bytes:
    """Float32 waveform in [-1, 1] -> signed-16 little-endian PCM bytes."""
    clipped = np.clip(audio, -1.0, 1.0)
    return (clipped * 32767.0).astype("<i2").tobytes()


_MP3_BITRATE = "64k"

_BG_RENDER_TASKS: set = set()


def _load_models() -> None:
    """Load both models onto cuda, synchronously. Logs load durations to stdout."""
    global _STT, _TTS
    from faster_whisper import WhisperModel
    from kokoro import KPipeline

    t0 = time.monotonic()
    _STT = WhisperModel("large-v3-turbo", device="cuda", compute_type="int8")
    print(f"[voice-infer] loaded faster-whisper large-v3-turbo (int8) in "
          f"{time.monotonic() - t0:.1f}s", flush=True)

    t1 = time.monotonic()
    _TTS = KPipeline(lang_code="a", device="cuda")
    print(f"[voice-infer] loaded Kokoro (lang_code=a) in "
          f"{time.monotonic() - t1:.1f}s", flush=True)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    _load_models()
    yield


app = FastAPI(lifespan=lifespan)
