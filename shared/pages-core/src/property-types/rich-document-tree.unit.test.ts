import { describe, expect, test } from "bun:test"
import type { Block, RichDocument } from "./rich-document"
import { createBlock } from "./rich-document-ops"
import {
  findBlock,
  findBlockPath,
  flattenBlockIds,
  getBlockAtPath,
  pointerForPath,
  siblingsPointer,
} from "./rich-document-tree"

function withChildren(block: Block, children: readonly Block[]): Block {
  return { ...block, children }
}

const a2x = createBlock("paragraph", { id: "a2x", text: "deep" })
const a1 = createBlock("paragraph", { id: "a1", text: "one" })
const a2 = withChildren(createBlock("toggle", { id: "a2", text: "two" }), [a2x])
const a = withChildren(createBlock("toggle", { id: "a", text: "a" }), [a1, a2])
const b = createBlock("paragraph", { id: "b", text: "b" })
const doc: RichDocument = { blocks: [a, b] }

describe("findBlockPath", () => {
  test("top-level blocks resolve to a single-element path", () => {
    expect(findBlockPath(doc.blocks, "a")).toEqual([0])
    expect(findBlockPath(doc.blocks, "b")).toEqual([1])
  })

  test("nested blocks resolve to their full index path", () => {
    expect(findBlockPath(doc.blocks, "a1")).toEqual([0, 0])
    expect(findBlockPath(doc.blocks, "a2")).toEqual([0, 1])
    expect(findBlockPath(doc.blocks, "a2x")).toEqual([0, 1, 0])
  })

  test("an unknown id resolves to null", () => {
    expect(findBlockPath(doc.blocks, "ghost")).toBeNull()
  })
})

describe("getBlockAtPath", () => {
  test("returns the block at a nested path", () => {
    expect(getBlockAtPath(doc.blocks, [0, 1, 0])).toEqual(a2x)
    expect(getBlockAtPath(doc.blocks, [0])).toEqual(a)
  })

  test("returns undefined for an out-of-range path", () => {
    expect(getBlockAtPath(doc.blocks, [5])).toBeUndefined()
    expect(getBlockAtPath(doc.blocks, [0, 9])).toBeUndefined()
  })
})

describe("findBlock", () => {
  test("finds a block anywhere in the tree by id", () => {
    expect(findBlock(doc.blocks, "a2x")).toEqual(a2x)
    expect(findBlock(doc.blocks, "b")).toEqual(b)
  })

  test("returns undefined for an unknown id", () => {
    expect(findBlock(doc.blocks, "ghost")).toBeUndefined()
  })
})

describe("flattenBlockIds", () => {
  test("depth-first pre-order across the whole tree", () => {
    expect(flattenBlockIds(doc.blocks)).toEqual(["a", "a1", "a2", "a2x", "b"])
  })

  test("skips the children of a collapsed block", () => {
    expect(flattenBlockIds(doc.blocks, { isCollapsed: (id) => id === "a2" })).toEqual([
      "a",
      "a1",
      "a2",
      "b",
    ])
  })

  test("collapsing an ancestor hides its entire subtree", () => {
    expect(flattenBlockIds(doc.blocks, { isCollapsed: (id) => id === "a" })).toEqual(["a", "b"])
  })
})

describe("pointerForPath / siblingsPointer", () => {
  test("pointerForPath builds a nested RFC-6902 pointer", () => {
    expect(pointerForPath("body", [1])).toBe("/body/blocks/1")
    expect(pointerForPath("body", [0, 1])).toBe("/body/blocks/0/children/1")
    expect(pointerForPath("body", [0, 1, 0])).toBe("/body/blocks/0/children/1/children/0")
  })

  test("siblingsPointer targets the array containing the block at a path", () => {
    expect(siblingsPointer("body", [1])).toBe("/body/blocks")
    expect(siblingsPointer("body", [0, 1])).toBe("/body/blocks/0/children")
    expect(siblingsPointer("body", [0, 1, 0])).toBe("/body/blocks/0/children/1/children")
  })
})
