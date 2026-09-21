import { filterToCondition } from "akasha/page/core/filter/modules/filter-to-condition/filter-to-condition.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PageCondition } from "akasha/page/core/modules/page-types/page-types.module.code.ts"

export function viewFilterToCondition(
  propertyId: string,
  operator: string,
  value: unknown,
  definition?: PropertyDefinition
): readonly PageCondition[] | null {
  return filterToCondition(propertyId, operator, value, definition?.type)
}
