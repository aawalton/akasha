import { describe, expect, it } from "bun:test"
import {
  applySectionDrop,
  computePickerDropZone,
  dropZoneToAnchor,
  type SectionMeasure,
  sectionsToLists,
  splitShownSections,
  type VisibilitySectionArrays,
} from "./property-visibility-picker-helpers"

const sections = (
  alwaysShow: readonly string[],
  hideWhenEmpty: readonly string[],
  alwaysHide: readonly string[]
): VisibilitySectionArrays => ({ alwaysShow, hideWhenEmpty, alwaysHide })

describe("splitShownSections", () => {
  it("puts alwaysShow ids in visibleProperties order", () => {
    const result = splitShownSections(["a", "b", "c"], ["c", "a"])
    expect(result.alwaysShow).toEqual(["a", "c"])
  })

  it("puts the non-always ids into hideWhenEmpty in visibleProperties order", () => {
    const result = splitShownSections(["a", "b", "c"], ["a"])
    expect(result.hideWhenEmpty).toEqual(["b", "c"])
  })

  it("ignores ids in alwaysShowProperties that are not in visibleProperties", () => {
    const result = splitShownSections(["a", "b"], ["a", "zzz"])
    expect(result.alwaysShow).toEqual(["a"])
    expect(result.hideWhenEmpty).toEqual(["b"])
  })

  it("empty alwaysShow → all visible ids are hide-when-empty", () => {
    const result = splitShownSections(["a", "b", "c"], [])
    expect(result.alwaysShow).toEqual([])
    expect(result.hideWhenEmpty).toEqual(["a", "b", "c"])
  })

  it("every visible id always-show → empty hideWhenEmpty", () => {
    const result = splitShownSections(["a", "b"], ["a", "b"])
    expect(result.alwaysShow).toEqual(["a", "b"])
    expect(result.hideWhenEmpty).toEqual([])
  })
})

