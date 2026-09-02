import type { FilterToggleValue } from "../search-filter-types/search-filter-types.module.code.ts"

export function parseToggle(raw: unknown): FilterToggleValue | undefined {
  return raw === "include" || raw === "exclude" ? raw : undefined
}
