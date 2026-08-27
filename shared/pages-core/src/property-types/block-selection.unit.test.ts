import { describe, expect, it } from "bun:test"
import {
  allSelection,
  extendSelection,
  focusAfterDelete,
  matchSelectionKey,
  navigateSelection,
  rangeSelection,
  selectedInOrder,
  singleSelection,
  toggleSelection,
} from "./block-selection"

const IDS = ["a", "b", "c", "d"] as const

describe("block-selection model", () => {
  it("singleSelection selects one block as anchor and focus", () => {
    const sel = singleSelection("b")
    expect(sel.anchorId).toBe("b")
    expect(sel.focusId).toBe("b")
    expect([...sel.ids]).toEqual(["b"])
  })

  it("rangeSelection spans anchor..focus inclusive, regardless of direction", () => {
    expect(selectedInOrder(rangeSelection(IDS, "b", "d"), IDS)).toEqual(["b", "c", "d"])
    expect(selectedInOrder(rangeSelection(IDS, "d", "b"), IDS)).toEqual(["b", "c", "d"])
  })

  it("navigateSelection moves a single selection to the neighbour and clamps at ends", () => {
    expect(navigateSelection(singleSelection("b"), IDS, "down").focusId).toBe("c")
    expect(navigateSelection(singleSelection("b"), IDS, "up").focusId).toBe("a")
    expect(navigateSelection(singleSelection("a"), IDS, "up").focusId).toBe("a")
    expect(navigateSelection(singleSelection("d"), IDS, "down").focusId).toBe("d")
  })

  it("extendSelection grows a contiguous range from the fixed anchor", () => {
    const start = singleSelection("b")
    const down = extendSelection(start, IDS, "down")
    expect(selectedInOrder(down, IDS)).toEqual(["b", "c"])
    expect(down.anchorId).toBe("b")
    const down2 = extendSelection(down, IDS, "down")
    expect(selectedInOrder(down2, IDS)).toEqual(["b", "c", "d"])
    const back = extendSelection(down2, IDS, "up")
    expect(selectedInOrder(back, IDS)).toEqual(["b", "c"])
  })

  it("toggleSelection adds, removes, and empties to null", () => {
    const one = toggleSelection(null, "a")
    expect(one).not.toBeNull()
    const two = toggleSelection(one, "c")
    expect(two === null ? [] : selectedInOrder(two, IDS)).toEqual(["a", "c"])
    const removed = toggleSelection(two, "a")
    expect(removed === null ? [] : selectedInOrder(removed, IDS)).toEqual(["c"])
    expect(toggleSelection(removed, "c")).toBeNull()
  })

  it("allSelection selects every block; empty doc → null", () => {
    const all = allSelection(IDS)
    expect(all === null ? [] : selectedInOrder(all, IDS)).toEqual(["a", "b", "c", "d"])
    expect(allSelection([])).toBeNull()
  })

  it("focusAfterDelete lands on the nearest surviving block before the selection", () => {
    expect(focusAfterDelete(rangeSelection(IDS, "b", "c"), IDS)).toBe("a")
  })

  it("focusAfterDelete falls forward when the selection starts at the top", () => {
    expect(focusAfterDelete(rangeSelection(IDS, "a", "b"), IDS)).toBe("c")
  })

  it("focusAfterDelete returns null when every block is selected", () => {
    const all = allSelection(IDS)
    expect(all === null ? "x" : focusAfterDelete(all, IDS)).toBeNull()
  })

  it("focusAfterDelete skips other selected blocks (discontiguous)", () => {
    const sel = toggleSelection(toggleSelection(null, "a"), "c")
    expect(sel === null ? "x" : focusAfterDelete(sel, IDS)).toBe("b")
  })
})

describe("matchSelectionKey", () => {
  const base = { code: "", key: "", meta: false, ctrl: false, shift: false, alt: false }

  it("Backspace and Delete both map to delete", () => {
    expect(matchSelectionKey({ ...base, key: "Backspace" })).toEqual({ kind: "delete" })
    expect(matchSelectionKey({ ...base, key: "Delete" })).toEqual({ kind: "delete" })
  })

  it("plain Arrow navigates; Shift+Arrow extends", () => {
    expect(matchSelectionKey({ ...base, key: "ArrowDown" })).toEqual({
      kind: "navigate",
      direction: "down",
    })
    expect(matchSelectionKey({ ...base, key: "ArrowUp", shift: true })).toEqual({
      kind: "extend",
      direction: "up",
    })
  })

  it("cmd/ctrl+Shift+Arrow moves blocks (takes precedence over extend)", () => {
    expect(matchSelectionKey({ ...base, key: "ArrowUp", meta: true, shift: true })).toEqual({
      kind: "move",
      direction: "up",
    })
    expect(matchSelectionKey({ ...base, key: "ArrowDown", ctrl: true, shift: true })).toEqual({
      kind: "move",
      direction: "down",
    })
  })

  it("cmd/ctrl+D duplicates; cmd/ctrl+A selects all", () => {
    expect(matchSelectionKey({ ...base, code: "KeyD", meta: true })).toEqual({ kind: "duplicate" })
    expect(matchSelectionKey({ ...base, code: "KeyA", ctrl: true })).toEqual({ kind: "selectAll" })
  })

  it("Enter edits; Escape clears", () => {
    expect(matchSelectionKey({ ...base, key: "Enter" })).toEqual({ kind: "edit" })
    expect(matchSelectionKey({ ...base, key: "Escape" })).toEqual({ kind: "clear" })
  })

  it("returns null for an unbound key", () => {
    expect(matchSelectionKey({ ...base, key: "x", code: "KeyX" })).toBeNull()
  })
})
