import { describe, expect, test } from "bun:test"
import { type Block, blockSchema, type RichDocument, richDocumentSchema } from "./rich-document"
import { applyEditorOp, createBlock, type EditorOp } from "./rich-document-ops"
import {
  editorOpToPatch,
  type JsonPatchLike,
  type PersistInstruction,
} from "./rich-document-persist"

function applyPatch(doc: RichDocument, patch: JsonPatchLike, bodyKey: string): RichDocument {
  const blocks: Block[] = doc.blocks.slice()
  const prefix = `/${bodyKey}/blocks/`
  for (const op of patch) {
    const rest = op.path.slice(prefix.length)
    const [idxStr, field] = rest.split("/")
    const idx = Number(idxStr)
    switch (op.op) {
      case "add":
        blocks.splice(idx, 0, blockSchema.parse(op.value))
        break
      case "remove":
        blocks.splice(idx, 1)
        break
      case "replace":
        if (field === "text") {
          const text = op.value
          if (typeof text !== "string") throw new Error("text replace value is not a string")
          blocks[idx] = { ...blocks[idx], text }
        } else {
          blocks[idx] = blockSchema.parse(op.value)
        }
        break
      default:
        break
    }
  }
  return { blocks }
}

function patchOf(instruction: PersistInstruction): JsonPatchLike {
  if (instruction.kind !== "patch") throw new Error("expected patch instruction")
  return instruction.patch
}

function docOf(...blocks: readonly Block[]): RichDocument {
  return { blocks }
}

describe("editorOpToPatch init case", () => {
  test("prevDoc null -> init with applied op", () => {
    const block = createBlock("paragraph", { id: "a", text: "hi" })
    const out = editorOpToPatch(null, { kind: "insertAfter", afterId: null, block }, "body")
    expect(out.kind).toBe("init")
    if (out.kind !== "init") throw new Error("unreachable")
    expect(out.bodyKey).toBe("body")
    expect(out.value.blocks.map((b) => b.id)).toEqual(["a"])
  })

  test("prevDoc not-an-object -> init", () => {
    const block = createBlock("paragraph", { id: "a" })
    const garbage: unknown = "garbage"
    const out = editorOpToPatch(garbage, { kind: "insertAfter", afterId: null, block }, "body")
    expect(out.kind).toBe("init")
  })

  test("prevDoc missing blocks array -> init", () => {
    const block = createBlock("paragraph", { id: "a" })
    const missingBlocks: unknown = { notBlocks: 1 }
    const out = editorOpToPatch(
      missingBlocks,
      { kind: "insertAfter", afterId: null, block },
      "body"
    )
    expect(out.kind).toBe("init")
  })

  test("empty {blocks:[]} + insertAfter null -> init (not granular add)", () => {
    const block = createBlock("paragraph", { id: "a", text: "x" })
    const out = editorOpToPatch(docOf(), { kind: "insertAfter", afterId: null, block }, "notes")
    expect(out.kind).toBe("init")
    if (out.kind !== "init") throw new Error("unreachable")
    expect(out.bodyKey).toBe("notes")
    expect(out.value.blocks.map((b) => b.id)).toEqual(["a"])
  })
})

