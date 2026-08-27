import type { PropertyDefinition, PropertyType } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import type { FilterableRow } from "./apply-filters"

export function asPropertyType(type: string): PropertyType {
  return type as PropertyType
}

export type SortAccessor = (item: FilterableRow) => string | number | null
export function getAccessor(accessors: Record<string, SortAccessor>, key: string): SortAccessor {
  const fn = accessors[key]
  if (fn === undefined) throw new Error(`expected accessor for ${key}`)
  return fn
}

export const UNIVERSAL_DEFS: readonly PropertyDefinition[] = [
  { id: "id", title: "ID", type: "text", config: {} },
  { id: "completedAt", title: "Completed At", type: "instant", config: {} },
  { id: "pageTypeId", title: "Page Type", type: "relation", config: {} },
  { id: "userId", title: "User", type: "text", config: {} },
  { id: "seq", title: "Seq", type: "number", config: {} },
  { id: "icon", title: "Icon", type: "text", config: {} },
  { id: "title", title: "Title", type: "text", config: {} },
] as const

export type TestRow = FilterableRow & {
  readonly _id: string
}

export function row(id: string, data: Record<string, ReadonlyJSONValue>): TestRow {
  return { ...data, _id: id }
}

export function sortBy(
  rows: readonly TestRow[],
  accessor: (r: FilterableRow) => string | number | null
): readonly TestRow[] {
  return [...rows].sort((a, b) => {
    const va = accessor(a)
    const vb = accessor(b)
    if (va === null && vb === null) return 0
    if (va === null) return 1
    if (vb === null) return -1
    if (typeof va === "number" && typeof vb === "number") return va - vb
    return String(va).localeCompare(String(vb))
  })
}

export const selectAlpha: PropertyDefinition = {
  id: "color",
  title: "Color",
  type: "select",
  sort: "alpha",
  config: {
    options: [
      { id: "r", label: "Red" },
      { id: "g", label: "Green" },
      { id: "b", label: "Blue" },
    ],
  },
}

export const selectManual: PropertyDefinition = { ...selectAlpha, sort: "manual" }

export const multiSelectAlpha: PropertyDefinition = {
  id: "tags",
  title: "Tags",
  type: "multi-select",
  sort: "alpha",
  config: {
    options: [
      { id: "p1", label: "Priority 1" },
      { id: "p2", label: "Priority 2" },
      { id: "p3", label: "Priority 3" },
    ],
  },
}

export const multiSelectManual: PropertyDefinition = { ...multiSelectAlpha, sort: "manual" }
