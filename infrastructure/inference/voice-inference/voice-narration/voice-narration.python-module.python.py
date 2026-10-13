"""Narration sessions: chapters read aloud as one growing HLS stream.

A narration is made by voice_session.Session, which holds the chapters handed
in, the encoder they go through and the pieces written out. This module keeps
the sessions, hands out what they have made and drops them.

  POST   /v1/narration                 {"voice","chapter","segments"} -> 201 {"id"}
  POST   /v1/narration/{id}/chapters   {"chapter","segments"}         -> 200
  POST   /v1/narration/{id}/end        no more chapters               -> 200
  GET    /v1/narration/{id}            {"state","error","ended","renderedSeconds"}
  GET    /v1/narration/{id}/playlist.m3u8
  GET    /v1/narration/{id}/chapters   [{"id","title","startSeconds","durationSeconds","marks"}]
A segment may carry "wordStart", the chapter word it begins at. Each chapter's
"marks" lists [stream seconds, wordStart] for every such segment begun so far,
so a player can tell which word of which chapter it is playing.
A segment may also carry "sentences", [[charIndex, wordStart], ...] for each
sentence after its first. Once the segment is spoken, each such sentence adds a
mark at the moment Kokoro's own token timestamps say it begins; where Kokoro
gives no timestamps, the segment's speech is shared out by characters.
  GET    /v1/narration/{id}/{name}     init.mp4 or pNNNNN.m4s
  DELETE /v1/narration/{id}
A session nobody fetches for SESSION_IDLE_SECONDS is dropped. At most
MAX_SESSIONS live at once; a new one drops the one fetched least lately, so a
narration someone is listening to outlives one opened and left.
"""

import asyncio
import os
import shutil
import time

from fastapi import Request
from fastapi.responses import JSONResponse, Response

from voice_hls import piece_index, playlist
from voice_inference import app
from voice_session import PIECES_DIR, Session
from voice_timing import sentences_of

MAX_SESSIONS = 4
SESSION_IDLE_SECONDS = 30 * 60
MAX_SEGMENTS = 10000
MAX_SEGMENT_CHARS = 2000
MAX_PAUSE_MS = 5000
# A directory under PIECES_DIR not touched for this long belongs to no session.
STRAY_AFTER_SECONDS = 600
# The playlist names every piece made so far, and a session stops making more
# once it holds a window ahead of the player. Holding a player at the start of a
# playlist with no end is the web player's work: iOS stops fetching once its
# buffer is full, so a playlist that grew only with what was fetched stalled.

_SESSIONS: "dict[str, Session]" = {}
_SWEEPER: "list[asyncio.Task]" = []


def _error(status: int, message: str) -> JSONResponse:
    return JSONResponse(status_code=status, content={"error": message})


def _whole(value: object) -> bool:
    return isinstance(value, int) and not isinstance(value, bool) and value >= 0


def _segments_of(body: dict) -> "tuple[list[tuple[str, int, int | None]] | None, str | None]":
    segments = body.get("segments")
    if not isinstance(segments, list) or not segments:
        return None, "segments must be a non-empty list"
    if len(segments) > MAX_SEGMENTS:
        return None, f"at most {MAX_SEGMENTS} segments"
    out: "list[tuple[str, int, int | None]]" = []
    for n, seg in enumerate(segments):
        if not isinstance(seg, dict) or not isinstance(seg.get("text"), str):
            return None, f"segment {n} needs a string text"
        text, pause, word = seg["text"], seg.get("pauseAfterMs", 0), seg.get("wordStart")
        if len(text) > MAX_SEGMENT_CHARS:
            return None, f"segment {n} runs past {MAX_SEGMENT_CHARS} characters"
        if not _whole(pause) or pause > MAX_PAUSE_MS:
            return None, f"segment {n} pauseAfterMs must be an integer from 0 to {MAX_PAUSE_MS}"
        if word is not None and not _whole(word):
            return None, f"segment {n} wordStart must be a whole number"
        sentences = sentences_of(seg.get("sentences"))
        if sentences is None:
            return None, f"segment {n} sentences must be [[charIndex, wordStart], ...]"
        lead = len(text) - len(text.lstrip())
        out.append((text.strip(), pause, word, [(max(0, c - lead), w) for c, w in sentences]))
    if not any(seg[0] for seg in out):
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


def _session(sid: str) -> "Session | None":
    session = _SESSIONS.get(sid)
    if session is not None:
        session.touched = time.monotonic()
    return session


def _drop(sid: str) -> None:
    session = _SESSIONS.pop(sid, None)
    if session is not None:
        session.close()


def _clear_stray() -> None:
    """Remove the pieces of a session this process no longer holds."""
    try:
        names = os.listdir(PIECES_DIR)
    except OSError:
        return
    now = time.time()
    for name in names:
        if name in _SESSIONS:
            continue
        path = os.path.join(PIECES_DIR, name)
        try:
            if now - os.path.getmtime(path) < STRAY_AFTER_SECONDS:
                continue
        except OSError:
            continue
        shutil.rmtree(path, ignore_errors=True)


async def _sweep() -> None:
    while True:
        await asyncio.sleep(60)
        now = time.monotonic()
        for sid, session in list(_SESSIONS.items()):
            if now - session.touched > SESSION_IDLE_SECONDS:
                _drop(sid)
        _clear_stray()


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
        _drop(min(_SESSIONS.values(), key=lambda s: s.touched).id)
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
        "fetchedSeconds": session.fetched_to,
        "sentencesTimed": session.sentences_timed,
        "sentencesShared": session.sentences_shared,
    }


@app.get("/v1/narration/{sid}/playlist.m3u8")
async def narration_playlist(sid: str):
    session = _session(sid)
    if session is None:
        return _error(404, "no such narration")
    if session.error:
        return _error(500, session.error)
    return Response(
        content=playlist(session.pieces.durations, session.done),
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
    path = session.pieces.piece_path(n)
    if path is None:
        return _error(404, "piece not made yet")
    session.fetched(n)
    try:
        with open(path, "rb") as piece:
            content = piece.read()
    except OSError:
        return _error(404, "piece not made yet")
    return Response(content=content, media_type="audio/mp4", headers=headers)


@app.delete("/v1/narration/{sid}")
async def narration_delete(sid: str):
    if sid not in _SESSIONS:
        return _error(404, "no such narration")
    _drop(sid)
    return {"ok": True}
