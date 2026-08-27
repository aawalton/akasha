import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { generateGroupOptions, getPageGroupDefinition } from "./apply-grouping"
import { generateGroupSortOptions, getDefaultGroupSorts, makeGroupKeyByPropertyComparator } from "./apply-grouping-sort"

const booleanDef: PropertyDefinition = { id: "done", title: "Done", type: "boolean" }
const selectDef: PropertyDefinition = {
  id: "status",
  title: "Status",
  type: "select",
  config: {
    options: [
      { id: "open", label: "Open" },
      { id: "closed", label: "Closed" },
      { id: "pending", label: "Pending" },
    ],
  },
}
const multiSelectDef: PropertyDefinition = {
  id: "tags",
  title: "Tags",
  type: "multi-select",
  config: {
    options: [
      { id: "bug", label: "Bug" },
      { id: "feature", label: "Feature" },
      { id: "docs", label: "Docs" },
    ],
  },
}
const relationDef: PropertyDefinition = { id: "parent", title: "Parent", type: "relation" }
const multiRelationDef: PropertyDefinition = {
  id: "related",
  title: "Related",
  type: "multi-relation",
}
const dateDef: PropertyDefinition = { id: "due", title: "Due", type: "calendar-date" }
const instantDef: PropertyDefinition = { id: "created", title: "Created", type: "instant" }
const textDef: PropertyDefinition = { id: "title", title: "Title", type: "text" }
const numberDef: PropertyDefinition = { id: "priority", title: "Priority", type: "number" }
const urlDef: PropertyDefinition = { id: "link", title: "Link", type: "url" }
const markdownDef: PropertyDefinition = { id: "body", title: "Body", type: "markdown" }
const jsonDef: PropertyDefinition = { id: "meta", title: "Meta", type: "json" }

const allProps: PropertyDefinition[] = [
  booleanDef,
  selectDef,
  multiSelectDef,
  relationDef,
  multiRelationDef,
  dateDef,
  instantDef,
  textDef,
  numberDef,
  urlDef,
  markdownDef,
  jsonDef,
]

describe("generateGroupOptions", () => {
  test("excludes continuous / free-text / opaque types by the per-type default", () => {
    const opts = generateGroupOptions(allProps)
    const values = opts.map((o) => o.value)
    expect(values).not.toContain("title")
    expect(values).not.toContain("priority")
    expect(values).not.toContain("link")
    expect(values).not.toContain("body")
    expect(values).not.toContain("meta")
  })

  test("includes enumerable / low-cardinality / granularity-bucketed types by default", () => {
    const opts = generateGroupOptions(allProps)
    const values = opts.map((o) => o.value)
    expect(values).toContain("done")
    expect(values).toContain("status")
    expect(values).toContain("tags")
    expect(values).toContain("parent")
    expect(values).toContain("related")
    expect(values).toContain("due")
    expect(values).toContain("created")
  })

  test("sorts by label alphabetically", () => {
    const opts = generateGroupOptions(allProps)
    const labels = opts.map((o) => o.label)
    const sorted = [...labels].sort((a, b) => a.localeCompare(b))
    expect(labels).toEqual(sorted)
  })

  test("returns empty for empty properties", () => {
    expect(generateGroupOptions([])).toEqual([])
  })

  test("returns empty when all types are non-groupable", () => {
    expect(generateGroupOptions([markdownDef, jsonDef, textDef, numberDef, urlDef])).toEqual([])
  })
})

describe("per-property groupable override", () => {
  test("groupable:true opts a type-non-groupable number IN", () => {
    const optedIn: PropertyDefinition = { ...numberDef, groupable: true }
    const values = generateGroupOptions([optedIn]).map((o) => o.value)
    expect(values).toContain("priority")
  })

  test("groupable:false opts a type-groupable select OUT", () => {
    const optedOut: PropertyDefinition = { ...selectDef, groupable: false }
    const values = generateGroupOptions([optedOut]).map((o) => o.value)
    expect(values).not.toContain("status")
  })

  test("absent flag inherits the per-type default (number excluded, select included)", () => {
    expect(generateGroupOptions([numberDef]).map((o) => o.value)).not.toContain("priority")
    expect(generateGroupOptions([selectDef]).map((o) => o.value)).toContain("status")
  })

  test("getPageGroupDefinition honors the override bidirectionally", () => {
    const optedInNumber: PropertyDefinition = { ...numberDef, groupable: true }
    const optedOutSelect: PropertyDefinition = { ...selectDef, groupable: false }
    expect(getPageGroupDefinition("priority", [numberDef])).toBeNull()
    expect(getPageGroupDefinition("status", [selectDef])).not.toBeNull()
    expect(getPageGroupDefinition("priority", [optedInNumber])).not.toBeNull()
    expect(getPageGroupDefinition("status", [optedOutSelect])).toBeNull()
  })

  test("group-sort helpers honor the override", () => {
    const optedInNumber: PropertyDefinition = { ...numberDef, groupable: true }
    const optedOutSelect: PropertyDefinition = { ...selectDef, groupable: false }
    expect(generateGroupSortOptions("priority", [optedInNumber]).length).toBeGreaterThan(0)
    expect(getDefaultGroupSorts("priority", [optedInNumber]).length).toBeGreaterThan(0)
    expect(generateGroupSortOptions("status", [optedOutSelect])).toEqual([])
    expect(getDefaultGroupSorts("status", [optedOutSelect])).toEqual([])
  })
})