describe("applySectionDrop", () => {
  describe("cross-section moves", () => {
    it("alwaysShow → hideWhenEmpty (append, anchor null)", () => {
      const result = applySectionDrop(sections(["a", "b"], ["c"], []), "a", "hide-when-empty", null)
      expect(result.alwaysShow).toEqual(["b"])
      expect(result.hideWhenEmpty).toEqual(["c", "a"])
      expect(result.alwaysHide).toEqual([])
    })

    it("alwaysShow → alwaysHide (append, anchor null)", () => {
      const result = applySectionDrop(sections(["a", "b"], ["c"], ["d"]), "b", "always-hide", null)
      expect(result.alwaysShow).toEqual(["a"])
      expect(result.hideWhenEmpty).toEqual(["c"])
      expect(result.alwaysHide).toEqual(["d", "b"])
    })

    it("hideWhenEmpty → alwaysShow (append, anchor null)", () => {
      const result = applySectionDrop(sections(["a"], ["b", "c"], []), "c", "always-show", null)
      expect(result.alwaysShow).toEqual(["a", "c"])
      expect(result.hideWhenEmpty).toEqual(["b"])
    })

    it("hideWhenEmpty → alwaysHide (append, anchor null)", () => {
      const result = applySectionDrop(sections(["a"], ["b", "c"], ["d"]), "b", "always-hide", null)
      expect(result.hideWhenEmpty).toEqual(["c"])
      expect(result.alwaysHide).toEqual(["d", "b"])
    })

    it("alwaysHide → alwaysShow (append, anchor null)", () => {
      const result = applySectionDrop(sections(["a"], [], ["b", "c"]), "b", "always-show", null)
      expect(result.alwaysShow).toEqual(["a", "b"])
      expect(result.alwaysHide).toEqual(["c"])
    })

    it("alwaysHide → hideWhenEmpty (append, anchor null)", () => {
      const result = applySectionDrop(sections([], ["a"], ["b", "c"]), "c", "hide-when-empty", null)
      expect(result.hideWhenEmpty).toEqual(["a", "c"])
      expect(result.alwaysHide).toEqual(["b"])
    })
  })

  describe("append semantics", () => {
    it("appends to the target end when anchorId is null", () => {
      const result = applySectionDrop(
        sections([], ["a", "b", "c"], []),
        "a",
        "hide-when-empty",
        null
      )
      expect(result.hideWhenEmpty).toEqual(["b", "c", "a"])
    })

    it("appends when anchorId is not in the target section", () => {
      const result = applySectionDrop(
        sections(["a"], ["b", "c"], []),
        "a",
        "hide-when-empty",
        "zzz"
      )
      expect(result.alwaysShow).toEqual([])
      expect(result.hideWhenEmpty).toEqual(["b", "c", "a"])
    })
  })

  describe("insert-before-anchor positioning", () => {
    it("inserts immediately before the anchor on a cross-section move", () => {
      const result = applySectionDrop(
        sections(["x"], ["a", "b", "c"], []),
        "x",
        "hide-when-empty",
        "b"
      )
      expect(result.alwaysShow).toEqual([])
      expect(result.hideWhenEmpty).toEqual(["a", "x", "b", "c"])
    })

    it("inserts before the first anchor when targeting the head", () => {
      const result = applySectionDrop(sections([], ["a", "b"], ["z"]), "z", "hide-when-empty", "a")
      expect(result.hideWhenEmpty).toEqual(["z", "a", "b"])
      expect(result.alwaysHide).toEqual([])
    })
  })

  describe("intra-section reorder", () => {
    it("moves an id earlier within its own section (before a preceding anchor)", () => {
      const result = applySectionDrop(
        sections([], ["a", "b", "c", "d"], []),
        "d",
        "hide-when-empty",
        "b"
      )
      expect(result.hideWhenEmpty).toEqual(["a", "d", "b", "c"])
    })

    it("moves an id later within its own section (before a following anchor)", () => {
      const result = applySectionDrop(
        sections([], ["a", "b", "c", "d"], []),
        "a",
        "hide-when-empty",
        "c"
      )
      expect(result.hideWhenEmpty).toEqual(["b", "a", "c", "d"])
    })

    it("anchorId === id appends (after removal the anchor is gone)", () => {
      const result = applySectionDrop(
        sections([], ["a", "b", "c"], []),
        "b",
        "hide-when-empty",
        "b"
      )
      expect(result.hideWhenEmpty).toEqual(["a", "c", "b"])
    })

    it("intra-section reorder with anchor === id keeps every other id", () => {
      const result = applySectionDrop(sections(["a", "b", "c"], [], []), "a", "always-show", "a")
      expect(result.alwaysShow).toContain("a")
      expect(result.alwaysShow).toContain("b")
      expect(result.alwaysShow).toContain("c")
      expect(result.alwaysShow.length).toBe(3)
    })
  })

  describe("removal from source", () => {
    it("removes the id from its source section on a cross-section move", () => {
      const result = applySectionDrop(sections(["a", "b"], [], ["c"]), "a", "always-hide", null)
      expect(result.alwaysShow).not.toContain("a")
      expect(result.alwaysHide).toContain("a")
    })

    it("never duplicates the id when the source already overlaps semantics", () => {
      const result = applySectionDrop(sections(["a"], ["b"], ["c"]), "a", "hide-when-empty", null)
      const all = [...result.alwaysShow, ...result.hideWhenEmpty, ...result.alwaysHide]
      expect(all.filter((x) => x === "a").length).toBe(1)
    })
  })

  describe("untouched sections", () => {
    it("leaves the two non-source, non-target sections unchanged", () => {
      const result = applySectionDrop(
        sections(["a"], ["b", "c"], ["d", "e"]),
        "b",
        "always-show",
        null
      )
      expect(result.alwaysHide).toEqual(["d", "e"])
    })

    it("leaves both other sections unchanged on an intra-section reorder", () => {
      const result = applySectionDrop(
        sections(["a"], ["b", "c", "d"], ["e"]),
        "d",
        "hide-when-empty",
        "b"
      )
      expect(result.alwaysShow).toEqual(["a"])
      expect(result.alwaysHide).toEqual(["e"])
    })
  })
})

const mkRow = (id: string, top: number, height: number) => ({ id, top, height })
const measures: readonly SectionMeasure[] = [
  {
    mode: "always-show",
    top: 0,
    height: 60,
    rows: [mkRow("a", 0, 20), mkRow("b", 20, 20), mkRow("c", 40, 20)],
  },
  { mode: "hide-when-empty", top: 60, height: 20, rows: [mkRow("d", 60, 20)] },
  { mode: "always-hide", top: 80, height: 20, rows: [] },
]

