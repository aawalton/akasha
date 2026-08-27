import { describe, expect, test } from "bun:test"
import { isRecord } from "../../../utils-narrow/src/is-record"
import { type Block, blockSchema, type RichDocument, richDocumentSchema } from "./rich-document"
import { applyEditorOp, createBlock, type EditorOp } from "./rich-document-ops"
import { editorOpToPatch, type PersistInstruction } from "./rich-document-persist"

function tokens(pointer: string): readonly string[] {
  return pointer.split("/").slice(1)
}

function applyOp(node: unknown, toks: readonly string[], kind: string, value: unknown): unknown {
  const head = toks[0]
  if (head === undefined) throw new Error("applyPatch: empty pointer")
  const deeper = toks.slice(1)
  if (Array.isArray(node)) {
    const arr = [...node]
    const idx = Number(head)
    if (deeper.length > 0) arr[idx] = applyOp(arr[idx], deeper, kind, value)
    else if (kind === "remove") arr.splice(idx, 1)
    else if (kind === "add") arr.splice(idx, 0, value)
    else if (kind === "replace") arr[idx] = value
    else throw new Error(`applyPatch: unsupported op "${kind}"`)
    return arr
  }
  if (isRecord(node)) {
    const rec = { ...node }
    if (deeper.length > 0) rec[head] = applyOp(rec[head], deeper, kind, value)
    else if (kind === "remove") delete rec[head]
    else rec[head] = value
    return rec
  }
  throw new Error(`applyPatch: pointer traversal left the tree at "${head}"`)
}

function applyPatch(
  doc: RichDocument,
  instruction: PersistInstruction,
  bodyKey: string
): RichDocument {
  if (instruction.kind !== "patch") {
    throw new Error("applyPatch: expected a patch instruction")
  }
  let root: unknown = { [bodyKey]: structuredClone(doc) }
  for (const op of instruction.patch) {
    root = applyOp(root, tokens(op.path), op.op, structuredClone(op.value))
  }
  if (!isRecord(root)) throw new Error("applyPatch: root is not an object")
  const body = root[bodyKey]
  return richDocumentSchema.parse(body)
}

function patchOf(
  instruction: PersistInstruction
): readonly { op: string; path: string; value?: unknown }[] {
  if (instruction.kind !== "patch") throw new Error("expected patch instruction")
  return instruction.patch
}

function withChildren(block: Block, children: readonly Block[]): Block {
  return { ...block, children }
}
function nestedDoc(): RichDocument {
  const a1 = createBlock("paragraph", { id: "a1", text: "one" })
  const a2 = createBlock("paragraph", { id: "a2", text: "two" })
  const a3 = createBlock("paragraph", { id: "a3", text: "three" })
  const a = withChildren(createBlock("toggle", { id: "a", text: "a" }), [a1, a2, a3])
  const b = createBlock("paragraph", { id: "b", text: "b" })
  return { blocks: [a, b] }
}

function agree(doc: RichDocument, op: EditorOp): undefined {
  const instruction = editorOpToPatch(doc, op, "body")
  expect(instruction.kind).toBe("patch")
  expect(applyPatch(doc, instruction, "body")).toEqual(applyEditorOp(doc, op))
}

describe("indent (reducer)", () => {
  test("moves a top-level block into the previous sibling's children (creating the array)", () => {
    const a = createBlock("paragraph", { id: "a", text: "a" })
    const b = createBlock("paragraph", { id: "b", text: "b" })
    const doc: RichDocument = { blocks: [a, b] }
    expect(applyEditorOp(doc, { kind: "indent", id: "b" })).toEqual({
      blocks: [withChildren(a, [b])],
    })
  })

  test("appends into an existing children array", () => {
    const a1 = createBlock("paragraph", { id: "a1", text: "one" })
    const a = withChildren(createBlock("toggle", { id: "a", text: "a" }), [a1])
    const b = createBlock("paragraph", { id: "b", text: "b" })
    const doc: RichDocument = { blocks: [a, b] }
    expect(applyEditorOp(doc, { kind: "indent", id: "b" })).toEqual({
      blocks: [withChildren(createBlock("toggle", { id: "a", text: "a" }), [a1, b])],
    })
  })

  test("is a no-op for the first block in its sibling array (no previous sibling)", () => {
    const doc = nestedDoc()
    expect(applyEditorOp(doc, { kind: "indent", id: "a" })).toEqual(doc)
    expect(applyEditorOp(doc, { kind: "indent", id: "a1" })).toEqual(doc)
  })

  test("indents a nested block into its previous nested sibling", () => {
    const doc = nestedDoc()
    const result = applyEditorOp(doc, { kind: "indent", id: "a2" })
    const a = result.blocks[0]
    expect(a?.children?.map((c) => c.id)).toEqual(["a1", "a3"])
    expect(a?.children?.[0]?.children?.map((c) => c.id)).toEqual(["a2"])
  })
})

