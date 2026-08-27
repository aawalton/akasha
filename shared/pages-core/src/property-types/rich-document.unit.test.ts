import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import {
  type Block,
  blockSchema,
  isBlankBlock,
  isBlocksValueEmpty,
  type RichDocument,
  richDocumentOps,
  richDocumentSchema,
  validateRichDocumentValue,
} from "./rich-document"

const def: PropertyDefinition = { id: "body", title: "Body", type: "rich-document" }

const sampleDoc: RichDocument = {
  blocks: [
    { id: "b1", type: "heading", text: "Title", level: 1 },
    { id: "b2", type: "paragraph", text: "Hello world" },
    {
      id: "b3",
      type: "bulleted-list",
      children: [
        { type: "list-item", text: "first" },
        { type: "list-item", text: "second" },
      ],
    },
    { id: "b4", type: "page-ref", pageId: "019ee898-6e65-7490-ac90-847090323db4" },
  ],
}

describe("richDocumentSchema", () => {
  test("accepts a representative block tree (nesting, ids, per-type fields)", () => {
    expect(richDocumentSchema.safeParse(sampleDoc).success).toBe(true)
  })

  test("accepts an empty document", () => {
    expect(richDocumentSchema.safeParse({ blocks: [] }).success).toBe(true)
  })

  test("passthrough preserves unknown per-type block fields (extensible JSONB set)", () => {
    const parsed = richDocumentSchema.parse({
      blocks: [{ type: "callout", emoji: "💡", color: "blue", text: "note" }],
    })
    const [block] = parsed.blocks
    expect(block?.emoji).toBe("💡")
    expect(block?.color).toBe("blue")
  })

  test("block id is optional (door left open for durable ids later)", () => {
    expect(blockSchema.safeParse({ type: "paragraph", text: "no id" }).success).toBe(true)
  })

  test("rejects a block missing its type", () => {
    expect(richDocumentSchema.safeParse({ blocks: [{ text: "x" }] }).success).toBe(false)
  })

  test("rejects an empty-string block type", () => {
    expect(richDocumentSchema.safeParse({ blocks: [{ type: "", text: "x" }] }).success).toBe(false)
  })

  test("rejects blocks that is not an array", () => {
    expect(richDocumentSchema.safeParse({ blocks: "nope" }).success).toBe(false)
  })

  test("rejects a missing blocks key", () => {
    expect(richDocumentSchema.safeParse({}).success).toBe(false)
  })

  test("strict wrapper rejects unknown top-level keys", () => {
    expect(richDocumentSchema.safeParse({ blocks: [], extra: 1 }).success).toBe(false)
  })

  test("rejects a non-string text field", () => {
    expect(richDocumentSchema.safeParse({ blocks: [{ type: "p", text: 5 }] }).success).toBe(false)
  })
})

describe("validateRichDocumentValue", () => {
  test("nullish / empty-string values are valid (unset body)", () => {
    expect(validateRichDocumentValue(null)).toBeNull()
    expect(validateRichDocumentValue(undefined)).toBeNull()
    expect(validateRichDocumentValue("")).toBeNull()
  })

  test("a valid document returns null", () => {
    expect(validateRichDocumentValue(sampleDoc)).toBeNull()
  })

  test("a malformed document returns a human-readable message", () => {
    const msg = validateRichDocumentValue({ blocks: [{ text: "no type" }] })
    expect(typeof msg).toBe("string")
    expect(msg).toContain("Rich-document")
  })
})

describe("isBlankBlock", () => {
  test("a text-bearing block with empty / whitespace text and no children is blank", () => {
    expect(isBlankBlock({ type: "paragraph", text: "" })).toBe(true)
    expect(isBlankBlock({ type: "paragraph", text: "   " })).toBe(true)
    expect(isBlankBlock({ type: "paragraph" })).toBe(false)
    expect(isBlankBlock({ type: "heading", text: "\t\n ", level: 1 })).toBe(true)
  })

  test("marker-only list / to-do blocks are blank (marker stripped)", () => {
    expect(isBlankBlock({ type: "bulleted-list-item", text: "- " })).toBe(true)
    expect(isBlankBlock({ type: "numbered-list-item", text: "1. " })).toBe(true)
    expect(isBlankBlock({ type: "to-do", text: "[ ] " })).toBe(true)
    expect(isBlankBlock({ type: "bulleted-list-item", text: "- item" })).toBe(false)
  })

  test("a block with text content is not blank", () => {
    expect(isBlankBlock({ type: "paragraph", text: "hi" })).toBe(false)
  })

  test("a block with children is never blank (holds structure)", () => {
    expect(
      isBlankBlock({ type: "paragraph", text: "", children: [{ type: "paragraph", text: "x" }] })
    ).toBe(false)
    expect(
      isBlankBlock({ type: "paragraph", text: "", children: [{ type: "paragraph", text: "" }] })
    ).toBe(false)
  })

  test("non-text content blocks (no text field) are never blank", () => {
    expect(isBlankBlock({ type: "divider" })).toBe(false)
    expect(isBlankBlock({ type: "page-ref", pageId: "019ee898-6e65-7490-ac90-847090323db4" })).toBe(
      false
    )
  })
})

