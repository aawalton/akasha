import { filterToCondition } from "@akasha/pages-core/filter/filter-to-condition"
import type { PageCondition } from "@akasha/pages-core/page-types"
import { resolveComputedProperty } from "@akasha/pages-core/property-types/resolve-computed-type"
import type { PageTypePropertiesMap } from "@akasha/pages-core/property-types/rollup"
import type { PropertyDefinition } from "@akasha/pages-core/types"

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
