"""When within a segment's speech each of its sentences begins.

A narration segment holds several sentences, spoken by Kokoro in one call so
the prosody carries across them. Kokoro's English pipeline sets start_ts on
each token, counted within the audio of the chunk that token falls in, so a
sentence's moment is the start of the first token at or after the character
the sentence begins at. Where no token carries a timestamp, the segment's
speech is shared out among its sentences by characters.
"""

import numpy as np

import voice_inference
from voice_hls import SAMPLE_RATE


def _whole(value: object) -> bool:
    return isinstance(value, int) and not isinstance(value, bool) and value >= 0


def sentences_of(said: object) -> "list[tuple[int, int]] | None":
    """The [[charIndex, wordStart], ...] a segment carries, or None if malformed."""
    if said is None:
        return []
    if not isinstance(said, list):
        return None
    out: "list[tuple[int, int]]" = []
    for one in said:
        if not isinstance(one, list) or len(one) != 2 or not all(_whole(v) for v in one):
            return None
        out.append((one[0], one[1]))
    return out


def synthesize_timed(
    text: str, voice: str
) -> "tuple[np.ndarray | None, list[tuple[int, float]], int]":
    """Blocking TTS that also says where each token begins: [(char, seconds)].

    A token's char is counted over the tokens' own text and whitespace, which
    spell the text handed in; its seconds add the chunks spoken before it. The
    last value is how many characters the tokens spelled in all."""
    chunks: "list[np.ndarray]" = []
    starts: "list[tuple[int, float]]" = []
    at_char = 0
    at_seconds = 0.0
    for result in voice_inference._TTS(text, voice=voice):
        for token in result.tokens or []:
            if token.start_ts is not None:
                starts.append((at_char, at_seconds + float(token.start_ts)))
            at_char += len(token.text) + len(token.whitespace or "")
        if result.audio is not None:
            samples = np.asarray(result.audio, dtype=np.float32).reshape(-1)
            chunks.append(samples)
            at_seconds += len(samples) / SAMPLE_RATE
    if not chunks:
        return None, starts, at_char
    return np.concatenate(chunks), starts, at_char


def sentence_seconds(
    text: str,
    sentences: "list[tuple[int, int]]",
    starts: "list[tuple[int, float]]",
    token_chars: int,
    spoken_seconds: float,
) -> "tuple[list[tuple[float, int]], bool]":
    """[(seconds, wordStart)] for each sentence, and whether the timestamps gave them."""
    if not sentences:
        return [], True
    scale = token_chars / len(text) if text and token_chars > 0 else 1.0
    out: "list[tuple[float, int]]" = []
    for char, word in sentences:
        seconds: "float | None" = None
        wanted = char * scale
        for token_char, token_seconds in starts:
            if token_char >= wanted - 1:
                seconds = token_seconds
                break
        if seconds is None:
            seconds = spoken_seconds * (char / len(text)) if text else 0.0
        if out and seconds < out[-1][0]:
            seconds = out[-1][0]
        out.append((min(seconds, spoken_seconds), word))
    return out, bool(starts)
