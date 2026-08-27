import { describe, expect, test } from "bun:test"
import {
  CONTINUOUS_CHUNK_CHARS,
  chunkForContinuousRender,
  chunkForContinuousRenderWithFlags,
  formatForSpeech,
  MAX_SPEECH_SEGMENTS,
} from "../speech"

describe("chunkForContinuousRender", () => {
  test("empty / whitespace-only input yields no chunks", () => {
    expect(chunkForContinuousRender("   \n\n  \n ")).toEqual([])
  })

  test("two short paragraphs share one chunk joined by a single space", () => {
    expect(chunkForContinuousRender("First paragraph.\n\nSecond paragraph.")).toEqual([
      "First paragraph. Second paragraph.",
    ])
  })

  test("flattens each paragraph's inline markdown", () => {
    const content = "# Heading\n**bold** and _italic_\n\n- a bullet with `code`"
    expect(chunkForContinuousRender(content)).toEqual([
      "Heading bold and italic a bullet with code",
    ])
  })

  test("yields fewer, larger chunks than formatForSpeech on the same long text", () => {
    const paragraph = `${"lorem ipsum dolor sit amet consectetur ".repeat(8).trim()}.`
    const content = `${paragraph}\n\n`.repeat(12).trim()
    const chunks = chunkForContinuousRender(content)
    const segments = formatForSpeech(content)
    expect(chunks.length).toBeGreaterThan(0)
    expect(chunks.length).toBeLessThan(segments.length)
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(CONTINUOUS_CHUNK_CHARS)
    }
  })

  test("respects paragraph boundaries while never exceeding budget", () => {
    const paragraph = "word ".repeat(100).trim()
    const content = `${paragraph}\n\n`.repeat(6).trim()
    const chunks = chunkForContinuousRender(content, { maxChars: 1200 })
    expect(chunks.length).toBeGreaterThan(1)
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(1200)
    }
  })

  test("a single over-budget paragraph is sentence-split under the budget", () => {
    const sentence = `${"alpha bravo charlie delta echo foxtrot".repeat(4).trim()}.`
    const paragraph = `${sentence} `.repeat(30).trim()
    const chunks = chunkForContinuousRender(paragraph, { maxChars: 900 })
    expect(chunks.length).toBeGreaterThan(1)
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(900)
    }
    expect(chunks.join(" ")).toBe(paragraph)
  })

  test("caps the chunk count for a pathological many-paragraph input", () => {
    const content = `${"word more text here.".repeat(90)}\n\n`
      .repeat(MAX_SPEECH_SEGMENTS + 50)
      .trim()
    const chunks = chunkForContinuousRender(content, { maxChars: 200 })
    expect(chunks.length).toBe(MAX_SPEECH_SEGMENTS)
  })
})

describe("chunkForContinuousRenderWithFlags", () => {
  test("text projection is byte-identical to chunkForContinuousRender", () => {
    const cases = [
      "First paragraph.\n\nSecond paragraph.",
      "# Heading\n**bold** and _italic_\n\n- a bullet with `code`",
      `${"word ".repeat(100).trim()}\n\n`.repeat(6).trim(),
      `${"alpha bravo charlie delta echo foxtrot".repeat(4).trim()}. `.repeat(30).trim(),
    ]
    for (const content of cases) {
      const flagged = chunkForContinuousRenderWithFlags(content, { maxChars: 900 })
      expect(flagged.map((c) => c.text)).toEqual([
        ...chunkForContinuousRender(content, { maxChars: 900 }),
      ])
    }
  })

  test("every merge-path chunk begins at a paragraph boundary (startsParagraph true)", () => {
    expect(
      chunkForContinuousRenderWithFlags("alpha\n\nbravo\n\ncharlie", { maxChars: 10 })
    ).toEqual([
      { text: "alpha", startsParagraph: true },
      { text: "bravo", startsParagraph: true },
      { text: "charlie", startsParagraph: true },
    ])
  })

  test("an over-budget paragraph's sentence-split chunks: first starts it, interior chunks do not", () => {
    expect(chunkForContinuousRenderWithFlags("Aa. Bb. Cc. Dd.", { maxChars: 10 })).toEqual([
      { text: "Aa. Bb.", startsParagraph: true },
      { text: "Cc. Dd.", startsParagraph: false },
    ])
  })

  test("mixed: a short paragraph then a long one — only the long paragraph's interior is mid-paragraph", () => {
    expect(chunkForContinuousRenderWithFlags("Hi.\n\nAa. Bb. Cc. Dd.", { maxChars: 10 })).toEqual([
      { text: "Hi.", startsParagraph: true },
      { text: "Aa. Bb.", startsParagraph: true },
      { text: "Cc. Dd.", startsParagraph: false },
    ])
  })
})
