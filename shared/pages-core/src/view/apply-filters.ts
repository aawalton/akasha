import { propertyTypeOpsRegistry } from "../property-types/registry"
import { resolveComputedProperty } from "../property-types/resolve-computed-type"
import type { PageTypePropertiesMap } from "../property-types/rollup"
import type { FilterConfig } from "../property-types/types"
import { pageHasNonEmptyContentKey } from "../schema/content-tier"
import type { ViewFilter } from "../schema/view-data"
import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"

export type FilterableRow = Readonly<Record<string, ReadonlyJSONValue>>

function toFilterConfig(filter: ViewFilter): FilterConfig {
  return {
    operator: filter.operator,
    value: filter.value,
  }
}

export function buildFilterPredicate(
  filters: readonly ViewFilter[] | undefined,
  properties: readonly PropertyDefinition[],
  pageTypeId?: string,
  propertiesByPageType?: PageTypePropertiesMap
): (row: Readonly<Record<string, ReadonlyJSONValue>>) => boolean {
  if (!filters || filters.length === 0) return () => true

  const defsById = new Map<string, PropertyDefinition>()
  for (const p of properties) defsById.set(p.id, p)

  const hasContext = pageTypeId !== undefined && propertiesByPageType !== undefined

  const resolved: ((row: Readonly<Record<string, ReadonlyJSONValue>>) => boolean)[] = []
  for (const filter of filters) {
    const def = defsById.get(filter.propertyId)
    if (!def) continue
    if (def.storage === "content") {
      const key = filter.propertyId
      if (filter.operator === "is_not_empty") {
        resolved.push((row) => pageHasNonEmptyContentKey(row, key))
      } else if (filter.operator === "is_empty") {
        resolved.push((row) => !pageHasNonEmptyContentKey(row, key))
      }
      continue
    }
    const effective = hasContext
      ? resolveComputedProperty(def, pageTypeId, propertiesByPageType)
      : def
    const ops = propertyTypeOpsRegistry[effective.type]
    if (!ops) continue
    const valuePredicate = ops.getFilterPredicate(toFilterConfig(filter), effective)
    const propertyId = filter.propertyId
    resolved.push((row) => valuePredicate(row[propertyId] ?? null))
  }

  if (resolved.length === 0) return () => true

  return (row) => {
    for (const predicate of resolved) {
      if (!predicate(row)) return false
    }
    return true
  }
}

export function applyFilters<T extends FilterableRow>(
  items: readonly T[],
  filters: readonly ViewFilter[] | undefined,
  properties: readonly PropertyDefinition[],
  pageTypeId?: string,
  propertiesByPageType?: PageTypePropertiesMap
): readonly T[] {
  if (!filters || filters.length === 0) return items.slice()
  const predicate = buildFilterPredicate(filters, properties, pageTypeId, propertiesByPageType)
  return items.filter((item) => predicate(item))
}

export function testFilter(
  value: ReadonlyJSONValue,
  filter: ViewFilter,
  properties: readonly PropertyDefinition[],
  pageTypeId?: string,
  propertiesByPageType?: PageTypePropertiesMap
): boolean {
  const def = properties.find((p) => p.id === filter.propertyId)
  if (!def) return true
  if (def.storage === "content") return true
  const effective =
    pageTypeId !== undefined && propertiesByPageType !== undefined
      ? resolveComputedProperty(def, pageTypeId, propertiesByPageType)
      : def
  const ops = propertyTypeOpsRegistry[effective.type]
  if (!ops) return true
  const predicate = ops.getFilterPredicate(toFilterConfig(filter), effective)
  return predicate(value)
}
