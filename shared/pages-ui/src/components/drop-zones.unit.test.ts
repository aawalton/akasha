import { describe, expect, test } from "bun:test"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import { computeDropZone, findDropZone } from "./drop-zones"

describe("computeDropZone", () => {
  const rect = { top: 100, height: 40 }

  test("top 25% → reorder before", () => {
    expect(computeDropZone(rect, 105, true)).toEqual({ type: "reorder", position: "before" })
  })

  test("bottom 25% → reorder after", () => {
    expect(computeDropZone(rect, 135, true)).toEqual({ type: "reorder", position: "after" })
  })

  test("center 50% on root item → nest", () => {
    expect(computeDropZone(rect, 120, true)).toEqual({ type: "nest" })
  })

  test("center 50% on child item → reorder", () => {
    expect(computeDropZone(rect, 115, false)).toEqual({ type: "reorder", position: "before" })
    expect(computeDropZone(rect, 125, false)).toEqual({ type: "reorder", position: "after" })
  })

  test("pointer above rect → null", () => {
    expect(computeDropZone(rect, 90, true)).toBeNull()
  })

  test("pointer below rect → null", () => {
    expect(computeDropZone(rect, 150, true)).toBeNull()
  })

  test("zero height rect → null", () => {
    expect(computeDropZone({ top: 100, height: 0 }, 100, true)).toBeNull()
  })

  test("boundary at exactly 25% → reorder before", () => {
    expect(computeDropZone(rect, 110, true)).toEqual({ type: "nest" })
  })

  test("boundary at exactly 75% → reorder after", () => {
    expect(computeDropZone(rect, 130, true)).toEqual({ type: "nest" })
  })
})

describe("findDropZone", () => {
  const items = [
    { id: "item-a", rect: { top: 0, height: 40 }, isRoot: true },
    { id: "item-b", rect: { top: 40, height: 40 }, isRoot: true },
    { id: "item-c", rect: { top: 80, height: 40 }, isRoot: true },
  ]

  test("returns nest zone when pointer is in center of root item", () => {
    const result = findDropZone(items, 60, "item-a")
    expect(result).toEqual({ id: "item-b", type: "nest" })
  })

  test("returns reorder before when pointer is in top edge", () => {
    const result = findDropZone(items, 42, "item-a")
    expect(result).toEqual({ id: "item-b", type: "reorder", position: "before" })
  })

  test("returns reorder after when pointer is in bottom edge", () => {
    const result = findDropZone(items, 78, "item-a")
    expect(result).toEqual({ id: "item-b", type: "reorder", position: "after" })
  })

  test("excludes the active item from results", () => {
    const result = findDropZone(items, 60, "item-b")
    expect(result?.id).not.toBe("item-b")
  })

  test("boundary: pointer above all items → reorder before first", () => {
    const result = findDropZone(items, -10, "item-c")
    expect(result).toEqual({ id: "item-a", type: "reorder", position: "before" })
  })

  test("boundary: pointer below all items → reorder after last", () => {
    const result = findDropZone(items, 200, "item-a")
    expect(result).toEqual({ id: "item-c", type: "reorder", position: "after" })
  })

  test("returns null for empty items", () => {
    expect(findDropZone([], 50, "item-a")).toBeNull()
  })

  test("returns null when only the active item exists", () => {
    expect(findDropZone([requireFirst(items)], 20, "item-a")).toBeNull()
  })

  test("child items get reorder zones in center", () => {
    const withChild = [
      { id: "parent", rect: { top: 0, height: 40 }, isRoot: true },
      { id: "child", rect: { top: 40, height: 40 }, isRoot: false },
      { id: "other", rect: { top: 80, height: 40 }, isRoot: true },
    ]
    const result = findDropZone(withChild, 60, "other")
    expect(result?.id).toBe("child")
    expect(result?.type).toBe("reorder")
  })
})
