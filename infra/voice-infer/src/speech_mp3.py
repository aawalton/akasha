"""POST /v1/audio/speech/mp3 — the whole-MP3 render path.

Encodes the caller-provided segments to one complete MP3 through a streaming
ffmpeg subprocess and PUTs it to the object store, in the background, behind an
immediate 202.
"""

import asyncio

from fastapi.concurrency import run_in_threadpool
from fastapi.responses import JSONResponse

from object_store import _put_object_sync
from voice_inference import (
    _BG_RENDER_TASKS,
    _INFER_LOCK,
    _MP3_BITRATE,
    _STREAM_SAMPLE_RATE,
    _coerce_segments,
    _pcm_bytes,
    _synthesize,
    app,
)


async def _encode_mp3(segments: "list[str]", voice: str) -> "bytes | None":
    """Synthesize the caller-provided segments one-by-one and LAME-encode them to
    a complete MP3 via an ffmpeg subprocess. PCM is piped to ffmpeg stdin as each
    segment is synthesized (GPU working set stays one segment); the MP3 is drained
    off ffmpeg stdout CONCURRENTLY so the OS pipe never deadlocks on a large
    render. Returns the full MP3 bytes ONLY on a clean, complete encode, or None
    when no audio was produced or ffmpeg exited non-zero — so the caller PUTs to
    the store only a whole rendition, never a truncated one."""
    proc = await asyncio.create_subprocess_exec(
        "ffmpeg", "-hide_banner", "-loglevel", "error",
        "-f", "s16le", "-ar", str(_STREAM_SAMPLE_RATE), "-ac", "1", "-i", "pipe:0",
        "-b:a", _MP3_BITRATE, "-f", "mp3", "pipe:1",
        stdin=asyncio.subprocess.PIPE,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    assert proc.stdin is not None and proc.stdout is not None and proc.stderr is not None

    mp3_chunks: list[bytes] = []

    async def _drain_stdout() -> None:
        while True:
            chunk = await proc.stdout.read(65536)
            if not chunk:
                break
            mp3_chunks.append(chunk)

    drain_task = asyncio.create_task(_drain_stdout())
    produced = False
    try:
        async with _INFER_LOCK:
            for segment in segments:
                audio = await run_in_threadpool(_synthesize, segment, voice)
                if audio is None:
                    continue
                produced = True
                proc.stdin.write(_pcm_bytes(audio))
                await proc.stdin.drain()
        proc.stdin.close()
    finally:
        await proc.wait()
        await drain_task
    if proc.returncode != 0 or not produced:
        return None
    return b"".join(mp3_chunks)


_MP3_RENDER_KEYS: set[str] = set()


async def _render_and_store(segments: "list[str]", voice: str, key: str) -> None:
    """Render the caller-provided segments to a complete MP3, then PUT it to the
    store at `key`. PUT happens ONLY on a clean, non-empty encode, so a truncated
    or failed render caches nothing and the web's next poll re-triggers. Always
    clears the in-flight key so the trigger stays re-fireable."""
    try:
        mp3 = await _encode_mp3(segments, voice)
        if not mp3:
            print(f"[voice-infer] mp3 render produced no audio, key={key}", flush=True)
            return
        await run_in_threadpool(_put_object_sync, key, mp3)
        print(f"[voice-infer] stored mp3 key={key} bytes={len(mp3)}", flush=True)
    except Exception as exc:
        print(f"[voice-infer] mp3 render/store FAILED key={key}: {exc}", flush=True)
    finally:
        _MP3_RENDER_KEYS.discard(key)


@app.post("/v1/audio/speech/mp3")
async def speech_mp3(body: dict):
    """Fire-and-store sibling of /v1/audio/speech/stream (#15732). Accepts
    {"segments","voice","key"}, ACKS IMMEDIATELY with 202, and renders the
    caller-provided segments to a complete 24 kHz mono 64 kbps CBR MP3 in the
    BACKGROUND, then SigV4-PUTs it to the object store at `key`. The early ack is
    the point: the web ensure route never holds a connection open across the
    multi-minute render (the ~10-min idle connection that A's complete-file fetch
    could not survive), it just polls the store until the object lands. The
    raw-PCM /stream route and its X-Sample-* contract are untouched."""
    segments = _coerce_segments(body)
    if segments is None:
        return JSONResponse(status_code=400, content={"error": "empty segments"})
    key = (body or {}).get("key")
    if not isinstance(key, str) or not key.strip():
        return JSONResponse(status_code=400, content={"error": "missing key"})
    voice = (body or {}).get("voice") or "af_heart"
    if key in _MP3_RENDER_KEYS:
        return JSONResponse(status_code=202, content={"status": "already-rendering", "key": key})
    _MP3_RENDER_KEYS.add(key)
    task = asyncio.create_task(_render_and_store(segments, voice, key))
    _BG_RENDER_TASKS.add(task)
    task.add_done_callback(_BG_RENDER_TASKS.discard)
    return JSONResponse(status_code=202, content={"status": "accepted", "key": key})
