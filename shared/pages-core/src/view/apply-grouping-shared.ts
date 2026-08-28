import type { PropertyDefinition, PropertyType } from "../types"
import type { FilterableRow } from "./apply-filters"

export type SortDirection = "asc" | "desc"

export interface SelectOption {
  readonly id: string
  readonly label: string
}

export interface PageResolver {
  resolve: (
    id: string
  ) => { id: string; title: string; sortOrder?: number } | null
}

export type GroupableRow = FilterableRow & {
  readonly _id: string
}

export interface GroupOption {
  value: string
  label: string
}

export interface GroupSortOption {
  value: string
  label: string
  defaultDirection?: SortDirection
}

export interface PageGroupDefinition {
  getKey: (item: GroupableRow) => string
  getKeys?: (item: GroupableRow) => readonly string[]
  getLabel: (key: string) => string
}

export interface GroupedResult {
  key: string
  label: string
  items: readonly GroupableRow[]
}

const GROUPABLE_BY_TYPE = {
  select: true,
  "multi-select": true,
  "path-select": true,
  boolean: true,
  relation: true,
  "multi-relation": true,
  "calendar-date": true,
  "calendar-time": true,
  instant: true,
  text: false,
  markdown: false,
  number: false,
  url: false,
  rollup: false,
  aggregate: false,
  formula: false,
  json: false,
  rrule: false,
  progress: false,
  "rich-document": false,
  "action-button": false,
} as const satisfies Record<PropertyType, boolean>

export function compareGroupLabels(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true })
}

/**
 * The key every empty group is filed under, on the browser keying path and the server
 * bucketing path alike.
 *
 * ONE SPELLING, BECAUSE ONE CONCEPT. The server bucketing path spelt this `""` and the browser
 * keying path spelt it `__none__`, each consistent within itself, so nobody met both names at
 * once. Every comparison downstream met both: a `""` key fell through a `__none__`-only
 * ordering pin into alphabetical order (#14205), and through the `__none__`-only test in
 * `groupKeyToPropertyValue`, so a card dropped into the No Value column of a board wrote an
 * empty string onto the property where it meant to clear it. An `isEmptyGroupKey` taking both
 * spellings stood here and covered the ordering pin alone — a seam every later comparison had
 * to be told about. The seam is removed rather than held.
 */
export const GROUP_NONE_KEY = "__none__"

export function effectiveGroupable(prop: PropertyDefinition): boolean {
  return prop.groupable ?? GROUPABLE_BY_TYPE[prop.type]
}

function isSelectOption(value: unknown): value is SelectOption {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false
  if (!("id" in value) || typeof value.id !== "string") return false
  if (!("label" in value) || typeof value.label !== "string") return false
  return true
}

export function getOptions(prop: PropertyDefinition): readonly SelectOption[] {
  const raw = prop.config?.options
  if (!Array.isArray(raw)) return []
  return raw.filter(isSelectOption)
}
