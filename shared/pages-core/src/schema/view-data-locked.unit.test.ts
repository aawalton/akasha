import { describe, expect, test } from "bun:test"
import { isLocked, isPageTypeLocked, parseViewDataJSON, stripLockedFacet } from "./view-data"
import { isFacetLocked, mergeLockedFacets } from "./view-data-locked"

describe("parseViewDataJSON round-trips the locked facet", () => {
  test("locked:{pageType:true} survives the parser", () => {
    const result = parseViewDataJSON(JSON.stringify({ version: 1, locked: { pageType: true } }))
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.locked?.pageType).toBe(true)
    }
  })

  test("a view JSON with NO locked key parses with locked undefined (back-compat)", () => {
    const result = parseViewDataJSON(JSON.stringify({ version: 1, layout: "gallery" }))
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.locked).toBeUndefined()
    }
  })

  test("locked:{} (no pageType) parses, pageType undefined", () => {
    const result = parseViewDataJSON(JSON.stringify({ version: 1, locked: {} }))
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.locked).toEqual({})
      expect(result.data.locked?.pageType).toBeUndefined()
    }
  })

  test("native object input round-trips the locked facet", () => {
    const result = parseViewDataJSON({ version: 1, locked: { pageType: true } })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.locked?.pageType).toBe(true)
    }
  })

  test("aggregate + granular keys round-trip (editPages, createPage)", () => {
    const result = parseViewDataJSON(
      JSON.stringify({ version: 1, locked: { pageType: true, editPages: true, createPage: true } })
    )
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.locked).toEqual({ pageType: true, editPages: true, createPage: true })
    }
  })

  test("non-boolean locked.pageType fails validation", () => {
    const result = parseViewDataJSON(JSON.stringify({ version: 1, locked: { pageType: "yes" } }))
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe("validation_failed")
    }
  })
})

describe("isPageTypeLocked", () => {
  test("true when locked.pageType is true", () => {
    expect(isPageTypeLocked({ version: 1, locked: { pageType: true } })).toBe(true)
  })

  test("false when the locked facet is absent (unlocked view — no regression)", () => {
    expect(isPageTypeLocked({ version: 1, layout: "gallery" })).toBe(false)
  })

  test("false when locked is present but pageType is undefined", () => {
    expect(isPageTypeLocked({ version: 1, locked: {} })).toBe(false)
  })

  test("false when locked.pageType is explicitly false", () => {
    expect(isPageTypeLocked({ version: 1, locked: { pageType: false } })).toBe(false)
  })

  test("false when the view config is undefined", () => {
    expect(isPageTypeLocked(undefined)).toBe(false)
  })
})

