import type { ComparisonOpId } from "@akasha/temper-items-rules-core/comparison-op-data"
import type { ItemFacts } from "@akasha/temper-items-rules-eval/item-facts"

export type FilterId = string

export type FilterGroup =
  | "quality"
  | "trait"
  | "type"
  | "set"
  | "level"
  | "value"
  | "location"
  | "state"
  | "knowledge"
  | "text"

export interface FilterEditorOption {
  readonly value: string
  readonly label: string
}

export type FilterEditorSpec =
  | { readonly kind: "multiselect"; readonly options: readonly FilterEditorOption[] }
  | {
      readonly kind: "range"
      readonly min: number
      readonly max: number
      readonly step?: number
      readonly ops?: readonly ComparisonOpId[]
    }
  | {
      readonly kind: "toggle"
      readonly includeLabel?: string
      readonly excludeLabel?: string
    }
  | { readonly kind: "text"; readonly placeholder?: string }

export interface FilterRangeValue {
  readonly value: number
  readonly op?: ComparisonOpId
}

export type FilterToggleValue = "include" | "exclude"

export type FilterValue = readonly string[] | FilterRangeValue | FilterToggleValue | string

export type SavedFilterValue =
  | string
  | number
  | boolean
  | null
  | readonly SavedFilterValue[]
  | { readonly [key: string]: SavedFilterValue }

export type ServerFilterField =
  | "quality"
  | "trait"
  | "item-type"
  | "equip-type"
  | "weapon-type"
  | "armor-type"

export type ServerRangeField = "price" | "level"

export interface TradingHouseSearchRequest {
  addExactTerms: (field: ServerFilterField, values: readonly number[]) => void
  setRange: (field: ServerRangeField, min: number, max: number) => void
}

export interface SearchRequestCollector extends TradingHouseSearchRequest {
  readonly terms: ReadonlyMap<ServerFilterField, readonly number[]>
  readonly ranges: ReadonlyMap<ServerRangeField, readonly [number, number]>
}

export function createSearchRequestCollector(): SearchRequestCollector {
  const termSets = new Map<ServerFilterField, number[]>()
  const seen = new Map<ServerFilterField, Set<number>>()
  const rangeMap = new Map<ServerRangeField, readonly [number, number]>()

  return {
    addExactTerms(field, values) {
      if (values.length === 0) return
      let list = termSets.get(field)
      let dedup = seen.get(field)
      if (list === undefined || dedup === undefined) {
        list = []
        dedup = new Set<number>()
        termSets.set(field, list)
        seen.set(field, dedup)
      }
      for (const value of values) {
        if (!dedup.has(value)) {
          dedup.add(value)
          list.push(value)
        }
      }
    },
    setRange(field, min, max) {
      rangeMap.set(field, [min, max])
    },
    terms: termSets,
    ranges: rangeMap,
  }
}

export interface TemperFilter<V extends FilterValue> {
  readonly id: FilterId
  readonly label: string
  readonly group: FilterGroup
  readonly editor: FilterEditorSpec

  matches: (facts: ItemFacts, value: V) => boolean

  applyToSearch?: (req: TradingHouseSearchRequest, value: V) => void

  serialize: (value: V) => SavedFilterValue

  deserialize: (raw: unknown) => V | undefined
}

export type AnyTemperFilter = TemperFilter<FilterValue>

export function defineFilter<V extends FilterValue>(filter: TemperFilter<V>): AnyTemperFilter {
  const narrow = (value: FilterValue): V | undefined => filter.deserialize(value)
  const applyToSearch = filter.applyToSearch
  return {
    id: filter.id,
    label: filter.label,
    group: filter.group,
    editor: filter.editor,
    matches: (facts, value) => {
      const narrowed = narrow(value)
      return narrowed !== undefined && filter.matches(facts, narrowed)
    },
    applyToSearch:
      applyToSearch === undefined
        ? undefined
        : (req, value) => {
            const narrowed = narrow(value)
            if (narrowed !== undefined) applyToSearch(req, narrowed)
          },
    serialize: (value) => {
      const narrowed = narrow(value)
      return narrowed === undefined ? null : filter.serialize(narrowed)
    },
    deserialize: filter.deserialize,
  }
}
