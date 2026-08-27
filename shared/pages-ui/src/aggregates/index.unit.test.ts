import { describe, expect, it } from "bun:test"
import { requireGet } from "../../../utils-narrow/src/require-get"
import type { TreeNode } from "../tree"
import { type AggregateNode, recomputeTree } from "./index"

type TestNode = AggregateNode

function leaf(id: string, weight: number, length: number, progress: number): TreeNode<TestNode> {
  return { item: { id, weight, length, progress }, children: [], depth: 0 }
}

function parent(
  id: string,
  weight: number,
  length: number,
  progress: number,
  children: readonly TreeNode<TestNode>[]
): TreeNode<TestNode> {
  return { item: { id, weight, length, progress }, children, depth: 0 }
}

describe("recomputeTree", () => {
  it("computes a single leaf with weight=1", () => {
    const results = recomputeTree([leaf("a", 1, 1000, 500)])
    const r = requireGet(results, "a")
    expect(r.totalLength).toBe(1000)
    expect(r.totalProgress).toBe(500)
    expect(r.totalCount).toBe(1)
    expect(r.totalRemaining).toBe(500)
  })

  it("treats weight=0 sentinel as weight=1", () => {
    const results = recomputeTree([leaf("a", 0, 1000, 500)])
    const r = requireGet(results, "a")
    expect(r.totalLength).toBe(1000)
    expect(r.totalProgress).toBe(500)
    expect(r.totalCount).toBe(1)
    expect(r.totalRemaining).toBe(500)
  })

  it("applies weight=2 to leaf", () => {
    const results = recomputeTree([leaf("a", 2, 1000, 500)])
    const r = requireGet(results, "a")
    expect(r.totalLength).toBe(2000)
    expect(r.totalProgress).toBe(1000)
    expect(r.totalCount).toBe(1)
    expect(r.totalRemaining).toBe(1000)
  })

  it("uses Math.trunc for fractional weight (PG ::integer parity)", () => {
    const results = recomputeTree([leaf("a", 1.5, 3, 1)])
    const r = requireGet(results, "a")
    expect(r.totalLength).toBe(4)
    expect(r.totalProgress).toBe(1)
    expect(r.totalRemaining).toBe(3)
  })

  it("computes parent with 2 leaf children", () => {
    const children = [leaf("c1", 1, 500, 200), leaf("c2", 1, 300, 100)]
    const root = parent("p", 1, 100, 50, children)
    const results = recomputeTree([root])

    const pr = requireGet(results, "p")
    expect(pr.totalLength).toBe(900)
    expect(pr.totalProgress).toBe(350)
    expect(pr.totalCount).toBe(3)
    expect(pr.totalRemaining).toBe(550)
  })

  it("computes 3-level tree (grandparent aggregates all)", () => {
    const grandchild = leaf("gc", 1, 200, 100)
    const mid = parent("mid", 1, 50, 25, [grandchild])
    const root = parent("root", 1, 10, 5, [mid])
    const results = recomputeTree([root])

    const midR = requireGet(results, "mid")
    expect(midR.totalLength).toBe(250)
    expect(midR.totalProgress).toBe(125)
    expect(midR.totalCount).toBe(2)

    const rootR = requireGet(results, "root")
    expect(rootR.totalLength).toBe(260)
    expect(rootR.totalProgress).toBe(130)
    expect(rootR.totalCount).toBe(3)
    expect(rootR.totalRemaining).toBe(130)
  })

  it("handles weight=0 at parent level", () => {
    const child = leaf("c", 1, 100, 50)
    const root = parent("p", 0, 200, 100, [child])
    const results = recomputeTree([root])

    const pr = requireGet(results, "p")
    expect(pr.totalLength).toBe(300)
    expect(pr.totalProgress).toBe(150)
    expect(pr.totalCount).toBe(2)
  })

  it("handles all-zero progress (totalRemaining = totalLength)", () => {
    const results = recomputeTree([leaf("a", 1, 500, 0)])
    const r = requireGet(results, "a")
    expect(r.totalRemaining).toBe(500)
  })

  it("handles complete item (progress = length, totalRemaining = 0)", () => {
    const results = recomputeTree([leaf("a", 1, 500, 500)])
    const r = requireGet(results, "a")
    expect(r.totalRemaining).toBe(0)
  })

  it("allows negative totalRemaining when progress > length", () => {
    const results = recomputeTree([leaf("a", 1, 100, 150)])
    const r = requireGet(results, "a")
    expect(r.totalRemaining).toBe(-50)
  })

  it("returns empty map for empty input", () => {
    const results = recomputeTree([])
    expect(results.size).toBe(0)
  })
})
