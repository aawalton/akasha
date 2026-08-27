import { describe, expect, test } from "bun:test"
import {
  estimateChapterSentenceMarks,
  estimateChapterSentenceMarksFromN,
  estimateSentenceMarks,
} from "./estimate-marks"
import { buildKokoroSpeechInput, buildKokoroSpeechSegments, splitSentences } from "./speech"

describe("estimateSentenceMarks", () => {
  test("single-sentence segment: sentence starts at the segment's cumulative time", () => {
    const sentences = ["Aaa.", "Bbb.", "Ccc."]
    const segments = ["Aaa.", "Bbb.", "Ccc."]
    const durations = [2, 3, 5]
    expect(estimateSentenceMarks(sentences, segments, durations)).toEqual([
      { sentenceIndex: 0, startSec: 0 },
      { sentenceIndex: 1, startSec: 2 },
      { sentenceIndex: 2, startSec: 5 },
    ])
  })

  test("multi-sentence segment: char-weighted start within the segment", () => {
    const sentences = ["AA.", "BBBB."]
    const segments = ["AA. BBBB."]
    const durations = [8]
    const marks = estimateSentenceMarks(sentences, segments, durations)
    expect(marks[0]).toEqual({ sentenceIndex: 0, startSec: 0 })
    expect(marks[1]?.sentenceIndex).toBe(1)
    expect(marks[1]?.startSec).toBeCloseTo((4 / 9) * 8, 10)
  })

  test("mixed: multi-sentence segment followed by a single-sentence segment", () => {
    const sentences = ["AA.", "BBBB.", "CCC."]
    const segments = ["AA. BBBB.", "CCC."]
    const durations = [4, 6]
    const marks = estimateSentenceMarks(sentences, segments, durations)
    expect(marks[0]).toEqual({ sentenceIndex: 0, startSec: 0 })
    expect(marks[1]?.startSec).toBeCloseTo((4 / 9) * 4, 10)
    expect(marks[2]).toEqual({ sentenceIndex: 2, startSec: 4 })
  })

  test("marks are ordered and ascending in startSec", () => {
    const sentences = ["One two.", "Three.", "Four five six.", "Seven."]
    const segments = ["One two. Three.", "Four five six. Seven."]
    const durations = [10, 12]
    const marks = estimateSentenceMarks(sentences, segments, durations)
    for (let i = 1; i < marks.length; i++) {
      expect(marks[i]?.startSec).toBeGreaterThanOrEqual(marks[i - 1]?.startSec ?? 0)
    }
    expect(marks[2]?.startSec).toBeCloseTo(10, 10)
  })

  test("empty inputs yield no marks", () => {
    expect(estimateSentenceMarks([], [], [])).toEqual([])
    expect(estimateSentenceMarks([], ["A."], [1])).toEqual([])
    expect(estimateSentenceMarks(["A."], [], [])).toEqual([])
  })

  test("segment/duration count mismatch fails safe to no marks", () => {
    expect(estimateSentenceMarks(["A.", "B."], ["A.", "B."], [1])).toEqual([])
    expect(estimateSentenceMarks(["A.", "B."], ["A. B."], [1, 2])).toEqual([])
  })

  test("sentences beyond the synthesized audio (sliced render) get no mark", () => {
    const sentences = ["AA.", "BBB.", "CCCC."]
    const segments = ["AA.", "BBB."]
    const durations = [1, 2]
    const marks = estimateSentenceMarks(sentences, segments, durations)
    expect(marks.map((m) => m.sentenceIndex)).toEqual([0, 1])
  })

  test("boundary rounding: fractional durations stay precise", () => {
    const sentences = ["AB.", "CD."]
    const segments = ["AB. CD."]
    const durations = [3.333]
    const marks = estimateSentenceMarks(sentences, segments, durations)
    expect(marks[1]?.startSec).toBeCloseTo((4 / 7) * 3.333, 10)
  })
})