describe("generateGroupSortOptions", () => {
  test("select includes property name + label + count", () => {
    const opts = generateGroupSortOptions("status", [selectDef])
    expect(opts).toHaveLength(3)
    expect(opts[0]).toEqual({ value: "status", label: "Status", defaultDirection: "asc" })
    expect(opts[1]).toEqual({ value: "label", label: "Label", defaultDirection: "asc" })
    expect(opts[2]).toEqual({ value: "count", label: "Count", defaultDirection: "desc" })
  })

  test("multi-select includes property name + label + count", () => {
    const opts = generateGroupSortOptions("tags", [multiSelectDef])
    expect(opts).toHaveLength(3)
    expect(opts[0]).toEqual({ value: "tags", label: "Tags", defaultDirection: "asc" })
  })

  test("non-select type includes only label + count", () => {
    const opts = generateGroupSortOptions("done", [booleanDef])
    expect(opts).toHaveLength(2)
    expect(opts[0]).toEqual({ value: "label", label: "Label", defaultDirection: "asc" })
    expect(opts[1]).toEqual({ value: "count", label: "Count", defaultDirection: "desc" })
  })

  test("non-groupable type returns empty", () => {
    expect(generateGroupSortOptions("body", [markdownDef])).toEqual([])
  })

  test("unknown property returns empty", () => {
    expect(generateGroupSortOptions("nonexistent", allProps)).toEqual([])
  })
})

describe("getDefaultGroupSorts", () => {
  test("select defaults to sorting by groupBy field asc", () => {
    expect(getDefaultGroupSorts("status", [selectDef])).toEqual([
      { field: "status", direction: "asc" },
    ])
  })

  test("multi-select defaults to sorting by groupBy field asc", () => {
    expect(getDefaultGroupSorts("tags", [multiSelectDef])).toEqual([
      { field: "tags", direction: "asc" },
    ])
  })

  test("other types default to label asc", () => {
    expect(getDefaultGroupSorts("done", [booleanDef])).toEqual([
      { field: "label", direction: "asc" },
    ])
  })

  test("non-groupable type returns empty", () => {
    expect(getDefaultGroupSorts("body", [markdownDef])).toEqual([])
  })

  test("unknown property returns empty", () => {
    expect(getDefaultGroupSorts("nonexistent", allProps)).toEqual([])
  })
})

describe("makeGroupKeyByPropertyComparator", () => {
  test("select with no sort field compares by option index (default)", () => {
    const cmp = makeGroupKeyByPropertyComparator(selectDef)
    expect(cmp("open", "Open", "closed", "Closed")).toBeLessThan(0)
    expect(cmp("closed", "Closed", "pending", "Pending")).toBeLessThan(0)
    expect(cmp("pending", "Pending", "open", "Open")).toBeGreaterThan(0)
  })

  test("select with explicit sort:'manual' compares by option index", () => {
    const cmp = makeGroupKeyByPropertyComparator({ ...selectDef, sort: "manual" })
    expect(cmp("open", "Open", "closed", "Closed")).toBeLessThan(0)
  })

  test("select with explicit sort:'alpha' compares by label", () => {
    const cmp = makeGroupKeyByPropertyComparator({ ...selectDef, sort: "alpha" })
    expect(cmp("open", "Open", "closed", "Closed")).toBeGreaterThan(0)
    expect(cmp("closed", "Closed", "pending", "Pending")).toBeLessThan(0)
  })

  test("multi-select with default sort uses option index", () => {
    const cmp = makeGroupKeyByPropertyComparator(multiSelectDef)
    expect(cmp("bug", "Bug", "feature", "Feature")).toBeLessThan(0)
    expect(cmp("docs", "Docs", "bug", "Bug")).toBeGreaterThan(0)
  })

  test("orphan keys (not in options) sort last and tie-break by label", () => {
    const cmp = makeGroupKeyByPropertyComparator(selectDef)
    expect(cmp("orphanA", "Aaa", "open", "Open")).toBeGreaterThan(0)
    expect(cmp("open", "Open", "orphanA", "Aaa")).toBeLessThan(0)
    expect(cmp("orphanA", "Aaa", "orphanB", "Bbb")).toBeLessThan(0)
  })

  test("non-select property type compares by label", () => {
    const cmp = makeGroupKeyByPropertyComparator(booleanDef)
    expect(cmp("false", "Unchecked", "true", "Checked")).toBeGreaterThan(0)
    expect(cmp("true", "Checked", "false", "Unchecked")).toBeLessThan(0)
  })

  test("undefined property compares by label", () => {
    const cmp = makeGroupKeyByPropertyComparator(undefined)
    expect(cmp("x", "Alpha", "y", "Beta")).toBeLessThan(0)
    expect(cmp("x", "Beta", "y", "Alpha")).toBeGreaterThan(0)
  })
})