describe("editorOpToPatch patch shapes", () => {
  const doc = docOf(
    createBlock("paragraph", { id: "a", text: "foo" }),
    createBlock("paragraph", { id: "b", text: "bar" })
  )

  test("insertAfter null -> add at index 0", () => {
    const block = createBlock("paragraph", { id: "new" })
    const patch = patchOf(
      editorOpToPatch(doc, { kind: "insertAfter", afterId: null, block }, "body")
    )
    expect(patch).toEqual([{ op: "add", path: "/body/blocks/0", value: block }])
  })

  test("insertAfter id -> add at idx+1", () => {
    const block = createBlock("paragraph", { id: "new" })
    const patch = patchOf(
      editorOpToPatch(doc, { kind: "insertAfter", afterId: "a", block }, "body")
    )
    expect(patch[0]).toMatchObject({ op: "add", path: "/body/blocks/1" })
  })

  test("insertAfter unknown id -> empty patch", () => {
    const block = createBlock("paragraph", { id: "new" })
    const patch = patchOf(
      editorOpToPatch(doc, { kind: "insertAfter", afterId: "ghost", block }, "body")
    )
    expect(patch).toEqual([])
  })

  test("updateText -> replace .../text", () => {
    const patch = patchOf(
      editorOpToPatch(doc, { kind: "updateText", id: "b", text: "baz" }, "body")
    )
    expect(patch).toEqual([{ op: "replace", path: "/body/blocks/1/text", value: "baz" }])
  })

  test("turnInto -> whole-block replace at idx", () => {
    const patch = patchOf(
      editorOpToPatch(doc, { kind: "turnInto", id: "a", type: "heading", level: 2 }, "body")
    )
    expect(patch).toHaveLength(1)
    const op = patch[0]
    expect(op).toMatchObject({ op: "replace", path: "/body/blocks/0" })
    if (op?.op !== "replace") throw new Error("expected a replace op")
    const value = blockSchema.parse(op.value)
    expect(value.type).toBe("heading")
    expect(value.level).toBe(2)
  })

  test("deleteBlock -> remove at idx", () => {
    const patch = patchOf(editorOpToPatch(doc, { kind: "deleteBlock", id: "b" }, "body"))
    expect(patch).toEqual([{ op: "remove", path: "/body/blocks/1" }])
  })

  test("mergeWithPrevious -> replace prev text + remove cur (in order)", () => {
    const patch = patchOf(editorOpToPatch(doc, { kind: "mergeWithPrevious", id: "b" }, "body"))
    expect(patch).toEqual([
      { op: "replace", path: "/body/blocks/0/text", value: "foobar" },
      { op: "remove", path: "/body/blocks/1" },
    ])
  })

  test("mergeWithPrevious at index 0 -> empty patch", () => {
    const patch = patchOf(editorOpToPatch(doc, { kind: "mergeWithPrevious", id: "a" }, "body"))
    expect(patch).toEqual([])
  })

  test("unknown id -> empty patch", () => {
    const patch = patchOf(
      editorOpToPatch(doc, { kind: "updateText", id: "ghost", text: "x" }, "body")
    )
    expect(patch).toEqual([])
  })

  test("honors a non-default bodyKey", () => {
    const patch = patchOf(editorOpToPatch(doc, { kind: "deleteBlock", id: "a" }, "content"))
    expect(patch).toEqual([{ op: "remove", path: "/content/blocks/0" }])
  })

  test("patched docs stay valid against richDocumentSchema", () => {
    const ops: EditorOp[] = [
      { kind: "updateText", id: "a", text: "X" },
      { kind: "turnInto", id: "b", type: "to-do" },
      { kind: "deleteBlock", id: "a" },
    ]
    let cur = doc
    for (const op of ops) {
      const patch = patchOf(editorOpToPatch(cur, op, "body"))
      cur = applyPatch(cur, patch, "body")
      expect(richDocumentSchema.safeParse(cur).success).toBe(true)
    }
  })
})

describe("applyEditorOp and editorOpToPatch agree", () => {
  test("a sequence of ops produces identical docs via reducer and via patches", () => {
    const start = docOf(
      createBlock("paragraph", { id: "a", text: "alpha" }),
      createBlock("heading", { id: "b", text: "beta", level: 1 }),
      createBlock("to-do", { id: "c", text: "[ ] gamma" })
    )

    const sequence: EditorOp[] = [
      {
        kind: "insertAfter",
        afterId: "a",
        block: createBlock("paragraph", { id: "d", text: "delta" }),
      },
      {
        kind: "insertAfter",
        afterId: null,
        block: createBlock("paragraph", { id: "e", text: "epsilon" }),
      },
      { kind: "updateText", id: "b", text: "BETA" },
      { kind: "turnInto", id: "a", type: "heading", level: 2 },
      { kind: "turnInto", id: "d", type: "to-do" },
      { kind: "updateText", id: "c", text: "[x] gamma" },
      { kind: "moveBlock", id: "b", direction: "up" },
      { kind: "duplicateBlock", id: "d", newId: "d2" },
      { kind: "mergeWithPrevious", id: "c" },
      { kind: "deleteBlock", id: "e" },
    ]

    let viaReducer = start
    let viaPatches = start
    for (const op of sequence) {
      viaReducer = applyEditorOp(viaReducer, op)
      const instruction = editorOpToPatch(viaPatches, op, "body")
      viaPatches = applyPatch(viaPatches, patchOf(instruction), "body")
    }

    expect(viaPatches).toEqual(viaReducer)
    expect(richDocumentSchema.safeParse(viaReducer).success).toBe(true)
  })
})
