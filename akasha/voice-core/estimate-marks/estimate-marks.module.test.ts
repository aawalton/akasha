import { describe, expect, test } from "bun:test"
import {
  estimateChapterSentenceMarks,
  estimateChapterSentenceMarksFromN,
  estimateSentenceMarks,
} from "./estimate-marks.module.code.ts"

describe("estimateSentenceMarks", () => {
  test("answers nothing where the durations do not match the pieces", () => {
    expect(estimateSentenceMarks(["One."], ["One."], [1, 2])).toEqual([])
  })

  test("answers nothing for no pieces", () => {
    expect(estimateSentenceMarks(["One."], [], [])).toEqual([])
  })

  test("answers nothing for no sentences", () => {
    expect(estimateSentenceMarks([], ["One."], [1])).toEqual([])
  })

  test("starts the first sentence at nothing", () => {
    const marks = estimateSentenceMarks(["One.", "Two."], ["One. Two."], [10])
    expect(marks[0]).toEqual({ sentenceIndex: 0, startSec: 0 })
  })

  test("places a later sentence by how far into its piece it opens", () => {
    const marks = estimateSentenceMarks(["ab.", "cd."], ["ab. cd."], [7])
    expect(marks.length).toBe(2)
    expect(marks[1]?.startSec).toBeCloseTo(4, 5)
  })

  test("carries starts forward across pieces", () => {
    const marks = estimateSentenceMarks(["One.", "Two."], ["One.", "Two."], [3, 5])
    expect(marks[0]?.startSec).toBeCloseTo(0, 5)
    expect(marks[1]?.startSec).toBeCloseTo(3, 5)
  })

  test("never goes backwards", () => {
    const marks = estimateSentenceMarks(["One.", "Two.", "Three."], ["One. Two.", "Three."], [4, 6])
    for (let at = 1; at < marks.length; at++) {
      expect(marks[at]?.startSec).toBeGreaterThanOrEqual(marks[at - 1]?.startSec ?? 0)
    }
  })

  test("leaves a sentence starting past the last piece unmarked", () => {
    const marks = estimateSentenceMarks(["ab.", "cd.", "ef."], ["ab."], [2])
    expect(marks.length).toBe(1)
  })
})

describe("estimateChapterSentenceMarks", () => {
  test("marks each sentence of a body", () => {
    const marks = estimateChapterSentenceMarks("One. Two. Three.", [10])
    expect(marks.length).toBe(3)
    expect(marks[0]?.sentenceIndex).toBe(0)
  })
})

describe("estimateChapterSentenceMarksFromN", () => {
  test("numbers marks against the whole rather than the part", () => {
    const marks = estimateChapterSentenceMarksFromN("One. Two. Three.", { fromSentenceIndex: 1 })
    expect(marks[0]?.sentenceIndex).toBe(1)
  })

  test("guesses durations where none are given", () => {
    const marks = estimateChapterSentenceMarksFromN("One. Two. Three.", { fromSentenceIndex: 0 })
    expect(marks.length).toBe(3)
    expect(marks[2]?.startSec).toBeGreaterThan(0)
  })

  test("reads a negative opening as the start", () => {
    const marks = estimateChapterSentenceMarksFromN("One. Two.", { fromSentenceIndex: -5 })
    expect(marks[0]?.sentenceIndex).toBe(0)
  })
})
