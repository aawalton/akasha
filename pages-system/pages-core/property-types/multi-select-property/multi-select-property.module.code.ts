import type { PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import { parseConfig } from "../../schema/pages/pages.module.code.ts"
import { multiSelectConfigSchema } from "../../schema/property-config-schemas/property-config-schemas.module.code.ts"
import { getValueArray } from "../multi-relation/multi-relation.module.code.ts"
import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"
import { findOption, type OptionLike } from "../select/select.module.code.ts"

function getOptions(definition: PropertyDefinition): readonly OptionLike[] {
  return parseConfig(multiSelectConfigSchema, definition.config, { options: [] }).options
}

export const MULTI_SELECT_OPS: PropertyTypeOps = {
  validate(value: PropertyValue, definition: PropertyDefinition) {
    if (value == null) return null
    if (!Array.isArray(value)) return "Multi-select value must be an array"
    const options = getOptions(definition)
    for (const id of value) {
      if (typeof id !== "string") return "Multi-select values must be strings"
      if (!findOption(options, id)) return `Invalid option: ${id}`
    }
    return null
  },

  getSortValue(value: PropertyValue, definition?: PropertyDefinition) {
    const ids = getValueArray(value)
    if (ids.length === 0) return null
    if (definition?.sort === "alpha") {
      const options = getOptions(definition)
      const labels = ids.map((id) => findOption(options, id)?.label ?? id)
      return labels.sort().join(", ")
    }
    if (!definition) return [...ids].sort().join(", ")
    const options = getOptions(definition)
    const indexMap = new Map(options.map((opt, i) => [opt.id, i]))
    let minIndex = Number.POSITIVE_INFINITY
    for (const id of ids) {
      const idx = indexMap.get(id)
      if (idx != null && idx < minIndex) minIndex = idx
    }
    return minIndex === Number.POSITIVE_INFINITY ? null : minIndex
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "includes", label: "Includes any of" },
      { value: "not_includes", label: "Excludes all of" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    const { operator, value: filterValue } = config
    return (value: PropertyValue) => {
      const ids = getValueArray(value)
      switch (operator) {
        case "includes":
          if (filterValue === undefined) return true
          if (Array.isArray(filterValue)) return ids.some((id) => filterValue.includes(id))
          return typeof filterValue === "string" && ids.includes(filterValue)
        case "not_includes":
          if (filterValue === undefined) return true
          if (Array.isArray(filterValue)) return !ids.some((id) => filterValue.includes(id))
          return typeof filterValue === "string" && !ids.includes(filterValue)
        case "is_empty":
          return ids.length === 0
        case "is_not_empty":
          return ids.length > 0
        default:
          return true
      }
    }
  },
}
