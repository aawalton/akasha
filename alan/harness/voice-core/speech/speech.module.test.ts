import { describe, expect, test } from "bun:test"
import {
  buildKokoroSpeechSegments,
  chunkForContinuousRenderWithFlags,
  formatForSpeech,
  MAX_SPEECH_CHARS,
  MAX_SPEECH_SEGMENTS,
  packSegments,
  planSpeechSegments,
  splitSentences,
} from "./speech.module.code.ts"
import {
  giantSingleSentence,
  longMultiSegmentText,
  packedAlphaText,
  pathologicalWord,
} from "./speech.module.test-fixtures.ts"

describe("splitSentences", () => {
  test("cuts at a stop followed by space", () => {
    expect(splitSentences("One. Two! Three?")).toEqual(["One.", "Two!", "Three?"])
  })

  test("answers nothing for empty text", () => {
    expect(splitSentences("   ")).toEqual([])
  })
})

describe("packSegments", () => {
  test("packs several sentences into one piece", () => {
    expect(packSegments(["a.", "b.", "c."], 100)).toEqual(["a. b. c."])
  })

  test("keeps every piece inside the budget", () => {
    const packed = packSegments(splitSentences(longMultiSegmentText()))
    expect(packed.length).toBeGreaterThan(1)
    for (const piece of packed) expect(piece.length).toBeLessThanOrEqual(MAX_SPEECH_CHARS)
  })

  test("breaks a word longer than the budget inside itself", () => {
    const packed = packSegments([pathologicalWord()])
    expect(packed.length).toBeGreaterThan(2)
    for (const piece of packed) expect(piece.length).toBeLessThanOrEqual(MAX_SPEECH_CHARS)
  })

  test("breaks a long sentence between its words", () => {
    const packed = packSegments([giantSingleSentence()])
    for (const piece of packed) expect(piece.length).toBeLessThanOrEqual(MAX_SPEECH_CHARS)
  })
})

describe("formatForSpeech", () => {
  test("flattens a fenced block to a note", () => {
    const said = formatForSpeech("Before.\n\n```\nlet x = 1\n```\n\nAfter.")
    expect(said.join(" ")).toContain("code omitted")
    expect(said.join(" ")).not.toContain("let x = 1")
  })

  test("strips heading and emphasis marks", () => {
    expect(formatForSpeech("# Title\n\n**bold** and _thin_.")).toEqual(["Title bold and thin."])
  })

  test("takes a link's text and drops its target", () => {
    expect(formatForSpeech("See [the page](https://example.com).")).toEqual(["See the page."])
  })

  test("answers nothing for text that flattens away", () => {
    expect(formatForSpeech("   \n\n  ")).toEqual([])
  })

  test("opens partway when told to", () => {
    const whole = formatForSpeech("One. Two. Three.")
    const rest = formatForSpeech("One. Two. Three.", { fromSentenceIndex: 1 })
    expect(whole.join(" ")).toContain("One.")
    expect(rest.join(" ")).not.toContain("One.")
    expect(rest.join(" ")).toContain("Three.")
  })

  test("never answers more pieces than the cap", () => {
    const said = formatForSpeech(packedAlphaText().repeat(200))
    expect(said.length).toBeLessThanOrEqual(MAX_SPEECH_SEGMENTS)
  })
})

describe("planSpeechSegments", () => {
  test("names one piece by the message alone", () => {
    expect(planSpeechSegments("m1", ["only"])).toEqual([
      { id: "m1", text: "only", label: "message m1" },
    ])
  })

  test("numbers several pieces", () => {
    const planned = planSpeechSegments("m1", ["a", "b"])
    expect(planned.map((one) => one.id)).toEqual(["m1-seg0", "m1-seg1"])
    expect(planned[1]?.label).toBe("message m1 segment 2/2")
  })

  test("passes over an empty piece", () => {
    expect(planSpeechSegments("m1", ["a", "", "b"]).length).toBe(2)
  })
})

describe("buildKokoroSpeechSegments", () => {
  test("takes a leading bracketed marker off a paragraph", () => {
    const said = buildKokoroSpeechSegments("[narrator] A line.\n\n[aside] Another.")
    expect(said.join(" ")).not.toContain("[narrator]")
    expect(said.join(" ")).not.toContain("[aside]")
    expect(said.join(" ")).toContain("A line.")
  })
})

describe("chunkForContinuousRenderWithFlags", () => {
  test("says a paragraph opens at each chunk it starts", () => {
    const chunks = chunkForContinuousRenderWithFlags("One.\n\nTwo.", { maxChars: 4 })
    expect(chunks.length).toBe(2)
    expect(chunks.every((one) => one.startsParagraph)).toBe(true)
  })

  test("joins short paragraphs under the budget", () => {
    const chunks = chunkForContinuousRenderWithFlags("One.\n\nTwo.", { maxChars: 100 })
    expect(chunks.length).toBe(1)
    expect(chunks[0]?.text).toBe("One. Two.")
  })

  test("marks only the first piece of a split paragraph as opening one", () => {
    const chunks = chunkForContinuousRenderWithFlags(longMultiSegmentText(), { maxChars: 300 })
    expect(chunks.length).toBeGreaterThan(1)
    expect(chunks[0]?.startsParagraph).toBe(true)
    expect(chunks[1]?.startsParagraph).toBe(false)
  })
})
