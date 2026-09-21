import type {
  PageTypePropertiesMap,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { FilterConfig } from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import { PROPERTY_TYPE_OPS_REGISTRY } from "akasha/page/core/property-type/modules/registry/registry.module.code.ts"
import { resolveComputedProperty } from "akasha/page/core/property-type/modules/resolve-computed-type/resolve-computed-type.module.code.ts"
import { pageHasNonEmptyContentKey } from "akasha/page/core/schema/modules/content-tier/content-tier.module.code.ts"
import type { ReadonlyJSONValue } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import type { ViewFilter } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"

export type FilterableRow = Readonly<Record<string, ReadonlyJSONValue>>

function toFilterConfig(filter: ViewFilter): FilterConfig {
  return {
    operator: filter.operator,
    value: filter.value,
  }
}

function buildFilterPredicate(
  filters: readonly ViewFilter[] | undefined,
  properties: readonly PropertyDefinition[],
  propertiesByPageType?: PageTypePropertiesMap
): (row: Readonly<Record<string, ReadonlyJSONValue>>) => boolean {
  if (!filters || filters.length === 0) return () => true

  const defsById = new Map<string, PropertyDefinition>()
  for (const p of properties) defsById.set(p.id, p)

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
    const effective =
      propertiesByPageType !== undefined ? resolveComputedProperty(def, propertiesByPageType) : def
    const ops = PROPERTY_TYPE_OPS_REGISTRY[effective.type]
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
  propertiesByPageType?: PageTypePropertiesMap
): readonly T[] {
  if (!filters || filters.length === 0) return items.slice()
  const predicate = buildFilterPredicate(filters, properties, propertiesByPageType)
  return items.filter((item) => predicate(item))
}
