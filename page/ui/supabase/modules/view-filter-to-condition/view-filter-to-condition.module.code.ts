import { filterToCondition } from "akasha/page/core/filter/modules/filter-to-condition/filter-to-condition.module.code.ts"
import type {
  PageTypePropertiesMap,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PageCondition } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { resolveComputedProperty } from "akasha/page/core/property-type/modules/resolve-computed-type/resolve-computed-type.module.code.ts"

export function viewFilterToCondition(
  propertyId: string,
  operator: string,
  value: unknown,
  definition?: PropertyDefinition,
  propertiesByPageType?: PageTypePropertiesMap
): readonly PageCondition[] | null {
  const effective =
    definition !== undefined && propertiesByPageType !== undefined
      ? resolveComputedProperty(definition, propertiesByPageType)
      : definition
  return filterToCondition(propertyId, operator, value, effective?.type)
}
