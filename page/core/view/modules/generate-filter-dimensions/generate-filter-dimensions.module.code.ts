import type {
  PropertyDefinition,
  PropertyType,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { FilterOperatorOption } from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import { PROPERTY_TYPE_OPS_REGISTRY } from "akasha/page/core/property-type/modules/registry/registry.module.code.ts"
import {
  isSelectOption,
  type SelectOption,
} from "akasha/page/core/view/modules/apply-grouping-shared/apply-grouping-shared.module.code.ts"

export interface PageFilterDimension {
  id: string
  label: string
  type: PropertyType
  options?: readonly SelectOption[]
  operators: readonly FilterOperatorOption[]
  targetPageTypeId?: string
  targetPageTypeSlug?: string
}

function readOptions(config: PropertyDefinition["config"]): readonly SelectOption[] | undefined {
  const raw = config?.options
  if (!Array.isArray(raw)) return undefined
  return raw.filter(isSelectOption)
}

function readText(config: PropertyDefinition["config"], key: string): string | undefined {
  const raw = config?.[key]
  return typeof raw === "string" ? raw : undefined
}

export function generateFilterDimensions(
  properties: readonly PropertyDefinition[]
): readonly PageFilterDimension[] {
  const dims: PageFilterDimension[] = []

  for (const prop of properties) {
    const handler = PROPERTY_TYPE_OPS_REGISTRY[prop.type]
    if (!handler) continue

    const operators = handler.getFilterOperators(prop)
    const relating = prop.type === "relation" || prop.type === "multi-relation"

    const dim: PageFilterDimension = {
      id: prop.id,
      label: prop.title,
      type: prop.type,
      options: readOptions(prop.config),
      operators,
      targetPageTypeId: relating ? readText(prop.config, "targetPageTypeId") : undefined,
      targetPageTypeSlug: relating ? readText(prop.config, "targetPageTypeSlug") : undefined,
    }
    dims.push(dim)
  }

  return dims.sort((a, b) => a.label.localeCompare(b.label))
}
