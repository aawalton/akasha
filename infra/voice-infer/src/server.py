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
"""

import asyncio
import io
import os
import time
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

import numpy as np
import soundfile as sf
from fastapi import FastAPI, File, UploadFile
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import JSONResponse, Response, StreamingResponse

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


_MP3_BITRATE = "64k"


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


_S3_CLIENT = None
_MP3_TRANSFER_CONFIG = None

_MP3_MULTIPART_CHUNK_BYTES = 8 * 1024 * 1024
_MP3_MULTIPART_MAX_CONCURRENCY = 4


def _s3_client():
    """Lazily build + cache a boto3 S3 client for the SeaweedFS gateway. Path-
    style addressing — the endpoint is a bare gateway host, not a vhost. boto3 is
    imported here (not at module top) to keep the deferred-heavy-import shape."""
    global _S3_CLIENT
    if _S3_CLIENT is None:
        import boto3
        from botocore.config import Config

        _S3_CLIENT = boto3.client(
            "s3",
            endpoint_url=os.environ["SEAWEEDFS_S3_ENDPOINT"],
            aws_access_key_id=os.environ["SEAWEEDFS_ACCESS_KEY"],
            aws_secret_access_key=os.environ["SEAWEEDFS_SECRET_KEY"],
            region_name=os.environ.get("SEAWEEDFS_REGION", "us-east-1"),
            config=Config(signature_version="s3v4", s3={"addressing_style": "path"}),
        )
    return _S3_CLIENT


def _mp3_transfer_config():
    """Lazily build + cache the bounded `TransferConfig` for the finished-MP3
    multipart upload (#15753). Threshold == chunk size, so any body at/above
    `_MP3_MULTIPART_CHUNK_BYTES` is chunked (never one jumbo single-part PUT that
    the 256Mi gateway would buffer whole) and anything smaller stays single-part.
    Deferred import matches the boto3 client's deferred-heavy-import shape."""
    global _MP3_TRANSFER_CONFIG
    if _MP3_TRANSFER_CONFIG is None:
        from boto3.s3.transfer import TransferConfig

        _MP3_TRANSFER_CONFIG = TransferConfig(
            multipart_threshold=_MP3_MULTIPART_CHUNK_BYTES,
            multipart_chunksize=_MP3_MULTIPART_CHUNK_BYTES,
            max_concurrency=_MP3_MULTIPART_MAX_CONCURRENCY,
            use_threads=True,
        )
    return _MP3_TRANSFER_CONFIG


def _put_bytes_sync(key: str, body: bytes, content_type: str) -> None:
    """Blocking whole-object PUT of a SMALL object (an HLS segment or the .m3u8).
    Single-part is fine here — a segment is one budget-bounded sentence (~1MB) and
    the playlist is a few KB, so neither strains the 256Mi gateway. The large
    finished MP3 uses `_put_object_sync` (multipart) instead. Runs in the
    threadpool so the upload never blocks the event loop (and /health stays
    answerable for a busy-not-dead pod)."""
    _s3_client().put_object(
        Bucket=os.environ["SEAWEEDFS_BUCKET"],
        Key=key,
        Body=body,
        ContentType=content_type,
    )


def _put_object_sync(key: str, mp3: bytes) -> None:
    """Blocking multipart PUT of a finished MP3 (audio/mpeg). Uses boto3's managed
    uploader with a bounded `TransferConfig` so a long-chapter MP3 (100-260MB) is
    chunked into multipart parts rather than a single-part whole-object PUT that
    the SeaweedFS gateway would buffer whole in its 256Mi heap (#15753)."""
    _s3_client().upload_fileobj(
        io.BytesIO(mp3),
        os.environ["SEAWEEDFS_BUCKET"],
        key,
        ExtraArgs={"ContentType": "audio/mpeg"},
        Config=_mp3_transfer_config(),
    )


_MP3_RENDER_KEYS: set[str] = set()

_BG_RENDER_TASKS: set = set()


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


_HLS_TARGET_DURATION = 60


def _encode_segment_mp3_sync(pcm: bytes) -> "bytes | None":
    """Encode one segment's raw PCM to a complete MP3 via a blocking ffmpeg run.
    Whole-buffer (a single segment is small, unlike the whole-chapter streaming
    encode in _encode_mp3). Returns None on a non-zero exit or empty output, so
    the caller skips a segment that failed to encode rather than corrupting the
    playlist. Runs in the threadpool (off the event loop) like the synth."""
    import subprocess

    proc = subprocess.run(
        ["ffmpeg", "-hide_banner", "-loglevel", "error",
         "-f", "s16le", "-ar", str(_STREAM_SAMPLE_RATE), "-ac", "1", "-i", "pipe:0",
         "-b:a", _MP3_BITRATE, "-f", "mp3", "pipe:1"],
        input=pcm,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )
    if proc.returncode != 0 or not proc.stdout:
        return None
    return proc.stdout


def _build_hls_playlist(segments: "list[tuple[str, float]]", ended: bool) -> str:
    """Build an HLS media playlist (EVENT type) from (segment_name, duration_s)
    pairs. When `ended`, append EXT-X-ENDLIST so the playlist becomes fully
    seekable (VOD-equivalent). Segment URIs are bare filenames; the web serve
    route rewrites them to auth-carrying URLs."""
    lines = [
        "#EXTM3U",
        "#EXT-X-VERSION:3",
        f"#EXT-X-TARGETDURATION:{_HLS_TARGET_DURATION}",
        "#EXT-X-MEDIA-SEQUENCE:0",
        "#EXT-X-PLAYLIST-TYPE:EVENT",
    ]
    for name, duration in segments:
        lines.append(f"#EXTINF:{duration:.3f},")
        lines.append(name)
    if ended:
        lines.append("#EXT-X-ENDLIST")
    return "\n".join(lines) + "\n"


_HLS_RENDER_KEYS: set[str] = set()


async def _render_hls_and_store(
    text_segments: "list[str]", voice: str, playlist_key: str, segment_prefix: str, mp3_key: str
) -> None:
    """Render the caller-provided segments as MP3 HLS segments under
    `segment_prefix`, republishing the growing EVENT playlist at `playlist_key`
    after each segment. On clean completion, finalize the playlist (ENDLIST) and
    PUT the concatenated canonical MP3 at `mp3_key`. The canonical MP3 is written
    ONLY on clean completion, so a truncated render caches no seekable artifact
    (the playlist without ENDLIST is honestly live). Always clears the in-flight
    key so the trigger stays re-fireable."""
    segments_meta: list[tuple[str, float]] = []
    mp3_parts: list[bytes] = []
    try:
        async with _INFER_LOCK:
            for i, seg_text in enumerate(text_segments):
                audio = await run_in_threadpool(_synthesize, seg_text, voice)
                if audio is None:
                    continue
                mp3 = await run_in_threadpool(_encode_segment_mp3_sync, _pcm_bytes(audio))
                if not mp3:
                    continue
                name = f"seg{i:05d}.mp3"
                await run_in_threadpool(
                    _put_bytes_sync, f"{segment_prefix}{name}", mp3, "audio/mpeg"
                )
                mp3_parts.append(mp3)
                segments_meta.append((name, len(audio) / _STREAM_SAMPLE_RATE))
                await run_in_threadpool(
                    _put_bytes_sync,
                    playlist_key,
                    _build_hls_playlist(segments_meta, ended=False).encode(),
                    "application/vnd.apple.mpegurl",
                )
        if not segments_meta:
            print(f"[voice-infer] hls render produced no audio, key={playlist_key}", flush=True)
            return
        await run_in_threadpool(
            _put_bytes_sync,
            playlist_key,
            _build_hls_playlist(segments_meta, ended=True).encode(),
            "application/vnd.apple.mpegurl",
        )
        await run_in_threadpool(_put_object_sync, mp3_key, b"".join(mp3_parts))
        print(
            f"[voice-infer] stored hls key={playlist_key} segments={len(segments_meta)} "
            f"mp3_key={mp3_key} mp3_bytes={sum(len(p) for p in mp3_parts)}",
            flush=True,
        )
    except Exception as exc:
        print(f"[voice-infer] hls render/store FAILED key={playlist_key}: {exc}", flush=True)
    finally:
        _HLS_RENDER_KEYS.discard(playlist_key)


@app.post("/v1/audio/speech/hls")
async def speech_hls(body: dict):
    """Fire-and-store HLS sibling of /v1/audio/speech/mp3 (#15737). Accepts
    {"segments","voice","playlistKey","segmentPrefix","mp3Key"}, ACKS IMMEDIATELY
    with 202, and renders the caller-provided segments as MP3 HLS segments + a
    growing EVENT playlist in the BACKGROUND — so an iOS media element bound to the
    playlist URL starts within seconds. On clean completion it finalizes the
    playlist and lands the canonical MP3 at `mp3Key`. The /stream and /mp3
    contracts are untouched."""
    segments = _coerce_segments(body)
    if segments is None:
        return JSONResponse(status_code=400, content={"error": "empty segments"})
    playlist_key = (body or {}).get("playlistKey")
    segment_prefix = (body or {}).get("segmentPrefix")
    mp3_key = (body or {}).get("mp3Key")
    for field_name, value in (
        ("playlistKey", playlist_key),
        ("segmentPrefix", segment_prefix),
        ("mp3Key", mp3_key),
    ):
        if not isinstance(value, str) or not value.strip():
            return JSONResponse(status_code=400, content={"error": f"missing {field_name}"})
    voice = (body or {}).get("voice") or "af_heart"
    if playlist_key in _HLS_RENDER_KEYS:
        return JSONResponse(status_code=202, content={"status": "already-rendering", "key": playlist_key})
    _HLS_RENDER_KEYS.add(playlist_key)
    task = asyncio.create_task(
        _render_hls_and_store(segments, voice, playlist_key, segment_prefix, mp3_key)
    )
    _BG_RENDER_TASKS.add(task)
    task.add_done_callback(_BG_RENDER_TASKS.discard)
    return JSONResponse(status_code=202, content={"status": "accepted", "key": playlist_key})


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
