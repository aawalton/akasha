import { describe, expect, test } from "bun:test"
import { type Block, blockSchema, type RichDocument } from "./rich-document"
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

describe("applyEditorOp moveBlock", () => {
  const doc = docOf(
    createBlock("paragraph", { id: "a", text: "a" }),
    createBlock("paragraph", { id: "b", text: "b" }),
    createBlock("paragraph", { id: "c", text: "c" })
  )

  test("move up swaps with the previous block", () => {
    const next = applyEditorOp(doc, { kind: "moveBlock", id: "b", direction: "up" })
    expect(next.blocks.map((x) => x.id)).toEqual(["b", "a", "c"])
  })

  test("move down swaps with the next block", () => {
    const next = applyEditorOp(doc, { kind: "moveBlock", id: "b", direction: "down" })
    expect(next.blocks.map((x) => x.id)).toEqual(["a", "c", "b"])
  })

  test("move up at the first block is a no-op", () => {
    const next = applyEditorOp(doc, { kind: "moveBlock", id: "a", direction: "up" })
    expect(next.blocks.map((x) => x.id)).toEqual(["a", "b", "c"])
  })

  test("move down at the last block is a no-op", () => {
    const next = applyEditorOp(doc, { kind: "moveBlock", id: "c", direction: "down" })
    expect(next.blocks.map((x) => x.id)).toEqual(["a", "b", "c"])
  })

  test("unknown id leaves the doc unchanged", () => {
    const next = applyEditorOp(doc, { kind: "moveBlock", id: "ghost", direction: "up" })
    expect(next.blocks.map((x) => x.id)).toEqual(["a", "b", "c"])
  })
})

describe("editorOpToPatch moveBlock", () => {
  const doc = docOf(
    createBlock("paragraph", { id: "a", text: "a" }),
    createBlock("paragraph", { id: "b", text: "b" }),
    createBlock("paragraph", { id: "c", text: "c" })
  )

  test("move up emits remove-then-add and round-trips to the reducer doc", () => {
    const op: EditorOp = { kind: "moveBlock", id: "b", direction: "up" }
    const patch = patchOf(editorOpToPatch(doc, op, "body"))
    expect(patch).toEqual([
      { op: "remove", path: "/body/blocks/1" },
      {
        op: "add",
        path: "/body/blocks/0",
        value: createBlock("paragraph", { id: "b", text: "b" }),
      },
    ])
    expect(applyPatch(doc, patch, "body")).toEqual(applyEditorOp(doc, op))
  })

  test("move down emits remove-then-add and round-trips to the reducer doc", () => {
    const op: EditorOp = { kind: "moveBlock", id: "b", direction: "down" }
    const patch = patchOf(editorOpToPatch(doc, op, "body"))
    expect(patch).toEqual([
      { op: "remove", path: "/body/blocks/1" },
      {
        op: "add",
        path: "/body/blocks/2",
        value: createBlock("paragraph", { id: "b", text: "b" }),
      },
    ])
    expect(applyPatch(doc, patch, "body")).toEqual(applyEditorOp(doc, op))
  })

  test("no-op move at an end emits an empty patch", () => {
    expect(
      patchOf(editorOpToPatch(doc, { kind: "moveBlock", id: "a", direction: "up" }, "body"))
    ).toEqual([])
    expect(
      patchOf(editorOpToPatch(doc, { kind: "moveBlock", id: "c", direction: "down" }, "body"))
    ).toEqual([])
  })

  test("unknown id emits an empty patch", () => {
    expect(
      patchOf(editorOpToPatch(doc, { kind: "moveBlock", id: "ghost", direction: "up" }, "body"))
    ).toEqual([])
  })
})

describe("applyEditorOp duplicateBlock", () => {
  const doc = docOf(
    createBlock("heading", { id: "a", text: "title", level: 2 }),
    createBlock("to-do", { id: "b", text: "[x] task" })
  )

  test("clones the block after itself with the supplied newId", () => {
    const next = applyEditorOp(doc, { kind: "duplicateBlock", id: "a", newId: "a2" })
    expect(next.blocks.map((x) => x.id)).toEqual(["a", "a2", "b"])
    expect(next.blocks[1]).toEqual(createBlock("heading", { id: "a2", text: "title", level: 2 }))
  })

  test("preserves the literal to-do marker text in the clone", () => {
    const next = applyEditorOp(doc, { kind: "duplicateBlock", id: "b", newId: "b2" })
    expect(next.blocks[2]).toEqual(createBlock("to-do", { id: "b2", text: "[x] task" }))
  })

  test("unknown id leaves the doc unchanged", () => {
    const next = applyEditorOp(doc, { kind: "duplicateBlock", id: "ghost", newId: "z" })
    expect(next.blocks.map((x) => x.id)).toEqual(["a", "b"])
  })
})

describe("editorOpToPatch duplicateBlock", () => {
  const doc = docOf(
    createBlock("heading", { id: "a", text: "title", level: 2 }),
    createBlock("to-do", { id: "b", text: "[x] task" })
  )

  test("emits a single add of the clone after the source and round-trips", () => {
    const op: EditorOp = { kind: "duplicateBlock", id: "a", newId: "a2" }
    const patch = patchOf(editorOpToPatch(doc, op, "body"))
    expect(patch).toEqual([
      {
        op: "add",
        path: "/body/blocks/1",
        value: createBlock("heading", { id: "a2", text: "title", level: 2 }),
      },
    ])
    expect(applyPatch(doc, patch, "body")).toEqual(applyEditorOp(doc, op))
  })

  test("unknown id emits an empty patch", () => {
    expect(
      patchOf(editorOpToPatch(doc, { kind: "duplicateBlock", id: "ghost", newId: "z" }, "body"))
    ).toEqual([])
  })
})
