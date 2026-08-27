import { describe, expect, it } from "bun:test"
import type { PropertyDefinition, PropertyType } from "@shared/pages-core/types"
import {
  isCardEligibleProperty,
  orderTableColumns,
  RESERVED_PROPERTY_IDS,
  selectVisibleCardProperties,
} from "./page-properties-shared"
import { TITLE_COLUMN_ID } from "./page-table-shared"

const ALL_TYPES: readonly PropertyType[] = [
  "text",
  "markdown",
  "number",
  "select",
  "multi-select",
  "path-select",
  "url",
  "relation",
  "multi-relation",
  "rollup",
  "aggregate",
  "formula",
  "instant",
  "calendar-date",
  "calendar-time",
  "boolean",
  "json",
  "rrule",
  "progress",
  "rich-document",
  "action-button",
]

const def = (id: string, type: PropertyType, title = id): PropertyDefinition => ({
  id,
  title,
  type,
  config: {},
})

describe("isCardEligibleProperty", () => {
  it("returns false for every id in RESERVED_PROPERTY_IDS regardless of type", () => {
    for (const reservedId of RESERVED_PROPERTY_IDS) {
      for (const type of ALL_TYPES) {
        expect(isCardEligibleProperty(def(reservedId, type))).toBe(false)
      }
    }
  })

  it("returns true for every property type when the id is non-reserved", () => {
    for (const type of ALL_TYPES) {
      expect(isCardEligibleProperty(def("foo", type))).toBe(true)
    }
  })

  it("returns true for representative non-reserved properties", () => {
    expect(isCardEligibleProperty(def("foo", "text"))).toBe(true)
    expect(isCardEligibleProperty(def("status", "select"))).toBe(true)
    expect(isCardEligibleProperty(def("project", "relation"))).toBe(true)
    expect(isCardEligibleProperty(def("body", "markdown"))).toBe(true)
    expect(isCardEligibleProperty(def("payload", "json"))).toBe(true)
    expect(isCardEligibleProperty(def("done", "boolean"))).toBe(true)
  })

  it("treats the timestamp universals createdAt/updatedAt/startedAt as card-eligible", () => {
    expect(isCardEligibleProperty(def("createdAt", "instant"))).toBe(true)
    expect(isCardEligibleProperty(def("updatedAt", "instant"))).toBe(true)
    expect(isCardEligibleProperty(def("startedAt", "instant"))).toBe(true)
  })

  it("keeps the non-user-facing universals reserved", () => {
    for (const id of ["title", "icon", "content", "id", "userId"]) {
      expect(isCardEligibleProperty(def(id, "instant"))).toBe(false)
    }
  })
})

describe("selectVisibleCardProperties", () => {
  it("returns [] when visibleIds is empty even if all defs are eligible", () => {
    const defs = [def("foo", "text"), def("bar", "select"), def("baz", "relation")]
    expect(selectVisibleCardProperties(defs, [])).toEqual([])
  })

  it("filters reserved ids and emits the rest, regardless of type", () => {
    const bodyDef = def("body", "markdown")
    const doneDef = def("done", "boolean")
    const defs = [def("title", "text"), bodyDef, doneDef]
    expect(selectVisibleCardProperties(defs, ["title", "body", "done"])).toEqual([bodyDef, doneDef])
  })

  it("returns the eligible-and-listed defs in visibleIds order, not defs order", () => {
    const fooDef = def("foo", "text")
    const barDef = def("bar", "select")
    const bazDef = def("baz", "relation")
    const defs = [fooDef, barDef, bazDef]
    const result = selectVisibleCardProperties(defs, ["bar", "foo"])
    expect(result).toEqual([barDef, fooDef])
  })

  it("does not duplicate output when visibleIds contains duplicates", () => {
    const fooDef = def("foo", "text")
    const defs = [fooDef, def("bar", "select")]
    const result = selectVisibleCardProperties(defs, ["foo", "foo", "foo"])
    expect(result).toEqual([fooDef])
  })

  it("silently ignores ids in visibleIds that are not present in defs", () => {
    const fooDef = def("foo", "text")
    const defs = [fooDef]
    const result = selectVisibleCardProperties(defs, ["foo", "ghost", "missing"])
    expect(result).toEqual([fooDef])
  })
})

describe("orderTableColumns", () => {
  const fooDef = def("foo", "text")
  const barDef = def("bar", "select")
  const defs = [fooDef, barDef]

  it("prepends the title column when the sentinel is absent (back-compat default)", () => {
    expect(orderTableColumns(defs, ["foo", "bar"])).toEqual([
      { id: TITLE_COLUMN_ID, isTitle: true },
      { id: "foo", isTitle: false, def: fooDef },
      { id: "bar", isTitle: false, def: barDef },
    ])
  })

  it("places the title column at its sentinel position", () => {
    expect(orderTableColumns(defs, ["foo", TITLE_COLUMN_ID, "bar"])).toEqual([
      { id: "foo", isTitle: false, def: fooDef },
      { id: TITLE_COLUMN_ID, isTitle: true },
      { id: "bar", isTitle: false, def: barDef },
    ])
  })

  it("allows the title column to render last", () => {
    expect(orderTableColumns(defs, ["foo", "bar", TITLE_COLUMN_ID])).toEqual([
      { id: "foo", isTitle: false, def: fooDef },
      { id: "bar", isTitle: false, def: barDef },
      { id: TITLE_COLUMN_ID, isTitle: true },
    ])
  })

  it("returns just the title column when there are no visible properties", () => {
    expect(orderTableColumns(defs, [])).toEqual([{ id: TITLE_COLUMN_ID, isTitle: true }])
  })

  it("excludes reserved/missing property ids and dedupes, keeping the title default-first", () => {
    expect(orderTableColumns(defs, ["title", "foo", "foo", "ghost"])).toEqual([
      { id: TITLE_COLUMN_ID, isTitle: true },
      { id: "foo", isTitle: false, def: fooDef },
    ])
  })

  it("does not duplicate the title column when the sentinel appears twice", () => {
    expect(orderTableColumns(defs, [TITLE_COLUMN_ID, "foo", TITLE_COLUMN_ID])).toEqual([
      { id: TITLE_COLUMN_ID, isTitle: true },
      { id: "foo", isTitle: false, def: fooDef },
    ])
  })
})