describe("isLocked — granular keys + aggregate expansion", () => {
  test("granular: locked.createPage true ⇒ createPage locked", () => {
    expect(isLocked({ version: 1, locked: { createPage: true } }, "createPage")).toBe(true)
  })

  test("aggregate: locked.editPages true ⇒ createPage locked (member expansion)", () => {
    expect(isLocked({ version: 1, locked: { editPages: true } }, "createPage")).toBe(true)
  })

  test("aggregate: locked.editPages true ⇒ deletePage locked (member expansion)", () => {
    expect(isLocked({ version: 1, locked: { editPages: true } }, "deletePage")).toBe(true)
  })

  test("aggregate: locked.editPages true ⇒ editProperties locked (member expansion)", () => {
    expect(isLocked({ version: 1, locked: { editPages: true } }, "editProperties")).toBe(true)
  })

  test("aggregate does NOT bleed to non-members: editPages leaves pageType unlocked", () => {
    expect(isLocked({ version: 1, locked: { editPages: true } }, "pageType")).toBe(false)
  })

  test("union: a granular key set directly is locked alongside an aggregate", () => {
    const data = { version: 1, locked: { pageType: true, editPages: true } } as const
    expect(isLocked(data, "pageType")).toBe(true)
    expect(isLocked(data, "createPage")).toBe(true)
  })

  test("granular: locked.changeLayout true ⇒ changeLayout locked", () => {
    expect(isLocked({ version: 1, locked: { changeLayout: true } }, "changeLayout")).toBe(true)
  })

  test("aggregate: locked.editView true ⇒ changeLayout locked (member expansion)", () => {
    expect(isLocked({ version: 1, locked: { editView: true } }, "changeLayout")).toBe(true)
  })

  test("aggregate does NOT bleed to non-members: editView leaves pageType unlocked", () => {
    expect(isLocked({ version: 1, locked: { editView: true } }, "pageType")).toBe(false)
  })

  test("aggregate isolation: editView does not lock editPages members (createPage)", () => {
    expect(isLocked({ version: 1, locked: { editView: true } }, "createPage")).toBe(false)
  })

  test("aggregate isolation: editPages does not lock editView members (changeLayout)", () => {
    expect(isLocked({ version: 1, locked: { editPages: true } }, "changeLayout")).toBe(false)
  })

  test("aggregate: locked.editView true ⇒ changeCoverSource locked (member expansion)", () => {
    expect(isLocked({ version: 1, locked: { editView: true } }, "changeCoverSource")).toBe(true)
  })

  test("aggregate: locked.editView true ⇒ changeCardSize locked (member expansion)", () => {
    expect(isLocked({ version: 1, locked: { editView: true } }, "changeCardSize")).toBe(true)
  })

  test("granular: locked.changeCoverSource true ⇒ changeCoverSource locked", () => {
    expect(isLocked({ version: 1, locked: { changeCoverSource: true } }, "changeCoverSource")).toBe(
      true
    )
  })

  test("aggregate: locked.editView true ⇒ changePropertyVisibility locked (member expansion)", () => {
    expect(isLocked({ version: 1, locked: { editView: true } }, "changePropertyVisibility")).toBe(
      true
    )
  })

  test("granular: locked.changePropertyVisibility true ⇒ changePropertyVisibility locked", () => {
    expect(
      isLocked(
        { version: 1, locked: { changePropertyVisibility: true } },
        "changePropertyVisibility"
      )
    ).toBe(true)
  })

  test("aggregate isolation: editPages does not lock changePropertyVisibility", () => {
    expect(isLocked({ version: 1, locked: { editPages: true } }, "changePropertyVisibility")).toBe(
      false
    )
  })

  test("aggregate isolation: editView does not lock editPages members (createPage)", () => {
    expect(isLocked({ version: 1, locked: { editView: true } }, "createPage")).toBe(false)
  })

  test("aggregate isolation: editPages does not lock changeCoverSource", () => {
    expect(isLocked({ version: 1, locked: { editPages: true } }, "changeCoverSource")).toBe(false)
  })

  test("aggregate: locked.editRows true ⇒ editRowIcon locked (member expansion)", () => {
    expect(isLocked({ version: 1, locked: { editRows: true } }, "editRowIcon")).toBe(true)
  })

  test("aggregate: locked.editRows true ⇒ editRowValues locked (member expansion)", () => {
    expect(isLocked({ version: 1, locked: { editRows: true } }, "editRowValues")).toBe(true)
  })

  test("granular: locked.editRowValues true ⇒ editRowValues locked", () => {
    expect(isLocked({ version: 1, locked: { editRowValues: true } }, "editRowValues")).toBe(true)
  })

  test("aggregate does NOT bleed to non-members: editRows leaves createPage unlocked", () => {
    expect(isLocked({ version: 1, locked: { editRows: true } }, "createPage")).toBe(false)
  })

  test("aggregate isolation: editPages does not lock editRows members (editRowValues)", () => {
    expect(isLocked({ version: 1, locked: { editPages: true } }, "editRowValues")).toBe(false)
  })

  test("absent facet ⇒ nothing locked (back-compat)", () => {
    expect(isLocked({ version: 1, layout: "gallery" }, "createPage")).toBe(false)
  })

  test("undefined config ⇒ nothing locked", () => {
    expect(isLocked(undefined, "createPage")).toBe(false)
  })
})

describe("stripLockedFacet keeps derived custom views free", () => {
  test("removes the locked facet when present", () => {
    const stripped = stripLockedFacet({ version: 1, locked: { pageType: true }, layout: "gallery" })
    expect(stripped.locked).toBeUndefined()
    expect("locked" in stripped).toBe(false)
  })

  test("preserves every other key while dropping locked", () => {
    const stripped = stripLockedFacet({
      version: 1,
      locked: { pageType: true },
      layout: "gallery",
      pageTypeId: "card-type-id",
      page_size: 12,
    })
    expect(stripped.layout).toBe("gallery")
    expect(stripped.pageTypeId).toBe("card-type-id")
    expect(stripped.page_size).toBe(12)
    expect(stripped.locked).toBeUndefined()
  })

  test("is a no-op when locked is already absent", () => {
    const input = { version: 1, layout: "gallery" } as const
    expect(stripLockedFacet(input).locked).toBeUndefined()
  })

  test("does not mutate its input", () => {
    const input = { version: 1, locked: { pageType: true } } as const
    stripLockedFacet(input)
    expect(input.locked.pageType).toBe(true)
  })
})

