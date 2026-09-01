import type { PageCondition, PageWhere } from "@akasha/pages-core/page-types"
import type { PageTypePropertiesMap } from "@akasha/pages-core/property-types/rollup"
import type { ViewFilter } from "@akasha/pages-core/schema/view-data"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { viewFilterToCondition } from "@akasha/pages-ui/supabase/view-filter-to-condition"

export function buildBaseConditions(args: {
  baseFilters: readonly ViewFilter[]
  properties: readonly PropertyDefinition[]
  targetPageTypeId: string
  propertiesByPageType: PageTypePropertiesMap
}): PageWhere | undefined {
  const { baseFilters, properties, targetPageTypeId, propertiesByPageType } = args
  if (baseFilters.length === 0) return undefined
  const conditions: PageCondition[] = []
  for (const filter of baseFilters) {
    const definition = properties.find((d) => d.id === filter.propertyId)
    const translated = viewFilterToCondition(
      filter.propertyId,
      filter.operator,
      filter.value,
      definition,
      targetPageTypeId,
      propertiesByPageType
    )
    if (translated) conditions.push(...translated)
  }
  return conditions.length > 0 ? conditions : undefined
}
