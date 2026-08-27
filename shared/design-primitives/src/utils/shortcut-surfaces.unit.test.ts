import { describe, expect, it } from "bun:test"
import type { KeyBindingDescriptor } from "./keyboard-registry"
import {
  filterDescriptorsByLabel,
  fuzzyMatchLabel,
  groupByLayerAndGroup,
  isChorded,
  LAYER_LABELS,
  LAYER_ORDER,
} from "./shortcut-surfaces"

function desc(overrides: Partial<KeyBindingDescriptor> = {}): KeyBindingDescriptor {
  return {
    id: "id",
    label: "Label",
    chord: { key: "k", mod: false, ctrl: false, meta: false, alt: false, shift: false },
    display: "K",
    ...overrides,
  }
}

describe("LAYER_ORDER / LAYER_LABELS", () => {
  it("orders the layers Reserved -> Conventional -> House", () => {
    expect(LAYER_ORDER).toEqual(["reserved", "conventional", "house"])
  })

  it("maps each layer to its display label", () => {
    expect(LAYER_LABELS.reserved).toBe("Reserved")
    expect(LAYER_LABELS.conventional).toBe("Conventional")
    expect(LAYER_LABELS.house).toBe("House")
  })
})

describe("groupByLayerAndGroup", () => {
  it("orders sections by the fixed layer order regardless of input order", () => {
    const sections = groupByLayerAndGroup([
      desc({ id: "h", layer: "house" }),
      desc({ id: "r", layer: "reserved" }),
      desc({ id: "c", layer: "conventional" }),
    ])
    expect(sections.map((s) => s.layer)).toEqual(["reserved", "conventional", "house"])
    expect(sections.map((s) => s.label)).toEqual(["Reserved", "Conventional", "House"])
  })

  it("omits layers that have no bindings", () => {
    const sections = groupByLayerAndGroup([desc({ id: "c", layer: "conventional" })])
    expect(sections).toHaveLength(1)
    expect(sections[0]?.layer).toBe("conventional")
  })

  it("buckets layer-less descriptors into a trailing 'Other' section (never dropped)", () => {
    const sections = groupByLayerAndGroup([desc({ id: "none" }), desc({ id: "h", layer: "house" })])
    expect(sections.map((s) => s.label)).toEqual(["House", "Other"])
    const other = sections.at(-1)
    expect(other?.layer).toBeNull()
    expect(other?.groups[0]?.descriptors.map((d) => d.id)).toEqual(["none"])
  })

  it("sub-groups within a layer by `group`, ungrouped in a null group, named groups in first-appearance order", () => {
    const [house] = groupByLayerAndGroup([
      desc({ id: "loose", layer: "house" }),
      desc({ id: "b1", layer: "house", group: "Blocks" }),
      desc({ id: "p1", layer: "house", group: "Panels" }),
      desc({ id: "b2", layer: "house", group: "Blocks" }),
    ])
    expect(house?.groups.map((g) => g.group)).toEqual([null, "Blocks", "Panels"])
    const blocks = house?.groups.find((g) => g.group === "Blocks")
    expect(blocks?.descriptors.map((d) => d.id)).toEqual(["b1", "b2"])
  })

  it("returns no sections for an empty descriptor list", () => {
    expect(groupByLayerAndGroup([])).toHaveLength(0)
  })
})

describe("isChorded", () => {
  it("is true for a binding carrying a real hotkey (non-empty parsed chord key)", () => {
    expect(
      isChorded(
        desc({ chord: { key: "k", mod: true, ctrl: false, meta: false, alt: false, shift: false } })
      )
    ).toBe(true)
  })

  it("is false for a chord-less palette-only binding (empty parsed chord key)", () => {
    expect(
      isChorded(
        desc({
          chord: { key: "", mod: false, ctrl: false, meta: false, alt: false, shift: false },
        })
      )
    ).toBe(false)
  })

  it("drops a wholly chord-less layer entirely when filtered before grouping (no orphan section)", () => {
    const chordless = {
      chord: { key: "", mod: false, ctrl: false, meta: false, alt: false, shift: false },
    }
    const sections = groupByLayerAndGroup(
      [
        desc({ id: "nav-home", layer: "house", group: "Navigation", ...chordless }),
        desc({ id: "nav-tasks", layer: "house", group: "Navigation", ...chordless }),
        desc({
          id: "save",
          layer: "conventional",
          chord: { key: "s", mod: true, ctrl: false, meta: false, alt: false, shift: false },
        }),
      ].filter(isChorded)
    )
    expect(sections.map((s) => s.layer)).toEqual(["conventional"])
    expect(sections.some((s) => s.layer === "house")).toBe(false)
  })
})

describe("fuzzyMatchLabel", () => {
  it("matches an empty query against anything", () => {
    expect(fuzzyMatchLabel("", "Open command palette")).toBe(true)
  })

  it("matches a case-insensitive subsequence", () => {
    expect(fuzzyMatchLabel("opl", "Open palette")).toBe(true)
    expect(fuzzyMatchLabel("PALETTE", "Open palette")).toBe(true)
  })

  it("rejects characters not present in order", () => {
    expect(fuzzyMatchLabel("zzz", "Open palette")).toBe(false)
    expect(fuzzyMatchLabel("eop", "Open palette")).toBe(false)
  })
})

describe("filterDescriptorsByLabel", () => {
  const items = [
    desc({ id: "open", label: "Open command palette" }),
    desc({ id: "save", label: "Save document" }),
  ]

  it("returns all descriptors for an empty query, preserving order", () => {
    expect(filterDescriptorsByLabel(items, "").map((d) => d.id)).toEqual(["open", "save"])
  })

  it("keeps only descriptors whose label matches", () => {
    expect(filterDescriptorsByLabel(items, "save").map((d) => d.id)).toEqual(["save"])
  })

  it("matches on label, not on id", () => {
    expect(
      filterDescriptorsByLabel([desc({ id: "open", label: "Save document" })], "open")
    ).toHaveLength(0)
  })
})
