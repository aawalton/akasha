import { describe, expect, test } from "bun:test"
import type { Block, RichDocument } from "./rich-document"
import {
  applyEditorOp,
  createBlock,
  newBlockId,
  normalizeRichDocument,
  V1_BLOCK_TYPES,
  type V1BlockType,
} from "./rich-document-ops"

describe("createBlock", () => {
  test("creates each v1 type with an id", () => {
    for (const type of V1_BLOCK_TYPES) {
      const block = createBlock(type)
      expect(block.type).toBe(type)
      expect(typeof block.id).toBe("string")
      expect((block.id ?? "").length).toBeGreaterThan(0)
    }
  })

  test("heading defaults to level 1, honors explicit level", () => {
    expect(createBlock("heading").level).toBe(1)
    expect(createBlock("heading", { level: 3 }).level).toBe(3)
    expect(createBlock("heading", { text: "Hi" }).text).toBe("Hi")
  })

  test("to-do carries no checked field (checkedness lives in the literal marker)", () => {
    const block = createBlock("to-do")
    expect(block.text).toBe("")
    expect("checked" in block).toBe(false)
  })

  test("divider has no text field", () => {
    const block = createBlock("divider")
    expect("text" in block).toBe(false)
  })

  test("text-bearing blocks default to empty text", () => {
    for (const type of [
      "paragraph",
      "bulleted-list-item",
      "numbered-list-item",
      "quote",
      "code",
    ] as const) {
      expect(createBlock(type).text).toBe("")
    }
  })

  test("honors an explicit id", () => {
    expect(createBlock("paragraph", { id: "fixed" }).id).toBe("fixed")
  })
})

describe("newBlockId", () => {
  test("returns distinct non-empty strings", () => {
    const a = newBlockId()
    const b = newBlockId()
    expect(a).not.toBe(b)
    expect(a.length).toBeGreaterThan(0)
  })
})

describe("normalizeRichDocument", () => {
  test("nullish / empty / garbage -> { blocks: [] }", () => {
    expect(normalizeRichDocument(null)).toEqual({ blocks: [] })
    expect(normalizeRichDocument(undefined)).toEqual({ blocks: [] })
    expect(normalizeRichDocument("")).toEqual({ blocks: [] })
    expect(normalizeRichDocument("nope")).toEqual({ blocks: [] })
    expect(normalizeRichDocument(42)).toEqual({ blocks: [] })
    expect(normalizeRichDocument({ notBlocks: [] })).toEqual({ blocks: [] })
  })

  test("assigns ids to id-less blocks", () => {
    const doc = normalizeRichDocument({ blocks: [{ type: "paragraph", text: "a" }] })
    expect(doc.blocks).toHaveLength(1)
    expect(typeof doc.blocks[0].id).toBe("string")
    expect((doc.blocks[0].id ?? "").length).toBeGreaterThan(0)
  })

  test("preserves existing ids and passthrough fields", () => {
    const doc = normalizeRichDocument({
      blocks: [{ id: "keep", type: "heading", text: "T", level: 2, custom: "x" }],
    })
    expect(doc.blocks[0].id).toBe("keep")
    expect(doc.blocks[0].level).toBe(2)
    expect(doc.blocks[0].custom).toBe("x")
  })
})

function docOf(...blocks: readonly Block[]): RichDocument {
  return { blocks }
}