describe("estimateChapterSentenceMarks", () => {
  test("derives sentences + segments from body and aligns to the given durations", () => {
    const body = "First sentence here. Second sentence here. Third one."
    const sentences = splitSentences(buildKokoroSpeechInput(body))
    const segments = buildKokoroSpeechSegments(body)
    expect(segments.length).toBe(1)
    const durations = [9]
    const marks = estimateChapterSentenceMarks(body, durations)
    expect(marks.length).toBe(sentences.length)
    expect(marks[0]).toEqual({ sentenceIndex: 0, startSec: 0 })
    for (let i = 1; i < marks.length; i++) {
      expect(marks[i]?.startSec).toBeGreaterThan(marks[i - 1]?.startSec ?? -1)
    }
  })

  test("count mismatch between recomputed packing and durations yields no marks", () => {
    const body = "Only one sentence."
    expect(estimateChapterSentenceMarks(body, [1, 2])).toEqual([])
  })
})

describe("estimateChapterSentenceMarksFromN (#15773 child project 2)", () => {
  const longSentence = (label: string): string => `${`${label} `.repeat(90).trim()}.`
  const BODY = [longSentence("alpha"), longSentence("bravo"), longSentence("charlie")].join(" ")

  test("fromSentenceIndex 0 with real durations equals estimateChapterSentenceMarks", () => {
    const segs = buildKokoroSpeechSegments(BODY)
    const durations = segs.map((_, i) => (i + 1) * 2)
    expect(
      estimateChapterSentenceMarksFromN(BODY, {
        fromSentenceIndex: 0,
        segmentDurationsSec: durations,
      })
    ).toEqual([...estimateChapterSentenceMarks(BODY, durations)])
  })

  test("from-N marks carry ABSOLUTE reader indices (offset by N) and start at time 0", () => {
    const from = 1
    const segs = buildKokoroSpeechSegments(BODY, { fromSentenceIndex: from })
    const durations = segs.map(() => 5)
    const marks = estimateChapterSentenceMarksFromN(BODY, {
      fromSentenceIndex: from,
      segmentDurationsSec: durations,
    })
    expect(marks.length).toBeGreaterThan(0)
    expect(marks[0]?.sentenceIndex).toBe(from)
    expect(marks[0]?.startSec).toBe(0)
    for (let i = 1; i < marks.length; i++) {
      expect(marks[i]?.sentenceIndex).toBe((marks[i - 1]?.sentenceIndex ?? 0) + 1)
      expect(marks[i]?.startSec).toBeGreaterThan(marks[i - 1]?.startSec ?? -1)
    }
  })

  test("char-estimate path (no durations) yields offset marks starting at 0, ascending", () => {
    const from = 2
    const marks = estimateChapterSentenceMarksFromN(BODY, { fromSentenceIndex: from })
    expect(marks.length).toBeGreaterThan(0)
    expect(marks[0]?.sentenceIndex).toBe(from)
    expect(marks[0]?.startSec).toBe(0)
    for (let i = 1; i < marks.length; i++) {
      expect(marks[i]?.startSec).toBeGreaterThan(marks[i - 1]?.startSec ?? -1)
    }
    for (const m of marks) expect(m.sentenceIndex).toBeGreaterThanOrEqual(from)
  })

  test("index at or past the last sentence yields no marks", () => {
    const total = splitSentences(buildKokoroSpeechInput(BODY)).length
    expect(estimateChapterSentenceMarksFromN(BODY, { fromSentenceIndex: total })).toEqual([])
    expect(estimateChapterSentenceMarksFromN(BODY, { fromSentenceIndex: total + 4 })).toEqual([])
  })

  test("real-duration count mismatch (body changed since render) yields no marks", () => {
    const from = 1
    const segs = buildKokoroSpeechSegments(BODY, { fromSentenceIndex: from })
    const durations = segs.map(() => 3).concat([3])
    expect(
      estimateChapterSentenceMarksFromN(BODY, {
        fromSentenceIndex: from,
        segmentDurationsSec: durations,
      })
    ).toEqual([])
  })
})
