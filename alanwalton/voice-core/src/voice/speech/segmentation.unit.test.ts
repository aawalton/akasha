import { describe, expect, test } from "bun:test"
import { formatForSpeech, MAX_SPEECH_CHARS, MAX_SPEECH_SEGMENTS } from "../speech"
import { giantSingleSentence, longMultiSegmentText, pathologicalWord } from "./test-helpers"

describe("formatForSpeech segmentation", () => {
  test("short multi-sentence text stays a single segment", () => {
    expect(formatForSpeech("First sentence. Second one! A third?")).toEqual([
      "First sentence. Second one! A third?",
    ])
  })

  test("long text splits into multiple segments, each within the budget", () => {
    const long = longMultiSegmentText()
    const segments = formatForSpeech(long)
    expect(segments.length).toBeGreaterThan(1)
    for (const segment of segments) {
      expect(segment.length).toBeLessThanOrEqual(MAX_SPEECH_CHARS)
    }
  })

  test("no segment carries the legacy (truncated) marker", () => {
    const long = "This is a full sentence that must be spoken. ".repeat(60)
    const segments = formatForSpeech(long)
    for (const segment of segments) {
      expect(segment).not.toContain("(truncated)")
    }
  })

  test("segments concatenate back to the full flattened content — no loss", () => {
    const sentence = `${"alpha bravo charlie delta echo foxtrot golf hotel".repeat(3).trim()}.`
    const flattened = `${sentence} `.repeat(25).trim()
    const segments = formatForSpeech(flattened)
    expect(segments.length).toBeGreaterThan(1)
    expect(segments.join(" ")).toBe(flattened)
  })

  test("splits land on sentence boundaries — each segment ends at a terminator", () => {
    const sentence = `${"lorem ipsum dolor sit amet consectetur".repeat(4).trim()}.`
    const long = `${sentence} `.repeat(20).trim()
    const segments = formatForSpeech(long)
    expect(segments.length).toBeGreaterThan(1)
    for (const segment of segments.slice(0, -1)) {
      expect(/[.!?]$/.test(segment)).toBe(true)
    }
  })

  test("never splits mid-word for normal text", () => {
    const sentence = `${"reproducible deterministic invariant".repeat(5).trim()}.`
    const long = `${sentence} `.repeat(15).trim()
    const words = long.split(" ")
    const segments = formatForSpeech(long)
    const reassembled = segments.join(" ").split(" ")
    expect(reassembled).toEqual(words)
  })

  test("hard-wraps a single oversize sentence on word boundaries without losing words", () => {
    const giant = giantSingleSentence()
    const segments = formatForSpeech(giant)
    expect(segments.length).toBeGreaterThan(1)
    for (const segment of segments) {
      expect(segment.length).toBeLessThanOrEqual(MAX_SPEECH_CHARS)
    }
    expect(segments.join(" ")).toBe(giant)
  })

  test("hard-slices a single pathological word longer than the budget, losing no characters", () => {
    const word = pathologicalWord()
    const segments = formatForSpeech(`${word}.`)
    expect(segments.length).toBeGreaterThan(1)
    for (const segment of segments) {
      expect(segment.length).toBeLessThanOrEqual(MAX_SPEECH_CHARS)
    }
    const recoveredXs = segments.join("").replace(/[^x]/g, "").length
    expect(recoveredXs).toBe(word.length)
  })

  test("caps the segment count for a pathological multi-MB message", () => {
    const sentence = "word more text here."
    const huge = `${sentence} `.repeat(200_000).trim()
    const segments = formatForSpeech(huge)
    expect(segments.length).toBe(MAX_SPEECH_SEGMENTS)
  })
})
