import { describe, expect, it } from "bun:test"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import { buildTree, type TreeNode } from "./index"

type TestItem = { id: string; data: { parents?: readonly string[] } }

function makeItem(id: string, parents?: readonly string[]): TestItem {
  return { id, data: { parents } }
}

describe("buildTree", () => {
  it("returns empty array for empty input", () => {
    expect(buildTree([])).toEqual([])
  })

  it("returns a single root for an item with no parents", () => {
    const items = [makeItem("a")]
    const result = buildTree(items)
    expect(result).toEqual([{ item: requireFirst(items), children: [], depth: 0 }])
  })

  it("builds parent-child relationship", () => {
    const parent = makeItem("parent")
    const child = makeItem("child", ["parent"])
    const result = buildTree([parent, child])

    expect(result).toHaveLength(1)
    const root = requireFirst(result)
    expect(root.item.id).toBe("parent")
    expect(root.depth).toBe(0)
    expect(root.children).toHaveLength(1)
    const childNode = requireFirst(root.children)
    expect(childNode.item.id).toBe("child")
    expect(childNode.depth).toBe(1)
  })

  it("builds 3-level nesting with correct depths", () => {
    const items = [makeItem("root"), makeItem("mid", ["root"]), makeItem("leaf", ["mid"])]
    const result = buildTree(items)

    expect(result).toHaveLength(1)
    const root = requireFirst(result)
    expect(root.depth).toBe(0)
    const mid = requireFirst(root.children)
    expect(mid.depth).toBe(1)
    const leaf = requireFirst(mid.children)
    expect(leaf.depth).toBe(2)
    expect(leaf.item.id).toBe("leaf")
  })

  it("supports multi-parent DAG (child appears under both parents)", () => {
    const items = [makeItem("p1"), makeItem("p2"), makeItem("child", ["p1", "p2"])]
    const result = buildTree(items)

    expect(result).toHaveLength(2)
    const p1 = result.find((n) => n.item.id === "p1")
    const p2 = result.find((n) => n.item.id === "p2")
    if (p1 === undefined) throw new Error("expected p1 root")
    if (p2 === undefined) throw new Error("expected p2 root")
    expect(p1.children).toHaveLength(1)
    expect(requireFirst(p1.children).item.id).toBe("child")
    expect(p2.children).toHaveLength(1)
    expect(requireFirst(p2.children).item.id).toBe("child")
  })

  it("caps depth at 10 (excludes nodes beyond depth 10)", () => {
    const items: TestItem[] = []
    for (let i = 0; i < 13; i++) {
      items.push(makeItem(`a${i}`, i > 0 ? [`a${i - 1}`] : undefined))
    }
    const result = buildTree(items)

    let maxDepth = 0
    let node: TreeNode<TestItem> | undefined = result[0]
    while (node) {
      maxDepth = node.depth
      node = node.children[0]
    }

    expect(maxDepth).toBe(10)
  })

  it("treats items with unknown parent IDs as roots", () => {
    const items = [makeItem("orphan", ["nonexistent"])]
    const result = buildTree(items)

    expect(result).toHaveLength(1)
    const root = requireFirst(result)
    expect(root.item.id).toBe("orphan")
    expect(root.depth).toBe(0)
  })

  it("supports custom getParents callback", () => {
    type Custom = { id: string; parentIds: readonly string[] }
    const items: Custom[] = [
      { id: "root", parentIds: [] },
      { id: "child", parentIds: ["root"] },
    ]
    const result = buildTree(items, {
      getParents: (item) => item.parentIds,
    })

    expect(result).toHaveLength(1)
    const root = requireFirst(result)
    expect(root.item.id).toBe("root")
    expect(requireFirst(root.children).item.id).toBe("child")
  })

  it("treats items with empty parents array as roots", () => {
    const items = [makeItem("a", []), makeItem("b")]
    const result = buildTree(items)
    expect(result).toHaveLength(2)
  })
})