describe("applyEditorOp", () => {
  test("insertAfter null inserts at index 0", () => {
    const doc = docOf(createBlock("paragraph", { id: "a", text: "a" }))
    const block = createBlock("paragraph", { id: "new", text: "new" })
    const next = applyEditorOp(doc, { kind: "insertAfter", afterId: null, block })
    expect(next.blocks.map((b) => b.id)).toEqual(["new", "a"])
  })

  test("insertAfter id inserts after that block", () => {
    const doc = docOf(createBlock("paragraph", { id: "a" }), createBlock("paragraph", { id: "b" }))
    const block = createBlock("paragraph", { id: "mid" })
    const next = applyEditorOp(doc, { kind: "insertAfter", afterId: "a", block })
    expect(next.blocks.map((b) => b.id)).toEqual(["a", "mid", "b"])
  })

  test("insertAfter unknown id is a no-op", () => {
    const doc = docOf(createBlock("paragraph", { id: "a" }))
    const block = createBlock("paragraph", { id: "new" })
    const next = applyEditorOp(doc, { kind: "insertAfter", afterId: "ghost", block })
    expect(next.blocks.map((b) => b.id)).toEqual(["a"])
  })

  test("updateText sets text", () => {
    const doc = docOf(createBlock("paragraph", { id: "a", text: "old" }))
    const next = applyEditorOp(doc, { kind: "updateText", id: "a", text: "new" })
    expect(next.blocks[0].text).toBe("new")
  })

  test("turnInto heading sets level", () => {
    const doc = docOf(createBlock("paragraph", { id: "a", text: "x" }))
    const next = applyEditorOp(doc, { kind: "turnInto", id: "a", type: "heading", level: 2 })
    expect(next.blocks[0].type).toBe("heading")
    expect(next.blocks[0].level).toBe(2)
    expect(next.blocks[0].text).toBe("x")
    expect(next.blocks[0].id).toBe("a")
  })

  test("turnInto paragraph drops level", () => {
    const doc = docOf(createBlock("heading", { id: "a", text: "x", level: 3 }))
    const next = applyEditorOp(doc, { kind: "turnInto", id: "a", type: "paragraph" })
    expect(next.blocks[0].type).toBe("paragraph")
    expect("level" in next.blocks[0]).toBe(false)
    expect(next.blocks[0].text).toBe("x")
  })

  test("turnInto to-do prepends the literal marker and carries no checked field", () => {
    const doc = docOf(createBlock("paragraph", { id: "a", text: "x" }))
    const next = applyEditorOp(doc, { kind: "turnInto", id: "a", type: "to-do" })
    expect(next.blocks[0].type).toBe("to-do")
    expect(next.blocks[0].text).toBe("[ ] x")
    expect("checked" in next.blocks[0]).toBe(false)
  })

  test("turnInto bullet prepends the marker; turnInto paragraph strips it", () => {
    const doc = docOf(createBlock("paragraph", { id: "a", text: "x" }))
    const bulleted = applyEditorOp(doc, { kind: "turnInto", id: "a", type: "bulleted-list-item" })
    expect(bulleted.blocks[0].text).toBe("- x")
    const back = applyEditorOp(bulleted, { kind: "turnInto", id: "a", type: "paragraph" })
    expect(back.blocks[0].type).toBe("paragraph")
    expect(back.blocks[0].text).toBe("x")
  })

  test("turnInto toggle prepends the '> ' marker; turnInto paragraph strips it (#15038)", () => {
    const doc = docOf(createBlock("paragraph", { id: "a", text: "Section" }))
    const toggled = applyEditorOp(doc, { kind: "turnInto", id: "a", type: "toggle" })
    expect(toggled.blocks[0].type).toBe("toggle")
    expect(toggled.blocks[0].text).toBe("> Section")
    const back = applyEditorOp(toggled, { kind: "turnInto", id: "a", type: "paragraph" })
    expect(back.blocks[0].type).toBe("paragraph")
    expect(back.blocks[0].text).toBe("Section")
  })

  test("turnInto divider drops text", () => {
    const doc = docOf(createBlock("paragraph", { id: "a", text: "x" }))
    const next = applyEditorOp(doc, { kind: "turnInto", id: "a", type: "divider" })
    expect(next.blocks[0].type).toBe("divider")
    expect("text" in next.blocks[0]).toBe(false)
  })

  test("turnInto unknown id is a no-op", () => {
    const doc = docOf(createBlock("paragraph", { id: "a" }))
    const next = applyEditorOp(doc, { kind: "turnInto", id: "ghost", type: "heading" })
    expect(next.blocks[0].type).toBe("paragraph")
  })

  test("deleteBlock removes the block", () => {
    const doc = docOf(createBlock("paragraph", { id: "a" }), createBlock("paragraph", { id: "b" }))
    const next = applyEditorOp(doc, { kind: "deleteBlock", id: "a" })
    expect(next.blocks.map((b) => b.id)).toEqual(["b"])
  })

  test("deleteBlock unknown id is a no-op", () => {
    const doc = docOf(createBlock("paragraph", { id: "a" }))
    const next = applyEditorOp(doc, { kind: "deleteBlock", id: "ghost" })
    expect(next.blocks).toHaveLength(1)
  })

  test("mergeWithPrevious appends text to previous and removes current", () => {
    const doc = docOf(
      createBlock("paragraph", { id: "a", text: "foo" }),
      createBlock("paragraph", { id: "b", text: "bar" })
    )
    const next = applyEditorOp(doc, { kind: "mergeWithPrevious", id: "b" })
    expect(next.blocks.map((b) => b.id)).toEqual(["a"])
    expect(next.blocks[0].text).toBe("foobar")
  })

  test("mergeWithPrevious at index 0 is unchanged", () => {
    const doc = docOf(
      createBlock("paragraph", { id: "a", text: "foo" }),
      createBlock("paragraph", { id: "b", text: "bar" })
    )
    const next = applyEditorOp(doc, { kind: "mergeWithPrevious", id: "a" })
    expect(next.blocks.map((b) => b.id)).toEqual(["a", "b"])
    expect(next.blocks[0].text).toBe("foo")
  })

  test("assigns ids to id-less blocks already in the doc", () => {
    const doc: RichDocument = { blocks: [{ type: "paragraph", text: "a" }] }
    const next = applyEditorOp(doc, { kind: "updateText", id: "ghost", text: "x" })
    expect(typeof next.blocks[0].id).toBe("string")
  })
})

const _typeGuard: V1BlockType = "paragraph"
void _typeGuard
