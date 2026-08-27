import { describe, expect, test } from "bun:test"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import type { PropertyDefinition } from "../types"
import { generateSortOptions } from "./generate-sort-options"

function prop(
  overrides: Partial<PropertyDefinition> & Pick<PropertyDefinition, "id" | "title" | "type">
): PropertyDefinition {
  return { ...overrides }
}

describe("generateSortOptions", () => {
  test("empty properties returns only system options sorted alphabetically", () => {
    const result = generateSortOptions([])
    expect(result).toEqual([
      { value: "title", label: "Title", defaultDirection: "asc" },
    ])
  })

  test("text property has defaultDirection 'asc'", () => {
    const result = generateSortOptions([prop({ id: "name", title: "Name", type: "text" })])
    const opt = result.find((o) => o.value === "name")
    expect(opt?.defaultDirection).toBe("asc")
  })

  test("number property has defaultDirection 'desc'", () => {
    const result = generateSortOptions([prop({ id: "count", title: "Count", type: "number" })])
    const opt = result.find((o) => o.value === "count")
    expect(opt?.defaultDirection).toBe("desc")
  })

  test("calendar-date property has defaultDirection 'desc'", () => {
    const result = generateSortOptions([
      prop({ id: "dob", title: "Date of Birth", type: "calendar-date" }),
    ])
    const opt = result.find((o) => o.value === "dob")
    expect(opt?.defaultDirection).toBe("desc")
  })

  test("instant property has defaultDirection 'desc'", () => {
    const result = generateSortOptions([prop({ id: "ts", title: "Timestamp", type: "instant" })])
    const opt = result.find((o) => o.value === "ts")
    expect(opt?.defaultDirection).toBe("desc")
  })

  test("boolean property has defaultDirection 'asc'", () => {
    const result = generateSortOptions([prop({ id: "done", title: "Done", type: "boolean" })])
    expect(result.find((o) => o.value === "done")?.defaultDirection).toBe("asc")
  })

  test("url property has defaultDirection 'asc'", () => {
    const result = generateSortOptions([prop({ id: "link", title: "Link", type: "url" })])
    expect(result.find((o) => o.value === "link")?.defaultDirection).toBe("asc")
  })

  test("select property has defaultDirection 'asc'", () => {
    const result = generateSortOptions([prop({ id: "status", title: "Status", type: "select" })])
    expect(result.find((o) => o.value === "status")?.defaultDirection).toBe("asc")
  })

  test("multi-select property has defaultDirection 'asc'", () => {
    const result = generateSortOptions([prop({ id: "tags", title: "Tags", type: "multi-select" })])
    expect(result.find((o) => o.value === "tags")?.defaultDirection).toBe("asc")
  })

  test("relation property has defaultDirection 'asc'", () => {
    const result = generateSortOptions([prop({ id: "parent", title: "Parent", type: "relation" })])
    expect(result.find((o) => o.value === "parent")?.defaultDirection).toBe("asc")
  })

  test("multi-relation property has defaultDirection 'asc'", () => {
    const result = generateSortOptions([
      prop({ id: "refs", title: "References", type: "multi-relation" }),
    ])
    expect(result.find((o) => o.value === "refs")?.defaultDirection).toBe("asc")
  })

  test("markdown property has defaultDirection 'asc'", () => {
    const result = generateSortOptions([prop({ id: "notes", title: "Notes", type: "markdown" })])
    expect(result.find((o) => o.value === "notes")?.defaultDirection).toBe("asc")
  })

  test("json property has defaultDirection 'asc'", () => {
    const result = generateSortOptions([prop({ id: "data", title: "Data", type: "json" })])
    expect(result.find((o) => o.value === "data")?.defaultDirection).toBe("asc")
  })

  test("rollup property has defaultDirection 'asc'", () => {
    const result = generateSortOptions([prop({ id: "total", title: "Total", type: "rollup" })])
    expect(result.find((o) => o.value === "total")?.defaultDirection).toBe("asc")
  })

  test("aggregate property has defaultDirection 'asc'", () => {
    const result = generateSortOptions([prop({ id: "sum", title: "Sum", type: "aggregate" })])
    expect(result.find((o) => o.value === "sum")?.defaultDirection).toBe("asc")
  })

  test("formula property has defaultDirection 'asc'", () => {
    const result = generateSortOptions([prop({ id: "calc", title: "Calculated", type: "formula" })])
    expect(result.find((o) => o.value === "calc")?.defaultDirection).toBe("asc")
  })

  test("custom property with id 'title' shadows system Title option", () => {
    const result = generateSortOptions([prop({ id: "title", title: "Custom Title", type: "text" })])
    const titleOptions = result.filter((o) => o.value === "title")
    expect(titleOptions).toHaveLength(1)
    expect(requireFirst(titleOptions).label).toBe("Custom Title")
  })

  test("results are sorted alphabetically by label", () => {
    const result = generateSortOptions([
      prop({ id: "z", title: "Zebra", type: "text" }),
      prop({ id: "a", title: "Alpha", type: "text" }),
      prop({ id: "m", title: "Middle", type: "number" }),
    ])
    const labels = result.map((o) => o.label)
    expect(labels).toEqual([...labels].sort((a, b) => a.localeCompare(b)))
  })

  test("multiple properties returns correct count", () => {
    const result = generateSortOptions([
      prop({ id: "a", title: "Alpha", type: "text" }),
      prop({ id: "b", title: "Beta", type: "number" }),
      prop({ id: "c", title: "Gamma", type: "boolean" }),
    ])
    expect(result).toHaveLength(4)
  })

  test("properties with same name but different types both appear", () => {
    const result = generateSortOptions([
      prop({ id: "score-text", title: "Score", type: "text" }),
      prop({ id: "score-num", title: "Score", type: "number" }),
    ])
    const scoreOptions = result.filter((o) => o.label === "Score")
    expect(scoreOptions).toHaveLength(2)
    expect(scoreOptions.map((o) => o.defaultDirection).sort()).toEqual(["asc", "desc"])
  })
})
