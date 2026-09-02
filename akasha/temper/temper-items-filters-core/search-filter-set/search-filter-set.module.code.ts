import type { ItemFacts } from "@akasha/temper-items-rules-eval/item-facts"
import type {
  AnyTemperFilter,
  FilterId,
  FilterValue,
} from "../search-filter-types/search-filter-types.module.code.ts"

export type ActiveFilterValues = ReadonlyMap<FilterId, FilterValue>

export function itemPassesFilters(
  index: ReadonlyMap<FilterId, AnyTemperFilter>,
  active: ActiveFilterValues,
  facts: ItemFacts
): boolean {
  for (const [id, value] of active) {
    const filter = index.get(id)
    if (filter === undefined) continue
    if (!filter.matches(facts, value)) return false
  }
  return true
}
