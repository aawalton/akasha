import { describe, expect, it } from "bun:test"
import {
  estimateProseBlockHeight,
  isSceneBreak,
  parseProseBlocks,
  proseBlockSource,
  splitInlineEmphasis,
} from "./reader-prose"

describe("isSceneBreak", () => {
  it("accepts 3+ identical asterisks / dashes / underscores, spaces allowed", () => {
    expect(isSceneBreak("***")).toBe(true)
    expect(isSceneBreak("****")).toBe(true)
    expect(isSceneBreak("------")).toBe(true)
    expect(isSceneBreak("___")).toBe(true)
    expect(isSceneBreak("* * *")).toBe(true)
    expect(isSceneBreak("  ***  ")).toBe(true)
    expect(isSceneBreak("- - - -")).toBe(true)
  })

  it("rejects fewer than 3 markers", () => {
    expect(isSceneBreak("**")).toBe(false)
    expect(isSceneBreak("--")).toBe(false)
    expect(isSceneBreak("*")).toBe(false)
  })

  it("rejects mixed markers and lines with other characters", () => {
    expect(isSceneBreak("* - *")).toBe(false)
    expect(isSceneBreak("--- TAMORA ---")).toBe(false)
    expect(isSceneBreak("The end.")).toBe(false)
    expect(isSceneBreak("")).toBe(false)
  })
})

describe("parseProseBlocks", () => {
  it("makes each non-blank line its own paragraph, dropping blank separators", () => {
    const blocks = parseProseBlocks("First line.\n\nSecond line.\nThird line.")
    expect(blocks).toEqual([
      { kind: "paragraph", text: "First line." },
      { kind: "paragraph", text: "Second line." },
      { kind: "paragraph", text: "Third line." },
    ])
  })

  it("recognizes a thematic-break line as a scene break", () => {
    const blocks = parseProseBlocks("Before.\n***\nAfter.")
    expect(blocks).toEqual([
      { kind: "paragraph", text: "Before." },
      { kind: "scene-break" },
      { kind: "paragraph", text: "After." },
    ])
  })

  it("collects a triple-backtick fence as one monospace block, info string dropped", () => {
    const blocks = parseProseBlocks("```stat-screen\nHP: 10\nMP: 5\n```\nAfter.")
    expect(blocks).toEqual([
      { kind: "fence", text: "HP: 10\nMP: 5" },
      { kind: "paragraph", text: "After." },
    ])
  })

  it("keeps blank lines and thematic-break-looking text INSIDE a fence literal", () => {
    const blocks = parseProseBlocks("```\nline\n\n***\n```")
    expect(blocks).toEqual([{ kind: "fence", text: "line\n\n***" }])
  })

  it("renders an unterminated fence as a block running to EOF", () => {
    const blocks = parseProseBlocks("```\nunclosed\nmore")
    expect(blocks).toEqual([{ kind: "fence", text: "unclosed\nmore" }])
  })

  it("leaves headings and links as literal paragraphs (out of the grammar)", () => {
    const blocks = parseProseBlocks("# Heading\n[label](https://example.com)")
    expect(blocks).toEqual([
      { kind: "paragraph", text: "# Heading" },
      { kind: "paragraph", text: "[label](https://example.com)" },
    ])
  })

  it("returns no blocks for an empty body", () => {
    expect(parseProseBlocks("")).toEqual([])
    expect(parseProseBlocks("\n\n  \n")).toEqual([])
  })
})

describe("splitInlineEmphasis", () => {
  it("wraps a paired *span* as emphasis, keeping surrounding text", () => {
    expect(splitInlineEmphasis("It was *leaping*, not stepping.")).toEqual([
      { kind: "text", text: "It was " },
      { kind: "em", text: "leaping" },
      { kind: "text", text: ", not stepping." },
    ])
  })

  it("handles multiple emphasis spans on one line", () => {
    expect(splitInlineEmphasis("*Tik.* *Tik.*")).toEqual([
      { kind: "em", text: "Tik." },
      { kind: "text", text: " " },
      { kind: "em", text: "Tik." },
    ])
  })

  it("leaves an unpaired asterisk literal", () => {
    expect(splitInlineEmphasis("3 * 4 = 12")).toEqual([{ kind: "text", text: "3 * 4 = 12" }])
  })

  it("degrades **bold** to a literal outer pair around an emphasized inner span", () => {
    expect(splitInlineEmphasis("**bold**")).toEqual([
      { kind: "text", text: "*" },
      { kind: "em", text: "bold" },
      { kind: "text", text: "*" },
    ])
  })

  it("returns the whole line as text when there is no emphasis", () => {
    expect(splitInlineEmphasis("plain prose")).toEqual([{ kind: "text", text: "plain prose" }])
  })
})

describe("proseBlockSource / estimateProseBlockHeight", () => {
  it("weighs a scene break as its nominal source and paragraphs/fences by text", () => {
    expect(proseBlockSource({ kind: "scene-break" })).toBe("***")
    expect(proseBlockSource({ kind: "paragraph", text: "hello" })).toBe("hello")
    expect(proseBlockSource({ kind: "fence", text: "a\nb" })).toBe("a\nb")
  })

  it("gives a scene break a fixed height and longer paragraphs more height", () => {
    const sceneBreak = estimateProseBlockHeight({ kind: "scene-break" })
    const shortPara = estimateProseBlockHeight({ kind: "paragraph", text: "short" })
    const longPara = estimateProseBlockHeight({
      kind: "paragraph",
      text: "x".repeat(300),
    })
    expect(sceneBreak).toBeGreaterThan(0)
    expect(longPara).toBeGreaterThan(shortPara)
    expect(estimateProseBlockHeight({ kind: "fence", text: "a\nb\nc\nd" })).toBeGreaterThan(
      estimateProseBlockHeight({ kind: "fence", text: "a" })
    )
  })
})
