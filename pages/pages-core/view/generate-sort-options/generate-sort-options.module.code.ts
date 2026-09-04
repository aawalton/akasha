import type { PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import type { SortDirection } from "../apply-grouping-shared/apply-grouping-shared.module.code.ts"

export interface SortOption {
  value: string
  label: string
  defaultDirection?: SortDirection
}

const DESCENDING_TYPES = new Set(["number", "calendar-date", "instant"])

const SYSTEM_SORT_OPTIONS: SortOption[] = [
  { value: "title", label: "Title", defaultDirection: "asc" },
]

export function generateSortOptions(
  properties: readonly PropertyDefinition[]
): readonly SortOption[] {
  const customIds = new Set(properties.map((p) => p.id))
  const system = SYSTEM_SORT_OPTIONS.filter((o) => !customIds.has(o.value))
  const custom = properties.map((prop) => ({
    value: prop.id,
    label: prop.title,
    defaultDirection: DESCENDING_TYPES.has(prop.type) ? ("desc" as const) : ("asc" as const),
  }))
  return [...system, ...custom].sort((a, b) => a.label.localeCompare(b.label))
}
