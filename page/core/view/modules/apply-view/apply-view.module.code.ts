import type {
  PageTypePropertiesMap,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { ViewConfig } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import type { FilterableRow } from "akasha/page/core/view/modules/apply-filters/apply-filters.module.code.ts"
import { applyFilters } from "akasha/page/core/view/modules/apply-filters/apply-filters.module.code.ts"
import type { PageResolver } from "akasha/page/core/view/modules/apply-grouping-shared/apply-grouping-shared.module.code.ts"
import { applySorts } from "akasha/page/core/view/modules/apply-sorts/apply-sorts.module.code.ts"
import { generateSortAccessors } from "akasha/page/core/view/modules/sort-accessors/sort-accessors.module.code.ts"

export function applyView<T extends FilterableRow>(
  items: readonly T[],
  properties: readonly PropertyDefinition[],
  config: ViewConfig,
  propertiesByPageType?: PageTypePropertiesMap,
  resolver?: PageResolver | null
): readonly T[] {
  let result: readonly T[] = items

  if (config.filters && config.filters.length > 0) {
    result = applyFilters(result, config.filters, properties, propertiesByPageType)
  }

  if (config.sorts && config.sorts.length > 0) {
    const accessors = generateSortAccessors(properties, propertiesByPageType, resolver)
    result = applySorts(result, config.sorts, accessors)
  }

  return result
}