describe("computePickerDropZone", () => {
  it("returns null when there are no sections", () => {
    expect(computePickerDropZone([], 10, "z")).toBeNull()
  })

  it("top half of a row → before that row", () => {
    expect(computePickerDropZone(measures, 5, "z")).toEqual({
      mode: "always-show",
      rowId: "a",
      position: "before",
    })
  })

  it("bottom half of a row → after that row", () => {
    expect(computePickerDropZone(measures, 15, "z")).toEqual({
      mode: "always-show",
      rowId: "a",
      position: "after",
    })
  })

  it("resolves the row in the section the pointer Y sits in", () => {
    expect(computePickerDropZone(measures, 65, "z")).toEqual({
      mode: "hide-when-empty",
      rowId: "d",
      position: "before",
    })
  })

  it("an empty section is an append target (rowId null)", () => {
    expect(computePickerDropZone(measures, 90, "z")).toEqual({
      mode: "always-hide",
      rowId: null,
    })
  })

  it("clamps to the first section when the pointer is above everything", () => {
    expect(computePickerDropZone(measures, -10, "z")).toEqual({
      mode: "always-show",
      rowId: "a",
      position: "before",
    })
  })

  it("clamps to the last section when the pointer is below everything", () => {
    expect(computePickerDropZone(measures, 999, "z")).toEqual({
      mode: "always-hide",
      rowId: null,
    })
  })

  it("excludes the dragged row, choosing the nearest remaining row", () => {
    expect(computePickerDropZone(measures, 5, "a")).toEqual({
      mode: "always-show",
      rowId: "b",
      position: "before",
    })
  })

  it("a section whose only row is the dragged row → append zone", () => {
    expect(computePickerDropZone(measures, 70, "d")).toEqual({
      mode: "hide-when-empty",
      rowId: null,
    })
  })
})

describe("dropZoneToAnchor", () => {
  const sections = (): VisibilitySectionArrays => ({
    alwaysShow: ["a", "b", "c"],
    hideWhenEmpty: ["d"],
    alwaysHide: [],
  })

  it("before X anchors on X", () => {
    expect(
      dropZoneToAnchor({ mode: "always-show", rowId: "a", position: "before" }, sections(), "z")
    ).toEqual({ targetMode: "always-show", anchorId: "a" })
  })

  it("after X anchors on the next row in the section", () => {
    expect(
      dropZoneToAnchor({ mode: "always-show", rowId: "a", position: "after" }, sections(), "z")
    ).toEqual({ targetMode: "always-show", anchorId: "b" })
  })

  it("after the last row appends (anchor null)", () => {
    expect(
      dropZoneToAnchor({ mode: "always-show", rowId: "c", position: "after" }, sections(), "z")
    ).toEqual({ targetMode: "always-show", anchorId: null })
  })

  it("after X skips the dragged id when computing the next anchor", () => {
    expect(
      dropZoneToAnchor({ mode: "always-show", rowId: "a", position: "after" }, sections(), "b")
    ).toEqual({ targetMode: "always-show", anchorId: "c" })
  })

  it("an append zone (rowId null) anchors null", () => {
    expect(dropZoneToAnchor({ mode: "always-hide", rowId: null }, sections(), "z")).toEqual({
      targetMode: "always-hide",
      anchorId: null,
    })
  })

  it("composes with applySectionDrop: after a row lands the id immediately after it", () => {
    const zone = { mode: "hide-when-empty", rowId: "d", position: "after" } as const
    const { targetMode, anchorId } = dropZoneToAnchor(zone, sections(), "a")
    const next = applySectionDrop(sections(), "a", targetMode, anchorId)
    expect(next.hideWhenEmpty).toEqual(["d", "a"])
  })
})

describe("sectionsToLists", () => {
  it("visibleProperties is alwaysShow followed by hideWhenEmpty (prefix invariant)", () => {
    const result = sectionsToLists(sections(["status"], ["name", "priority"], ["notes"]))
    expect(result.visibleProperties).toEqual(["status", "name", "priority"])
    expect(result.alwaysShowProperties).toEqual(["status"])
  })

  it("maps alwaysHide onto hiddenPropertiesOrder", () => {
    const result = sectionsToLists(sections(["a"], ["b"], ["c", "d"]))
    expect(result.hiddenPropertiesOrder).toEqual(["c", "d"])
  })

  it("empty alwaysShow → visibleProperties equals hideWhenEmpty", () => {
    const result = sectionsToLists(sections([], ["a", "b"], []))
    expect(result.visibleProperties).toEqual(["a", "b"])
    expect(result.alwaysShowProperties).toEqual([])
  })

  it("round-trips an applySectionDrop result through sectionsToLists and splitShownSections", () => {
    const moved = applySectionDrop(sections(["b", "d"], ["a", "c"], []), "c", "always-show", "d")
    const lists = sectionsToLists(moved)
    const reSplit = splitShownSections(lists.visibleProperties, lists.alwaysShowProperties)
    expect(reSplit.alwaysShow).toEqual([...moved.alwaysShow])
    expect(reSplit.hideWhenEmpty).toEqual([...moved.hideWhenEmpty])
  })
})