describe("isBlocksValueEmpty", () => {
  test("nullish / empty-string values are empty", () => {
    expect(isBlocksValueEmpty(null)).toBe(true)
    expect(isBlocksValueEmpty(undefined)).toBe(true)
    expect(isBlocksValueEmpty("")).toBe(true)
  })

  test("a malformed non-nullish value is treated as non-empty (conservative)", () => {
    expect(isBlocksValueEmpty({ blocks: 3 })).toBe(false)
  })

  test("zero blocks is empty", () => {
    expect(isBlocksValueEmpty({ blocks: [] })).toBe(true)
  })

  test("solely blank blocks are empty (single and multiple)", () => {
    expect(isBlocksValueEmpty({ blocks: [{ type: "paragraph", text: "" }] })).toBe(true)
    expect(
      isBlocksValueEmpty({
        blocks: [
          { type: "paragraph", text: "" },
          { type: "bulleted-list-item", text: "- " },
          { type: "heading", text: "  ", level: 2 },
        ],
      })
    ).toBe(true)
  })

  test("any non-blank block makes the value non-empty", () => {
    expect(
      isBlocksValueEmpty({
        blocks: [
          { type: "paragraph", text: "" },
          { type: "paragraph", text: "content" },
        ],
      })
    ).toBe(false)
    expect(isBlocksValueEmpty({ blocks: [{ type: "divider" }] })).toBe(false)
    expect(isBlocksValueEmpty(sampleDoc)).toBe(false)
  })

  test("no full-schema parse on the hot path (extra top-level key still reads by blocks)", () => {
    expect(isBlocksValueEmpty({ blocks: [], extra: 1 })).toBe(true)
    expect(isBlocksValueEmpty({ blocks: [{ type: "paragraph", text: "" }], extra: 1 })).toBe(true)
    expect(isBlocksValueEmpty({ blocks: [{ type: "paragraph", text: "hi" }], extra: 1 })).toBe(
      false
    )
  })

  test("does not recurse into children (child subtree never inspected)", () => {
    const deepChild = { type: "paragraph", text: "", children: [{ this: "is not a valid block" }] }
    expect(isBlocksValueEmpty({ blocks: [deepChild] })).toBe(false)
  })

  test("non-object block elements are treated as content, without throwing", () => {
    expect(isBlocksValueEmpty({ blocks: [null] })).toBe(false)
    expect(isBlocksValueEmpty({ blocks: [42] })).toBe(false)
    expect(isBlocksValueEmpty({ blocks: [[{ type: "paragraph", text: "" }]] })).toBe(false)
  })
})

describe("richDocumentOps", () => {
  test("validate delegates to validateRichDocumentValue", () => {
    expect(richDocumentOps.validate(sampleDoc, def)).toBeNull()
    expect(richDocumentOps.validate({ blocks: 3 }, def)).not.toBeNull()
  })

  test("getSortValue is always null (structural, unsortable)", () => {
    expect(richDocumentOps.getSortValue(sampleDoc, def)).toBeNull()
    expect(richDocumentOps.getSortValue(null, def)).toBeNull()
  })

  test("getFilterOperators offers presence-only operators", () => {
    expect(richDocumentOps.getFilterOperators(def)).toEqual([
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })

  test("is_empty matches nullish, zero-block, and all-blank documents", () => {
    const pred = richDocumentOps.getFilterPredicate({ operator: "is_empty" }, def)
    expect(pred(null)).toBe(true)
    expect(pred("")).toBe(true)
    expect(pred({ blocks: [] })).toBe(true)
    expect(pred({ blocks: [{ type: "paragraph", text: "" }] })).toBe(true)
    expect(pred({ blocks: [{ type: "paragraph", text: "   " }] })).toBe(true)
    expect(pred(sampleDoc)).toBe(false)
  })

  test("is_not_empty is the inverse (single blank block is empty)", () => {
    const pred = richDocumentOps.getFilterPredicate({ operator: "is_not_empty" }, def)
    expect(pred(null)).toBe(false)
    expect(pred({ blocks: [] })).toBe(false)
    expect(pred({ blocks: [{ type: "paragraph", text: "" }] })).toBe(false)
    expect(pred(sampleDoc)).toBe(true)
  })

  test("unknown operator defaults to true (tolerant boundary)", () => {
    expect(richDocumentOps.getFilterPredicate({ operator: "contains" }, def)(sampleDoc)).toBe(true)
  })
})

describe("editor-op result shapes round-trip through the schema", () => {
  const base: RichDocument = {
    blocks: [
      { id: "b1", type: "paragraph", text: "one" },
      { id: "b2", type: "paragraph", text: "two" },
    ],
  }

  test("insert (add /blocks/N) — new block appended", () => {
    const inserted: Block = { id: "b3", type: "heading", text: "new" }
    const next = { blocks: [...base.blocks, inserted] }
    expect(richDocumentSchema.safeParse(next).success).toBe(true)
  })

  test("reorder (remove + add) — blocks swapped", () => {
    const [first, second] = base.blocks
    const next = { blocks: [second, first] }
    expect(richDocumentSchema.safeParse(next).success).toBe(true)
  })

  test("turn-into (replace /blocks/N/type) — block type changed", () => {
    const next = {
      blocks: base.blocks.map((b, i) => (i === 0 ? { ...b, type: "heading" } : b)),
    }
    expect(richDocumentSchema.safeParse(next).success).toBe(true)
  })

  test("edit (replace /blocks/N/text) — block text changed", () => {
    const next = {
      blocks: base.blocks.map((b, i) => (i === 1 ? { ...b, text: "edited" } : b)),
    }
    expect(richDocumentSchema.safeParse(next).success).toBe(true)
  })
})
