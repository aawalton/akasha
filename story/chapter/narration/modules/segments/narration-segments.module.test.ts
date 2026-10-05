import { describe, expect, test } from "bun:test"
import {
  narrationSegmentsOf,
  sentencesOf,
} from "akasha/story/chapter/narration/modules/segments/narration-segments.module.code.ts"

const texts = (prose: string): string[] => narrationSegmentsOf(prose).map((one) => one.text)

describe("narrationSegmentsOf", () => {
  test("a chapter with no words has no segment", () => {
    expect(narrationSegmentsOf("\n\n  \n")).toEqual([])
  })

  test("the first segment is the first sentence alone, and the rest of its paragraph follows", () => {
    expect(narrationSegmentsOf("She ran. The door shut. It was dark.\nShe waited.")).toEqual([
      { text: "She ran.", pauseAfterMs: 150 },
      { text: "The door shut. It was dark.", pauseAfterMs: 450 },
      { text: "She waited.", pauseAfterMs: 900 },
    ])
  })

  test("a segment never runs past its limit and keeps whole sentences", () => {
    const sentence = "The rain had not stopped for three days and the river kept rising."
    const paragraph = Array.from({ length: 30 }, () => sentence).join(" ")
    const segments = texts(`Start.\n${paragraph}`)
    expect(segments.every((one) => one.length <= 600)).toBe(true)
    expect(segments.slice(1).every((one) => one.endsWith("rising."))).toBe(true)
    expect(segments.slice(1).join(" ")).toBe(paragraph)
  })

  test("a sentence longer than the limit is cut before the limit", () => {
    const long = `${"word ".repeat(150)}and then, ${"more ".repeat(10)}done.`
    const segments = texts(`Start.\n${long}`)
    expect(segments.length).toBeGreaterThan(2)
    expect(segments.every((one) => one.length <= 600)).toBe(true)
  })

  test("a scene break and a heading each leave a longer pause", () => {
    expect(narrationSegmentsOf("One.\n\n***\n\nTwo.\n## Part Two\nThree.")).toEqual([
      { text: "One.", pauseAfterMs: 900 },
      { text: "Two.", pauseAfterMs: 900 },
      { text: "Part Two.", pauseAfterMs: 900 },
      { text: "Three.", pauseAfterMs: 900 },
    ])
  })

  test("markdown is said as the words it marks", () => {
    expect(
      texts("Start.\n**The Tower**\nShe *really* meant it, [truly](https://x.y) and `fully`.")
    ).toEqual(["Start.", "The Tower.", "She really meant it, truly and fully."])
  })

  test("a window is said as plain sentences between longer pauses", () => {
    expect(
      narrationSegmentsOf("She looked.\n\n:::skill\nname: Devotion\n:::\n\nShe smiled.")
    ).toEqual([
      { text: "She looked.", pauseAfterMs: 900 },
      { text: "New skill: Devotion.", pauseAfterMs: 900 },
      { text: "She smiled.", pauseAfterMs: 900 },
    ])
  })

  test("a fenced screen is said one line at a time", () => {
    expect(
      texts("She read it.\n```stat-screen\n[SKILL ACQUIRED]\nType: Passive\n```\nDone.")
    ).toEqual(["She read it.", "Skill Acquired. Type: Passive.", "Done."])
  })

  test("the same chapter always gives the same segments", () => {
    const prose = "One. Two.\n\n***\n\n:::level-up\nlevel: 2\n:::\nThree."
    expect(narrationSegmentsOf(prose)).toEqual(narrationSegmentsOf(prose))
  })
})

describe("sentencesOf", () => {
  test("a title or an initial ends no sentence", () => {
    expect(
      sentencesOf("Mr. Hale met Dr. Ruiz on St. Anne's Street. J. R. waved, e.g. twice.")
    ).toEqual(["Mr. Hale met Dr. Ruiz on St. Anne's Street.", "J. R. waved, e.g. twice."])
  })

  test("a closing quote stays with its sentence", () => {
    expect(sentencesOf("“Run!” she said. “Now.” He ran.")).toEqual([
      "“Run!” she said.",
      "“Now.”",
      "He ran.",
    ])
  })
})
