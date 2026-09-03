"""Voice-inference server for the cluster GTX 1080 Ti (node-02, Pascal sm_61).

Loads faster-whisper large-v3-turbo (int8) for STT and Kokoro (lang "a") for TTS
onto cuda at startup, then serves an OpenAI-compatible contract:
  - POST /v1/audio/transcriptions  (multipart WAV -> {"text": ...})
  - POST /v1/audio/speech          (JSON {"input","voice"} -> audio/wav bytes)
  - POST /v1/audio/speech/stream   (JSON {"segments","voice"} -> raw s16le PCM stream)
  - POST /v1/audio/speech/mp3      (JSON {"segments","voice","key"} -> 202; renders +
                                    SigV4-PUTs the finished MP3 to the object store)
  - POST /v1/audio/speech/hls      (JSON {"segments","voice","playlistKey","segmentPrefix",
                                    "mp3Key"} -> 202; renders the given segments as MP3
                                    HLS segments + a growing EVENT m3u8, finalizes to a
                                    VOD playlist + the canonical MP3 on clean completion)
  - GET  /health                   ({"status":"ok"} once both models resident)

The three streaming/render endpoints accept an ORDERED SEGMENT ARRAY (`segments`)
and synthesize exactly those segments in order — they do NOT segment text. The
canonical sentence segmentation lives ONCE in TypeScript (`splitSentences` +
`packSegments` in `@alanwalton/voice-core`); the caller packs there and passes the
result in, so audio timing marks (TS-indexed) and reader spans (TS-indexed) share
one segmenter and cannot drift (#15773). The former in-server `_segment_for_stream`
Python port (which mirrored `packSegments(splitSentences(...))`) is retired. The
non-streaming `/v1/audio/speech` still takes a single `input` (one Kokoro pass, no
segmentation) — it is the speaker-child's per-utterance path and is unchanged.

Both models load SYNCHRONOUSLY in the FastAPI lifespan before the server accepts
traffic, so /health is only 200 once inference is ready. The client falls back to
local inference on any non-200, so errors surface as HTTP 500 with {"error": ...}.

The blocking inference calls (_STT.transcribe, _TTS) are offloaded to a threadpool
via run_in_threadpool so they never block the event loop — otherwise a long
transcription would starve /health and trip the liveness probe, killing a
busy-not-dead pod (#15071). A single async lock serialises inference so freeing
the event loop does not introduce concurrent calls into the single-GPU models.

MEASURED: int8-on-Pascal runs cleanly; float16 is NOT usable on sm_61.

The two background render paths live beside this file: `speech_mp3.py` and
`speech_hls.py`, each registering its own route on the shared `app`. What they
share with the routes below — the models, the inference lock, the segment
coercion, the audio formats — is in `voice_inference.py`, and the object-store
PUTs they both write through are in `object_store.py`.
"""

import io
import os
from collections.abc import AsyncIterator

import numpy as np
import soundfile as sf
from fastapi import File, UploadFile
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import JSONResponse, Response, StreamingResponse

import speech_hls
import speech_mp3
from voice_inference import (
    _INFER_LOCK,
    _STREAM_HEADERS,
    _coerce_segments,
    _pcm_bytes,
    _synthesize,
    _transcribe,
    app,
)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


@app.post("/v1/audio/transcriptions")
async def transcriptions(file: UploadFile = File(default=None)):
    if file is None:
        return JSONResponse(status_code=400, content={"error": "missing file field"})
    try:
        raw = await file.read()
        if not raw:
            return JSONResponse(status_code=400, content={"error": "empty file"})
        audio, _sr = sf.read(io.BytesIO(raw), dtype="float32")
        if audio.ndim > 1:
            audio = audio[:, 0]
        audio_f32 = np.ascontiguousarray(audio, dtype=np.float32)

        async with _INFER_LOCK:
            text = await run_in_threadpool(_transcribe, audio_f32)
        return {"text": text}
    except Exception as exc:
        return JSONResponse(status_code=500, content={"error": str(exc)})


@app.post("/v1/audio/speech")
async def speech(body: dict):
    text = (body or {}).get("input")
    if not isinstance(text, str) or not text.strip():
        return JSONResponse(status_code=400, content={"error": "empty input"})
    voice = (body or {}).get("voice") or "af_heart"
    try:
        async with _INFER_LOCK:
            audio = await run_in_threadpool(_synthesize, text, voice)
        if audio is None:
            return JSONResponse(status_code=500, content={"error": "no audio produced"})

        buf = io.BytesIO()
        sf.write(buf, audio, 24000, format="WAV")
        return Response(content=buf.getvalue(), media_type="audio/wav")
    except Exception as exc:
        return JSONResponse(status_code=500, content={"error": str(exc)})


async def _stream_segments(segments: "list[str]", voice: str) -> AsyncIterator[bytes]:
    """Synthesize each caller-provided segment and yield its raw PCM as soon as
    it is ready, so first audio leaves the server before the whole render is
    synthesized. The single inference lock is held across the whole stream —
    the single-GPU models are never called concurrently (same invariant the
    non-streaming route holds), and the blocking synth of each segment runs in
    the threadpool so the event loop (and /health) stays answerable between
    flushes."""
    async with _INFER_LOCK:
        for segment in segments:
            audio = await run_in_threadpool(_synthesize, segment, voice)
            if audio is None:
                continue
            yield _pcm_bytes(audio)


@app.post("/v1/audio/speech/stream")
async def speech_stream(body: dict):
    """Streaming sibling of POST /v1/audio/speech. Synthesizes the caller-provided
    segments one-by-one and streams raw 24 kHz mono s16le PCM with chunked transfer
    so first audio arrives before full synthesis completes. The non-streaming route
    above is byte-identical and unchanged (add-before-remove).

    Format is headerless PCM (see _STREAM_HEADERS): a growing stream has no known
    length for a RIFF size field. Consume natively with an explicit format
    (paplay --raw / ffmpeg -f s16le -ar 24000 -ac 1) or in-browser via the Web
    Audio API."""
    segments = _coerce_segments(body)
    if segments is None:
        return JSONResponse(status_code=400, content={"error": "empty segments"})
    voice = (body or {}).get("voice") or "af_heart"
    return StreamingResponse(
        _stream_segments(segments, voice),
        media_type="audio/pcm",
        headers=_STREAM_HEADERS,
    )


if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("VOICE_INFER_PORT", "8080"))
    uvicorn.run(app, host="0.0.0.0", port=port)
