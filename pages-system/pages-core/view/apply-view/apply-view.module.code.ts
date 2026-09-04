import type { PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import type { PageTypePropertiesMap } from "../../property-types/rollup/rollup.module.code.ts"
import type { ViewConfig } from "../../schema/view-data/view-data.module.code.ts"
import type { FilterableRow } from "../apply-filters/apply-filters.module.code.ts"
import { applyFilters } from "../apply-filters/apply-filters.module.code.ts"
import type { PageResolver } from "../apply-grouping-shared/apply-grouping-shared.module.code.ts"
import { applySorts } from "../apply-sorts/apply-sorts.module.code.ts"
import { generateSortAccessors } from "../sort-accessors/sort-accessors.module.code.ts"

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
