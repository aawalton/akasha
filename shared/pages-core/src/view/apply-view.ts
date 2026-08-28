import type { PageTypePropertiesMap } from "../property-types/rollup.ts"
import type { ViewConfig } from "../schema/view-data.ts"
import type { PropertyDefinition } from "../types.ts"
import type { FilterableRow } from "./apply-filters.ts"
import { applyFilters } from "./apply-filters.ts"
import type { PageResolver } from "./apply-grouping-shared.ts"
import { applySorts } from "./apply-sorts.ts"
import { generateSortAccessors } from "./sort-accessors.ts"

export function applyView<T extends FilterableRow>(
  items: readonly T[],
  properties: readonly PropertyDefinition[],
  config: ViewConfig,
  pageTypeId?: string,
  propertiesByPageType?: PageTypePropertiesMap,
  resolver?: PageResolver | null
): readonly T[] {
  let result: readonly T[] = items

  if (config.filters && config.filters.length > 0) {
    result = applyFilters(result, config.filters, properties, pageTypeId, propertiesByPageType)
  }

  if (config.sorts && config.sorts.length > 0) {
    const accessors = generateSortAccessors(properties, pageTypeId, propertiesByPageType, resolver)
    result = applySorts(result, config.sorts, accessors)
  }

  return result
}
