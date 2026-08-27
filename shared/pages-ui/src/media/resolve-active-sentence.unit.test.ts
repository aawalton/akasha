import { describe, expect, test } from "bun:test"
import type { SentenceMark } from "@alanwalton/voice-core/voice/mark-schema"
import { resolveActiveSentence } from "./resolve-active-sentence"

const marks: readonly SentenceMark[] = [
  { sentenceIndex: 0, startSec: 0 },
  { sentenceIndex: 1, startSec: 2.5 },
  { sentenceIndex: 2, startSec: 5 },
  { sentenceIndex: 3, startSec: 9.25 },
]

describe("resolveActiveSentence", () => {
  test("empty marks → null", () => {
    expect(resolveActiveSentence([], 3)).toBeNull()
  })

  test("time before the first mark's startSec → null (nothing has started)", () => {
    const late: readonly SentenceMark[] = [{ sentenceIndex: 0, startSec: 1.5 }]
    expect(resolveActiveSentence(late, 0.5)).toBeNull()
  })

  test("time exactly on a mark's startSec → that sentence", () => {
    expect(resolveActiveSentence(marks, 5)).toBe(2)
    expect(resolveActiveSentence(marks, 0)).toBe(0)
  })

  test("time between two marks → the earlier (last mark with startSec ≤ t)", () => {
    expect(resolveActiveSentence(marks, 3)).toBe(1)
    expect(resolveActiveSentence(marks, 8.9)).toBe(2)
  })

  test("time after the last mark → the last sentence", () => {
    expect(resolveActiveSentence(marks, 100)).toBe(3)
  })

  test("single mark, time at/after it → its sentence", () => {
    const one: readonly SentenceMark[] = [{ sentenceIndex: 7, startSec: 0 }]
    expect(resolveActiveSentence(one, 0)).toBe(7)
    expect(resolveActiveSentence(one, 50)).toBe(7)
  })

  test("returns the mark's sentenceIndex, not its array position", () => {
    const sparse: readonly SentenceMark[] = [
      { sentenceIndex: 4, startSec: 0 },
      { sentenceIndex: 10, startSec: 3 },
    ]
    expect(resolveActiveSentence(sparse, 1)).toBe(4)
    expect(resolveActiveSentence(sparse, 3)).toBe(10)
  })
})
