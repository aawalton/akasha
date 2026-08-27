import { describe, expect, it } from "bun:test"
import type { AppNavItem } from "../types/nav-types"
import { selectBottomNavItems } from "./select-bottom-nav-items"

function item(id: string, extra: Partial<AppNavItem> = {}): AppNavItem {
  return { id, label: id, shortLabel: id, ...extra }
}

describe("selectBottomNavItems", () => {
  it("pins dynamic items by mobilePinOrder ascending (alanwalton case)", () => {
    const primaryItems: readonly AppNavItem[] = [
      item("home"),
      item("view-personas", { mobilePinOrder: 4 }),
      item("view-tracking", { mobilePinOrder: 1 }),
      item("view-projects", { mobilePinOrder: 3 }),
      item("view-tasks", { mobilePinOrder: 2 }),
      item("add-view-page"),
    ]
    const result = selectBottomNavItems(primaryItems, undefined, 5)
    expect(result.map((i) => i.id)).toEqual([
      "view-tracking",
      "view-tasks",
      "view-projects",
      "view-personas",
    ])
  })

  it("pins config static items in config order (temper case)", () => {
    const primaryItems: readonly AppNavItem[] = [
      item("home"),
      item("tasks"),
      item("characters"),
      item("companions"),
      item("extra"),
    ]
    const result = selectBottomNavItems(
      primaryItems,
      ["home", "tasks", "characters", "companions"],
      5
    )
    expect(result.map((i) => i.id)).toEqual(["home", "tasks", "characters", "companions"])
  })

  it("resolves config pins against children, not just top-level items", () => {
    const primaryItems: readonly AppNavItem[] = [
      item("parent", { children: [item("child-a"), item("child-b")] }),
    ]
    const result = selectBottomNavItems(primaryItems, ["child-b"], 5)
    expect(result.map((i) => i.id)).toEqual(["child-b"])
  })

  it("combines config-pinned (first) then property-pinned, deduped by id", () => {
    const primaryItems: readonly AppNavItem[] = [
      item("home"),
      item("view-a", { mobilePinOrder: 2 }),
      item("view-b", { mobilePinOrder: 1 }),
    ]
    const result = selectBottomNavItems(primaryItems, ["home"], 5)
    expect(result.map((i) => i.id)).toEqual(["home", "view-b", "view-a"])
  })

  it("does not duplicate an item that is both config- and property-pinned", () => {
    const primaryItems: readonly AppNavItem[] = [item("dup", { mobilePinOrder: 1 }), item("other")]
    const result = selectBottomNavItems(primaryItems, ["dup"], 5)
    expect(result.map((i) => i.id)).toEqual(["dup"])
  })

  it("falls back to first-N (minus a More slot) when more items than the cap and no pins", () => {
    const primaryItems: readonly AppNavItem[] = [
      item("a"),
      item("b"),
      item("c"),
      item("d"),
      item("e"),
      item("f"),
    ]
    const result = selectBottomNavItems(primaryItems, undefined, 5)
    expect(result.map((i) => i.id)).toEqual(["a", "b", "c", "d"])
  })

  it("returns all items when fewer than the cap and no pins (no overflow)", () => {
    const primaryItems: readonly AppNavItem[] = [item("a"), item("b"), item("c")]
    const result = selectBottomNavItems(primaryItems, undefined, 5)
    expect(result.map((i) => i.id)).toEqual(["a", "b", "c"])
  })

  it("reserves a trailing More slot: caps pinned items at maxVisible - 1", () => {
    const primaryItems: readonly AppNavItem[] = [
      item("v1", { mobilePinOrder: 1 }),
      item("v2", { mobilePinOrder: 2 }),
      item("v3", { mobilePinOrder: 3 }),
      item("v4", { mobilePinOrder: 4 }),
      item("v5", { mobilePinOrder: 5 }),
    ]
    const result = selectBottomNavItems(primaryItems, undefined, 5)
    expect(result.map((i) => i.id)).toEqual(["v1", "v2", "v3", "v4"])
  })

  it("falls back to first-N when config pins resolve to nothing (no silent-empty)", () => {
    const primaryItems: readonly AppNavItem[] = [item("home"), item("view-x")]
    const result = selectBottomNavItems(primaryItems, ["projects"], 5)
    expect(result.map((i) => i.id)).toEqual(["home", "view-x"])
  })
})
