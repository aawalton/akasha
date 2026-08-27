import { describe, expect, test } from "bun:test"
import { detectMarkdownShorthand, type ShorthandTransform } from "./markdown-shorthand"

function atEnd(text: string, trigger: "space" | "enter"): ShorthandTransform | null {
  return detectMarkdownShorthand(text, text.length, trigger)
}

describe("detectMarkdownShorthand — space-triggered positives", () => {
  test("# → heading 1 (marker kept in text, #15038)", () => {
    expect(atEnd("#", "space")).toEqual({ kind: "turn", type: "heading", level: 1, marker: "# " })
  })
  test("## → heading 2", () => {
    expect(atEnd("##", "space")).toEqual({ kind: "turn", type: "heading", level: 2, marker: "## " })
  })
  test("### → heading 3", () => {
    expect(atEnd("###", "space")).toEqual({
      kind: "turn",
      type: "heading",
      level: 3,
      marker: "### ",
    })
  })
  test("#### does NOT transform (Notion caps at 3 levels)", () => {
    expect(atEnd("####", "space")).toBeNull()
  })

  test("- → bulleted list", () => {
    expect(atEnd("-", "space")).toEqual({ kind: "turn", type: "bulleted-list-item", marker: "- " })
  })
  test("* → bulleted list", () => {
    expect(atEnd("*", "space")).toEqual({ kind: "turn", type: "bulleted-list-item", marker: "- " })
  })
  test("+ → bulleted list", () => {
    expect(atEnd("+", "space")).toEqual({ kind: "turn", type: "bulleted-list-item", marker: "- " })
  })

  test("1. → numbered list (typed ordinal preserved in marker)", () => {
    expect(atEnd("1.", "space")).toEqual({
      kind: "turn",
      type: "numbered-list-item",
      marker: "1. ",
    })
  })
  test("any integer prefix → numbered list (its own ordinal)", () => {
    expect(atEnd("5.", "space")).toEqual({
      kind: "turn",
      type: "numbered-list-item",
      marker: "5. ",
    })
    expect(atEnd("42.", "space")).toEqual({
      kind: "turn",
      type: "numbered-list-item",
      marker: "42. ",
    })
  })
  test("lettered/roman prefixes do NOT transform (no v1 style field)", () => {
    expect(atEnd("a.", "space")).toBeNull()
    expect(atEnd("i.", "space")).toBeNull()
  })
  test("a bare number without a dot does NOT transform", () => {
    expect(atEnd("1", "space")).toBeNull()
  })

  test("> → toggle, seeding the literal '> ' marker (#15038)", () => {
    expect(atEnd(">", "space")).toEqual({ kind: "turn", type: "toggle", marker: "> " })
  })
  test('" → quote (Notion documented quote trigger; stays quote after the > remap)', () => {
    expect(atEnd('"', "space")).toEqual({ kind: "turn", type: "quote", marker: '" ' })
  })

  test("[] → unchecked to-do (canonical '[ ] ' marker)", () => {
    expect(atEnd("[]", "space")).toEqual({
      kind: "turn",
      type: "to-do",
      checked: false,
      marker: "[ ] ",
    })
  })
  test("[ ] → unchecked to-do", () => {
    expect(atEnd("[ ]", "space")).toEqual({
      kind: "turn",
      type: "to-do",
      checked: false,
      marker: "[ ] ",
    })
  })
  test("[x] → checked to-do", () => {
    expect(atEnd("[x]", "space")).toEqual({
      kind: "turn",
      type: "to-do",
      checked: true,
      marker: "[x] ",
    })
  })
  test("[X] → checked to-do (canonical lowercase '[x] ' marker)", () => {
    expect(atEnd("[X]", "space")).toEqual({
      kind: "turn",
      type: "to-do",
      checked: true,
      marker: "[x] ",
    })
  })

  test("``` → code block (fence kept in text)", () => {
    expect(atEnd("```", "space")).toEqual({ kind: "turn", type: "code", marker: "``` " })
  })
})

describe("detectMarkdownShorthand — Enter-triggered divider", () => {
  test("--- + Enter → divider", () => {
    expect(atEnd("---", "enter")).toEqual({ kind: "divider" })
  })
  test("--- + space does NOT transform (divider fires on Enter only)", () => {
    expect(atEnd("---", "space")).toBeNull()
  })
  test("-- (two dashes) + Enter does NOT transform", () => {
    expect(atEnd("--", "enter")).toBeNull()
  })
  test("# + Enter does NOT transform (headings fire on space only)", () => {
    expect(atEnd("#", "enter")).toBeNull()
  })
})

describe("detectMarkdownShorthand — negative cases (must NOT transform)", () => {
  test("mid-block: caret not at end → null", () => {
    expect(detectMarkdownShorthand("#", 0, "space")).toBeNull()
  })
  test("already-typed content after the prefix → null", () => {
    expect(atEnd("# hello", "space")).toBeNull()
    expect(atEnd("- already a list?", "space")).toBeNull()
  })
  test("prefix not at the very start (leading text) → null", () => {
    expect(atEnd("x#", "space")).toBeNull()
    expect(atEnd("text -", "space")).toBeNull()
  })
  test("escaped prefix (leading backslash) → null", () => {
    expect(atEnd("\\#", "space")).toBeNull()
    expect(atEnd("\\>", "space")).toBeNull()
  })
  test("empty block → null", () => {
    expect(atEnd("", "space")).toBeNull()
    expect(atEnd("", "enter")).toBeNull()
  })
  test("unrelated text → null", () => {
    expect(atEnd("hello", "space")).toBeNull()
  })
})
