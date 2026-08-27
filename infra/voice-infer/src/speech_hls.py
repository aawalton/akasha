"""POST /v1/audio/speech/hls — the HLS render path.

Encodes the caller-provided segments one-by-one into MP3 HLS segments under a
prefix, republishing a growing EVENT playlist after each, and on clean
completion finalizes the playlist and lands the canonical MP3 — in the
background, behind an immediate 202.
"""

import asyncio

from fastapi.concurrency import run_in_threadpool
from fastapi.responses import JSONResponse

from object_store import _put_bytes_sync, _put_object_sync
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
