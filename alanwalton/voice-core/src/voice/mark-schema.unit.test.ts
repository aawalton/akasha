import { describe, expect, test } from "bun:test"
import { type SentenceMark, sentenceMarkSchema } from "./mark-schema"

describe("sentenceMarkSchema", () => {
  test("parses a well-formed mark", () => {
    const mark: SentenceMark = { sentenceIndex: 3, startSec: 12.5 }
    expect(sentenceMarkSchema.parse(mark)).toEqual(mark)
  })

  test("accepts the zero anchor (first sentence at the audio start)", () => {
    expect(sentenceMarkSchema.parse({ sentenceIndex: 0, startSec: 0 })).toEqual({
      sentenceIndex: 0,
      startSec: 0,
    })
  })

  test("rejects a negative sentence index", () => {
    expect(() => sentenceMarkSchema.parse({ sentenceIndex: -1, startSec: 0 })).toThrow()
  })

  test("rejects a non-integer sentence index", () => {
    expect(() => sentenceMarkSchema.parse({ sentenceIndex: 1.5, startSec: 0 })).toThrow()
  })

  test("rejects a negative start time", () => {
    expect(() => sentenceMarkSchema.parse({ sentenceIndex: 0, startSec: -0.1 })).toThrow()
  })

  test("is strict — an unexpected wire field fails loud", () => {
    expect(() =>
      sentenceMarkSchema.parse({ sentenceIndex: 0, startSec: 0, extra: "nope" })
    ).toThrow()
  })
})
