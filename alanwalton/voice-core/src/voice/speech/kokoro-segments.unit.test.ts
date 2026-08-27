import { describe, expect, test } from "bun:test"
import { buildKokoroSpeechInput, buildKokoroSpeechSegments, splitSentences } from "../speech"
import { longMultiSegmentText, packedAlphaText } from "./test-helpers"

describe("buildKokoroSpeechSegments", () => {
  test("returns the ordered packed segment array (the pre-join form of buildKokoroSpeechInput)", () => {
    const raw = "[zadi] First sentence. Second one.\n\nAnother paragraph here."
    expect(buildKokoroSpeechSegments(raw)).toEqual([
      "First sentence. Second one. Another paragraph here.",
    ])
  })

  test("buildKokoroSpeechInput is exactly the segments joined by a single space", () => {
    const raw = packedAlphaText()
    expect(buildKokoroSpeechInput(raw)).toBe(buildKokoroSpeechSegments(raw).join(" "))
  })

  test("empty / marker-only input yields no segments", () => {
    expect(buildKokoroSpeechSegments("   \n\n  ")).toEqual([])
    expect(buildKokoroSpeechSegments("[zadi]")).toEqual([])
  })
})

describe("buildKokoroSpeechSegments fromSentenceIndex (generate-from-N)", () => {
  const canonicalSentences = (raw: string): readonly string[] =>
    splitSentences(buildKokoroSpeechInput(raw))

  const assertStartsAtSentence = (raw: string, n: number): undefined => {
    const fromN = buildKokoroSpeechSegments(raw, { fromSentenceIndex: n })
    const expectedTail = canonicalSentences(raw).slice(n)
    expect(fromN.join(" ")).toBe(expectedTail.join(" "))
  }

  test("fromSentenceIndex 0 and undefined equal the full segment array", () => {
    const raw = "First sentence. Second one! A third clause here? And a fourth to close it out."
    expect(buildKokoroSpeechSegments(raw, { fromSentenceIndex: 0 })).toEqual([
      ...buildKokoroSpeechSegments(raw),
    ])
  })

  test("from N contains exactly sentences N..end (rejoin proof, several N)", () => {
    const raw =
      "Alpha one here. Bravo two follows. Charlie three continues. Delta four then. Echo five ends it."
    expect(canonicalSentences(raw).length).toBe(5)
    for (let n = 0; n <= 5; n++) assertStartsAtSentence(raw, n)
  })

  test("holds across the pack budget on long multi-segment text", () => {
    const long = longMultiSegmentText()
    const total = canonicalSentences(long).length
    expect(total).toBeGreaterThan(1)
    assertStartsAtSentence(long, 1)
    assertStartsAtSentence(long, Math.floor(total / 2))
    assertStartsAtSentence(long, total - 1)
  })

  test("index at or past the end yields no segments", () => {
    const raw = "Only one. And two."
    const total = canonicalSentences(raw).length
    expect(buildKokoroSpeechSegments(raw, { fromSentenceIndex: total })).toEqual([])
    expect(buildKokoroSpeechSegments(raw, { fromSentenceIndex: total + 5 })).toEqual([])
  })

  test("negative and fractional indices clamp/truncate", () => {
    const raw = "First sentence. Second one. Third here."
    expect(buildKokoroSpeechSegments(raw, { fromSentenceIndex: -3 })).toEqual([
      ...buildKokoroSpeechSegments(raw),
    ])
    expect(buildKokoroSpeechSegments(raw, { fromSentenceIndex: 1.9 }).join(" ")).toBe(
      splitSentences(buildKokoroSpeechInput(raw)).slice(1).join(" ")
    )
  })
})
