import { propertyTypeOpsRegistry } from "../property-types/registry"
import { resolveComputedProperty } from "../property-types/resolve-computed-type"
import type { PageTypePropertiesMap } from "../property-types/rollup"
import type { FilterOperatorOption } from "../property-types/types"
import type { PropertyDefinition, PropertyType } from "../types"
import type { SelectOption } from "./apply-grouping-shared"

export interface PageFilterDimension {
  id: string
  label: string
  type: PropertyType
  options?: readonly SelectOption[]
  operators: readonly FilterOperatorOption[]
  targetPageTypeId?: string
}

function isSelectOption(value: unknown): value is SelectOption {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false
  if (!("id" in value) || typeof value.id !== "string") return false
  if (!("label" in value) || typeof value.label !== "string") return false
  return true
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

    const handler = propertyTypeOpsRegistry[effective.type]
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
