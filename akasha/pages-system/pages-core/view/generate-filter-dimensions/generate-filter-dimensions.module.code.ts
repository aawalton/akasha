import type { PropertyDefinition, PropertyType } from "../../page-data/page-data.module.code.ts"
import type { FilterOperatorOption } from "../../property-types/property-type-ops/property-type-ops.module.code.ts"
import { PROPERTY_TYPE_OPS_REGISTRY } from "../../property-types/registry/registry.module.code.ts"
import { resolveComputedProperty } from "../../property-types/resolve-computed-type/resolve-computed-type.module.code.ts"
import type { PageTypePropertiesMap } from "../../property-types/rollup/rollup.module.code.ts"
import {
  isSelectOption,
  type SelectOption,
} from "../apply-grouping-shared/apply-grouping-shared.module.code.ts"

export interface PageFilterDimension {
  id: string
  label: string
  type: PropertyType
  options?: readonly SelectOption[]
  operators: readonly FilterOperatorOption[]
  targetPageTypeId?: string
}

function readOptions(config: PropertyDefinition["config"]): readonly SelectOption[] | undefined {
  const raw = config?.options
  if (!Array.isArray(raw)) return undefined
  return raw.filter(isSelectOption)
}

function readTargetPageTypeId(config: PropertyDefinition["config"]): string | undefined {
  const raw = config?.targetPageTypeId
  return typeof raw === "string" ? raw : undefined
}

export function generateFilterDimensions(
  properties: readonly PropertyDefinition[],
  pageTypeId?: string,
  propertiesByPageType?: PageTypePropertiesMap
): readonly PageFilterDimension[] {
  const dims: PageFilterDimension[] = []

  for (const prop of properties) {
    const effective =
      pageTypeId !== undefined && propertiesByPageType !== undefined
        ? resolveComputedProperty(prop, pageTypeId, propertiesByPageType)
        : prop

    const handler = PROPERTY_TYPE_OPS_REGISTRY[effective.type]
    if (!handler) continue

    const operators = handler.getFilterOperators(effective)
    const targetPageTypeId =
      effective.type === "relation" || effective.type === "multi-relation"
        ? readTargetPageTypeId(effective.config)
        : undefined

    const dim: PageFilterDimension = {
      id: prop.id,
      label: prop.title,
      type: effective.type,
      options: readOptions(effective.config),
      operators,
      targetPageTypeId,
    }
    dims.push(dim)
  }

  return dims.sort((a, b) => a.label.localeCompare(b.label))
}
