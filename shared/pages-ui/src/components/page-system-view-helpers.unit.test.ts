import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "@shared/pages-core/types"
import type { ViewSort } from "@shared/pages-core/schema/view-data"
import type { ServerGroupedSection } from "./page-system-view-types"
import { sortServerGrouped } from "./page-system-view-helpers"

const statusDef: PropertyDefinition = {
  id: "status",
  title: "Status",
  type: "select",
  config: {
    options: [
      { id: "pending", label: "Pending" },
      { id: "running", label: "Running" },
      { id: "completed", label: "Completed" },
      { id: "failed", label: "Failed" },
    ],
  },
}

function section(key: string, label: string): ServerGroupedSection {
  return {
    key,
    label,
    items: [],
    canLoadMore: false,
    loadMore: () => {},
    totalCount: 0,
  }
}

describe("sortServerGrouped", () => {
  test("undefined serverGrouped returns undefined", () => {
    expect(sortServerGrouped(undefined, "status", [], [statusDef])).toBeUndefined()
  })

  test("no explicit group sort applies the property's default group sort (option order)", () => {
    const sections = [section("running", "Running"), section("pending", "Pending")]
    expect(sortServerGrouped(sections, "status", [], [statusDef])?.map((s) => s.key)).toEqual([
      "pending",
      "running",
    ])
  })

  test("group sort by 'label' orders groups alphabetically by label", () => {
    const sections = [section("running", "Running"), section("pending", "Pending")]
    const sorts: ViewSort[] = [{ field: "label", direction: "asc" }]
    expect(sortServerGrouped(sections, "status", sorts, [statusDef])?.map((s) => s.label)).toEqual([
      "Pending",
      "Running",
    ])
  })

  test("groupBy matches sort field with default (no sort field) → option order", () => {
    const sections = [
      section("completed", "Completed"),
      section("pending", "Pending"),
      section("failed", "Failed"),
      section("running", "Running"),
    ]
    const sorts: ViewSort[] = [{ field: "status", direction: "asc" }]
    const result = sortServerGrouped(sections, "status", sorts, [statusDef])
    expect(result?.map((s) => s.key)).toEqual(["pending", "running", "completed", "failed"])
  })

  test("groupBy matches sort field with explicit sort:'manual' → option order", () => {
    const manualDef: PropertyDefinition = { ...statusDef, sort: "manual" }
    const sections = [
      section("completed", "Completed"),
      section("pending", "Pending"),
      section("failed", "Failed"),
      section("running", "Running"),
    ]
    const sorts: ViewSort[] = [{ field: "status", direction: "asc" }]
    const result = sortServerGrouped(sections, "status", sorts, [manualDef])
    expect(result?.map((s) => s.key)).toEqual(["pending", "running", "completed", "failed"])
  })

  test("groupBy matches sort field with explicit sort:'alpha' → label alpha", () => {
    const alphaDef: PropertyDefinition = { ...statusDef, sort: "alpha" }
    const sections = [
      section("pending", "Pending"),
      section("running", "Running"),
      section("completed", "Completed"),
      section("failed", "Failed"),
    ]
    const sorts: ViewSort[] = [{ field: "status", direction: "asc" }]
    const result = sortServerGrouped(sections, "status", sorts, [alphaDef])
    expect(result?.map((s) => s.label)).toEqual(["Completed", "Failed", "Pending", "Running"])
  })

  test("desc direction reverses the comparison", () => {
    const sections = [section("pending", "Pending"), section("running", "Running")]
    const sorts: ViewSort[] = [{ field: "status", direction: "desc" }]
    const result = sortServerGrouped(sections, "status", sorts, [statusDef])
    expect(result?.map((s) => s.key)).toEqual(["running", "pending"])
  })

  test("__none__ group sorts first on asc direction", () => {
    const sections = [
      section("pending", "Pending"),
      section("__none__", "No Value"),
      section("completed", "Completed"),
    ]
    const sorts: ViewSort[] = [{ field: "status", direction: "asc" }]
    const result = sortServerGrouped(sections, "status", sorts, [statusDef])
    expect(result?.[0]?.key).toBe("__none__")
  })

  test("__none__ group sorts last on desc direction", () => {
    const sections = [
      section("__none__", "No Value"),
      section("pending", "Pending"),
      section("completed", "Completed"),
    ]
    const sorts: ViewSort[] = [{ field: "status", direction: "desc" }]
    const result = sortServerGrouped(sections, "status", sorts, [statusDef])
    expect(result?.[result.length - 1]?.key).toBe("__none__")
  })

  test("missing property definition falls back to label alpha", () => {
    const sections = [section("running", "Running"), section("pending", "Pending")]
    const sorts: ViewSort[] = [{ field: "status", direction: "asc" }]
    const result = sortServerGrouped(sections, "status", sorts, [])
    expect(result?.map((s) => s.label)).toEqual(["Pending", "Running"])
  })
})

describe("sortServerGrouped — number group-by orders numerically", () => {
  const levelDef: PropertyDefinition = {
    id: "level",
    title: "Level",
    type: "number",
    groupable: true,
  }
  const numSection = (n: number): ServerGroupedSection => section(String(n), String(n))

  test("repro view (levels 1-5) renders 1,2,3,4,5 under group sort field:'label'", () => {
    const sections = [numSection(3), numSection(1), numSection(5), numSection(2), numSection(4)]
    const sorts: ViewSort[] = [{ field: "label", direction: "asc" }]
    const result = sortServerGrouped(sections, "level", sorts, [levelDef])
    expect(result?.map((s) => s.key)).toEqual(["1", "2", "3", "4", "5"])
  })

  test("levels spanning >=10 render 1..12 numerically, not 1,10,11,2", () => {
    const sections = [1, 10, 11, 12, 2, 3, 4, 5, 6, 7, 8, 9].map(numSection)
    const sorts: ViewSort[] = [{ field: "label", direction: "asc" }]
    const result = sortServerGrouped(sections, "level", sorts, [levelDef])
    expect(result?.map((s) => s.key)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ])
  })

  test("no explicit group sort defaults to numeric label order for a number group-by", () => {
    const sections = [numSection(2), numSection(10), numSection(1)]
    const result = sortServerGrouped(sections, "level", [], [levelDef])
    expect(result?.map((s) => s.key)).toEqual(["1", "2", "10"])
  })

  test("desc reverses the numeric order", () => {
    const sections = [numSection(2), numSection(10), numSection(1)]
    const sorts: ViewSort[] = [{ field: "label", direction: "desc" }]
    const result = sortServerGrouped(sections, "level", sorts, [levelDef])
    expect(result?.map((s) => s.key)).toEqual(["10", "2", "1"])
  })
})
