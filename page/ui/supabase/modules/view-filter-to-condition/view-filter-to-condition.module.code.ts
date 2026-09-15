import { filterToCondition } from "akasha/page/core/filter/modules/filter-to-condition/filter-to-condition.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PageCondition } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { resolveComputedProperty } from "akasha/page/core/property-type/modules/resolve-computed-type/resolve-computed-type.module.code.ts"
import type { PageTypePropertiesMap } from "akasha/page/core/property-type/modules/rollup/rollup.module.code.ts"

function unwrapRollupDefinition(
  definition: PropertyDefinition | undefined,
  pageTypeId: string | undefined,
  propertiesByPageType: PageTypePropertiesMap | undefined
): PropertyDefinition | undefined {
  if (definition?.type !== "rollup") return definition
  if (pageTypeId == null || !propertiesByPageType) return definition
  return resolveComputedProperty(definition, pageTypeId, propertiesByPageType)
}

export function viewFilterToCondition(
  propertyId: string,
  operator: string,
  value: unknown,
  definition?: PropertyDefinition,
  pageTypeId?: string,
  propertiesByPageType?: PageTypePropertiesMap
): readonly PageCondition[] | null {
  const effective = unwrapRollupDefinition(definition, pageTypeId, propertiesByPageType)
  return filterToCondition(propertyId, operator, value, effective?.type)
}
