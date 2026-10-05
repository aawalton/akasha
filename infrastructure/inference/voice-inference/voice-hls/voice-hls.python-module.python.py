"""Fragmented MP4 from ffmpeg, divided into the pieces of an HLS playlist.

ffmpeg writes one AAC stream as fragmented MP4 to a pipe: ftyp and moov (the
init section), then a moof and mdat for every fragment. `Pieces` reads those
bytes as they come and groups whole fragments into pieces, the first one short
so a player starts soon and the rest a few seconds long. `playlist` writes the
HLS EVENT playlist naming the pieces made so far. Everything stays in memory.
"""

import struct

SAMPLE_RATE = 24000
AAC_FRAME = 1024
FRAGMENT_MICROSECONDS = 1_000_000
FIRST_PIECE_SECONDS = 2.0
PIECE_SECONDS = 5.0
TARGET_DURATION = 6


def _boxes(data: bytes, start: int = 0, end: "int | None" = None):
    """Yield (type, offset, size) of the ISO-BMFF boxes in data[start:end]."""
    end = len(data) if end is None else end
    i = start
    while i + 8 <= end:
        size, kind = struct.unpack(">I4s", data[i:i + 8])
        if size < 8:
            return
        yield kind.decode("latin-1"), i, size
        i += size


def _run_samples(moof: bytes, at: int, default: int) -> int:
    flags = int.from_bytes(moof[at + 9:at + 12], "big")
    count = struct.unpack(">I", moof[at + 12:at + 16])[0]
    if not flags & 0x100:
        return count * default
    p = at + 16
    if flags & 0x1:
        p += 4
    if flags & 0x4:
        p += 4
    stride = 4 * sum(bool(flags & f) for f in (0x100, 0x200, 0x400, 0x800))
    return sum(struct.unpack(">I", moof[p + n * stride:p + n * stride + 4])[0] for n in range(count))


def _default_duration(moof: bytes, at: int) -> int:
    flags = int.from_bytes(moof[at + 9:at + 12], "big")
    p = at + 16
    if flags & 0x1:
        p += 8
    if flags & 0x2:
        p += 4
    if flags & 0x8:
        return struct.unpack(">I", moof[p:p + 4])[0]
    return AAC_FRAME


def fragment_samples(moof: bytes) -> int:
    """The number of audio samples a moof's track runs cover."""
    total = 0
    for kind, off, size in _boxes(moof):
        if kind != "moof":
            continue
        for k2, o2, s2 in _boxes(moof, off + 8, off + size):
            if k2 != "traf":
                continue
            default = AAC_FRAME
            for k3, o3, _s3 in _boxes(moof, o2 + 8, o2 + s2):
                if k3 == "tfhd":
                    default = _default_duration(moof, o3)
                elif k3 == "trun":
                    total += _run_samples(moof, o3, default)
    return total


class Pieces:
    """Turns the fMP4 bytes ffmpeg writes into an init section and HLS pieces."""

    def __init__(self) -> None:
        self.buffer = bytearray()
        self.init: "bytes | None" = None
        self.pieces: "list[tuple[bytes, float]]" = []
        self.pending = bytearray()
        self.pending_samples = 0
        self.moof: "bytes | None" = None
        self.bytes = 0

    def feed(self, data: bytes) -> None:
        self.buffer.extend(data)
        while len(self.buffer) >= 8:
            size, kind = struct.unpack(">I4s", self.buffer[:8])
            if len(self.buffer) < size:
                return
            box = bytes(self.buffer[:size])
            del self.buffer[:size]
            self._box(kind.decode("latin-1"), box)

    def _box(self, kind: str, box: bytes) -> None:
        if self.init is None:
            if kind in ("ftyp", "moov"):
                self.pending.extend(box)
                if kind == "moov":
                    self.init = bytes(self.pending)
                    self.pending = bytearray()
            return
        if kind == "moof":
            self.moof = box
            return
        if kind == "mdat" and self.moof is not None:
            self.pending_samples += fragment_samples(self.moof)
            self.pending.extend(self.moof)
            self.pending.extend(box)
            self.moof = None
            goal = FIRST_PIECE_SECONDS if not self.pieces else PIECE_SECONDS
            if self.pending_samples / SAMPLE_RATE >= goal - 0.05:
                self._close_piece()

    def _close_piece(self) -> None:
        if not self.pending_samples:
            return
        data = bytes(self.pending)
        self.pieces.append((data, self.pending_samples / SAMPLE_RATE))
        self.bytes += len(data)
        self.pending = bytearray()
        self.pending_samples = 0

    def finish(self) -> None:
        self._close_piece()

    def seconds(self) -> float:
        return sum(s for _d, s in self.pieces)


def piece_name(n: int) -> str:
    return f"p{n:05d}.m4s"


def piece_index(name: str) -> "int | None":
    if name.startswith("p") and name.endswith(".m4s") and name[1:-4].isdigit():
        return int(name[1:-4])
    return None


def playlist(pieces: "list[tuple[bytes, float]]", ended: bool) -> str:
    lines = [
        "#EXTM3U",
        "#EXT-X-VERSION:7",
        f"#EXT-X-TARGETDURATION:{TARGET_DURATION}",
        "#EXT-X-MEDIA-SEQUENCE:0",
        "#EXT-X-PLAYLIST-TYPE:EVENT",
        "#EXT-X-START:TIME-OFFSET=0,PRECISE=YES",
        "#EXT-X-INDEPENDENT-SEGMENTS",
        '#EXT-X-MAP:URI="init.mp4"',
    ]
    for n, (_data, seconds) in enumerate(pieces):
        lines.append(f"#EXTINF:{seconds:.5f},")
        lines.append(piece_name(n))
    if ended:
        lines.append("#EXT-X-ENDLIST")
    return "\n".join(lines) + "\n"


def encoder_args(bitrate: str) -> "list[str]":
    """ffmpeg reading 24 kHz mono s16le on stdin, writing fragmented AAC MP4 to stdout."""
    return [
        "ffmpeg", "-hide_banner", "-loglevel", "error",
        "-f", "s16le", "-ar", str(SAMPLE_RATE), "-ac", "1", "-i", "pipe:0",
        "-c:a", "aac", "-b:a", bitrate,
        "-f", "mp4",
        "-movflags", "+empty_moov+default_base_moof+frag_keyframe",
        "-frag_duration", str(FRAGMENT_MICROSECONDS),
        "-flush_packets", "1",
        "pipe:1",
    ]