describe("isFacetLocked — bare-facet resolver (the shared core of isLocked)", () => {
  test("granular key set ⇒ locked", () => {
    expect(isFacetLocked({ createPage: true }, "createPage")).toBe(true)
  })

  test("aggregate expands to its members", () => {
    expect(isFacetLocked({ editPages: true }, "deletePage")).toBe(true)
  })

  test("undefined facet ⇒ nothing locked", () => {
    expect(isFacetLocked(undefined, "createPage")).toBe(false)
  })

  test("aggregate does not bleed to non-members", () => {
    expect(isFacetLocked({ editPages: true }, "pageType")).toBe(false)
  })
})

describe("mergeLockedFacets — effective lock = union(DNI parent, view), DNI-dominant", () => {
  test("both undefined ⇒ undefined (fully unlocked surface)", () => {
    expect(mergeLockedFacets(undefined, undefined)).toBeUndefined()
  })

  test("parent-only: view undefined ⇒ parent facet governs", () => {
    const merged = mergeLockedFacets({ editView: true }, undefined)
    expect(isFacetLocked(merged, "changeLayout")).toBe(true)
  })

  test("view-only: parent undefined ⇒ view facet governs", () => {
    const merged = mergeLockedFacets(undefined, { pageType: true })
    expect(isFacetLocked(merged, "pageType")).toBe(true)
  })

  test("add-only union: a DNI-locked key CANNOT be unlocked by the child view", () => {
    const merged = mergeLockedFacets({ editView: true }, { editView: false })
    expect(isFacetLocked(merged, "changeLayout")).toBe(true)
  })

  test("a view may only ADD restriction (never remove the DNI's)", () => {
    const merged = mergeLockedFacets({}, { editRows: true })
    expect(isFacetLocked(merged, "editRowValues")).toBe(true)
  })

  test("uniform union — policy propagates to all derived siblings alongside a view's own lock", () => {
    const merged = mergeLockedFacets({ editView: true }, { createPage: true })
    expect(isFacetLocked(merged, "changeLayout")).toBe(true)
    expect(isFacetLocked(merged, "createPage")).toBe(true)
  })

  test("uniform union — a DNI pageType (pin) lock composes identically to a policy lock", () => {
    const merged = mergeLockedFacets({ pageType: true }, {})
    expect(isFacetLocked(merged, "pageType")).toBe(true)
  })

  test("aggregate (parent) + granular (view) both survive the union", () => {
    const merged = mergeLockedFacets({ editPages: true }, { pageType: true })
    expect(isFacetLocked(merged, "createPage")).toBe(true)
    expect(isFacetLocked(merged, "pageType")).toBe(true)
  })

  test("does not mutate either input", () => {
    const parent = { editView: true } as const
    const view = { createPage: true } as const
    mergeLockedFacets(parent, view)
    expect(parent).toEqual({ editView: true })
    expect(view).toEqual({ createPage: true })
  })
})

describe("both-derive-path closure — a view derived from a DNI-locked surface STAYS locked", () => {
  test("create-view path: a stripped view (locked absent) still inherits the DNI lock", () => {
    const dniLocked = { editView: true } as const
    const strippedView = stripLockedFacet({
      version: 1,
      locked: { editView: true },
      layout: "cards",
    })
    const merged = mergeLockedFacets(dniLocked, strippedView.locked)
    expect(isFacetLocked(merged, "changeLayout")).toBe(true)
  })

  test("Duplicate path: a view carrying its own copied facet still inherits the DNI lock", () => {
    const dniLocked = { editPages: true } as const
    const duplicatedViewLocked = { changeCardSize: true } as const
    const merged = mergeLockedFacets(dniLocked, duplicatedViewLocked)
    expect(isFacetLocked(merged, "createPage")).toBe(true)
    expect(isFacetLocked(merged, "changeCardSize")).toBe(true)
  })
})
