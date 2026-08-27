import type { PageCondition } from "@shared/pages-core/page-types"
import type { PageTypePropertiesMap } from "@shared/pages-core/property-types/rollup"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { filterToCondition } from "@shared/pages-core/filter/filter-to-condition"
import { resolveComputedProperty } from "@shared/pages-core/property-types/resolve-computed-type"

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