describe("outdent (reducer)", () => {
  test("lifts a child to sit after its parent in the grandparent array", () => {
    const b = createBlock("paragraph", { id: "b", text: "b" })
    const a = withChildren(createBlock("toggle", { id: "a", text: "a" }), [b])
    const doc: RichDocument = { blocks: [a] }
    expect(applyEditorOp(doc, { kind: "outdent", id: "b" })).toEqual({
      blocks: [withChildren(createBlock("toggle", { id: "a", text: "a" }), []), b],
    })
  })

  test("is a no-op for a top-level block (nothing to outdent into)", () => {
    const doc = nestedDoc()
    expect(applyEditorOp(doc, { kind: "outdent", id: "a" })).toEqual(doc)
    expect(applyEditorOp(doc, { kind: "outdent", id: "b" })).toEqual(doc)
  })

  test("outdents a middle child, leaving its later siblings in place", () => {
    const doc = nestedDoc()
    const result = applyEditorOp(doc, { kind: "outdent", id: "a2" })
    expect(result.blocks.map((x) => x.id)).toEqual(["a", "a2", "b"])
    expect(result.blocks[0]?.children?.map((c) => c.id)).toEqual(["a1", "a3"])
  })
})

describe("mergeWithPrevious (reducer) preserves nested subtrees", () => {
  test("appends the merged block's children onto the previous sibling", () => {
    const a1 = createBlock("paragraph", { id: "a1", text: "x" })
    const grand = createBlock("paragraph", { id: "grand", text: "g" })
    const a2 = withChildren(createBlock("paragraph", { id: "a2", text: "y" }), [grand])
    const a = withChildren(createBlock("toggle", { id: "a", text: "a" }), [a1, a2])
    const doc: RichDocument = { blocks: [a] }
    const result = applyEditorOp(doc, { kind: "mergeWithPrevious", id: "a2" })
    const kids = result.blocks[0]?.children
    expect(kids?.map((c) => c.id)).toEqual(["a1"])
    expect(kids?.[0]?.text).toBe("xy")
    expect(kids?.[0]?.children?.map((c) => c.id)).toEqual(["grand"])
  })
})

describe("reducer↔patch agreement at depth ≥ 2", () => {
  test("indent into an existing nested children array", () => {
    const a1 = withChildren(createBlock("paragraph", { id: "a1", text: "one" }), [
      createBlock("paragraph", { id: "a1x", text: "deep" }),
    ])
    const a2 = createBlock("paragraph", { id: "a2", text: "two" })
    const a3 = createBlock("paragraph", { id: "a3", text: "three" })
    const a = withChildren(createBlock("toggle", { id: "a", text: "a" }), [a1, a2, a3])
    const b = createBlock("paragraph", { id: "b", text: "b" })
    const seeded: RichDocument = { blocks: [a, b] }
    agree(seeded, { kind: "indent", id: "a2" })
  })

  test("indent creating a fresh nested children array", () => {
    const doc = nestedDoc()
    agree(doc, { kind: "indent", id: "a2" })
  })

  test("outdent a nested child up one level", () => {
    const doc = nestedDoc()
    agree(doc, { kind: "outdent", id: "a2" })
  })

  test("insertAfter a nested block adds a sibling child", () => {
    const doc = nestedDoc()
    agree(doc, {
      kind: "insertAfter",
      afterId: "a1",
      block: createBlock("paragraph", { id: "a1b", text: "new" }),
    })
  })

  test("updateText on a nested block", () => {
    const doc = nestedDoc()
    agree(doc, { kind: "updateText", id: "a2", text: "edited" })
  })

  test("deleteBlock on a nested block", () => {
    const doc = nestedDoc()
    agree(doc, { kind: "deleteBlock", id: "a2" })
  })

  test("moveBlock within a nested sibling array", () => {
    const doc = nestedDoc()
    agree(doc, { kind: "moveBlock", id: "a3", direction: "up" })
  })
})

describe("nested patch pointer shapes", () => {
  test("indent emits remove + add against nested pointers", () => {
    const doc = nestedDoc()
    const patch = patchOf(editorOpToPatch(doc, { kind: "indent", id: "a2" }, "body"))
    expect(patch[0]).toEqual({ op: "remove", path: "/body/blocks/0/children/1" })
    expect(patch[1]?.op).toBe("add")
    expect(patch[1]?.path).toBe("/body/blocks/0/children/0/children")
    const secondOp = patch[1]
    if (secondOp === undefined || !Array.isArray(secondOp.value)) {
      throw new Error("expected an add op carrying a fresh children array")
    }
    expect(blockSchema.parse(secondOp.value[0]).id).toBe("a2")
  })

  test("outdent emits remove + add lifting into the grandparent array", () => {
    const b = createBlock("paragraph", { id: "b", text: "b" })
    const a = withChildren(createBlock("toggle", { id: "a", text: "a" }), [b])
    const doc: RichDocument = { blocks: [a] }
    const patch = patchOf(editorOpToPatch(doc, { kind: "outdent", id: "b" }, "body"))
    expect(patch[0]).toEqual({ op: "remove", path: "/body/blocks/0/children/0" })
    expect(patch[1]?.op).toBe("add")
    expect(patch[1]?.path).toBe("/body/blocks/1")
  })
})
