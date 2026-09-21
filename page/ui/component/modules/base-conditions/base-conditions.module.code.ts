import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type {
  PageCondition,
  PageWhere,
} from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { ViewFilter } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { viewFilterToCondition } from "akasha/page/ui/supabase/modules/view-filter-to-condition/view-filter-to-condition.module.code.ts"

export function buildBaseConditions(args: {
  baseFilters: readonly ViewFilter[]
  properties: readonly PropertyDefinition[]
}): PageWhere | undefined {
  const { baseFilters, properties } = args
  if (baseFilters.length === 0) return undefined
  const conditions: PageCondition[] = []
  for (const filter of baseFilters) {
    const definition = properties.find((d) => d.id === filter.propertyId)
    const translated = viewFilterToCondition(
      filter.propertyId,
      filter.operator,
      filter.value,
      definition
    )
    if (translated) conditions.push(...translated)
  }
  return conditions.length > 0 ? conditions : undefined
}
