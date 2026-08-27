import { resolveComputedProperties } from "../formula/resolve"
import type { PageTypePropertiesMap } from "../property-types/rollup"
import type { ViewConfig } from "../schema/view-data"
import type { PropertyDefinition } from "../types"
import type { FilterableRow } from "./apply-filters"
import { applyFilters } from "./apply-filters"
import type { PageResolver } from "./apply-grouping-shared"
import { applySorts } from "./apply-sorts"
import { generateSortAccessors } from "./sort-accessors"

export function applyView<T extends FilterableRow>(
  items: readonly T[],
  properties: readonly PropertyDefinition[],
  config: ViewConfig,
  pageTypeId?: string,
  propertiesByPageType?: PageTypePropertiesMap,
  resolver?: PageResolver | null
): readonly T[] {
  let result: readonly T[] = items.map((row) => ({
    ...row,
    ...resolveComputedProperties(row, properties),
  }))

  if (config.filters && config.filters.length > 0) {
    result = applyFilters(result, config.filters, properties, pageTypeId, propertiesByPageType)
  }

  if (config.sorts && config.sorts.length > 0) {
    const accessors = generateSortAccessors(properties, pageTypeId, propertiesByPageType, resolver)
    result = applySorts(result, config.sorts, accessors)
  }

  return result
}
