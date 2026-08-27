import { expect } from "bun:test"
import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { applyFilters, type FilterableRow, testFilter } from "./apply-filters"

export function getDef(key: string): PropertyDefinition {
  const def = defs[key]
  if (def === undefined) throw new Error(`expected def for ${key}`)
  return def
}

export function row(data: Record<string, ReadonlyJSONValue>): FilterableRow {
  return data
}

export function assertParity(
  value: ReadonlyJSONValue,
  filter: { propertyId: string; operator: string; value?: ReadonlyJSONValue },
  defs: readonly PropertyDefinition[],
  expected: boolean,
  _label: string
) {
  const batchResult = applyFilters([row({ [filter.propertyId]: value })], [filter], defs)
  const singleResult = testFilter(value, filter, defs)

  expect(batchResult.length === 1).toBe(expected)
  expect(singleResult).toBe(expected)
  expect(batchResult.length === 1).toBe(singleResult)
}

export const defs: Record<string, PropertyDefinition> = {
  text: { id: "text", title: "Text", type: "text" },
  markdown: { id: "markdown", title: "Markdown", type: "markdown" },
  number: { id: "number", title: "Number", type: "number" },
  boolean: { id: "boolean", title: "Boolean", type: "boolean" },
  url: { id: "url", title: "URL", type: "url" },
  json: { id: "json", title: "JSON", type: "json" },
  "calendar-date": { id: "calendar-date", title: "Date", type: "calendar-date" },
  instant: { id: "instant", title: "Instant", type: "instant" },
  select: {
    id: "select",
    title: "Select",
    type: "select",
    config: {
      options: [
        { id: "a", label: "A" },
        { id: "b", label: "B" },
      ],
    },
  },
  "multi-select": {
    id: "multi-select",
    title: "Multi-Select",
    type: "multi-select",
    config: {
      options: [
        { id: "x", label: "X" },
        { id: "y", label: "Y" },
      ],
    },
  },
  relation: { id: "relation", title: "Relation", type: "relation" },
  "multi-relation": { id: "multi-relation", title: "Multi-Relation", type: "multi-relation" },
  rollup: { id: "rollup", title: "Rollup", type: "rollup" },
  aggregate: { id: "aggregate", title: "Aggregate", type: "aggregate" },
  formula: {
    id: "formula",
    title: "Formula",
    type: "formula",
    config: { expression: "1+1", returnType: "number" },
  },
}
