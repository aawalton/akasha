import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

export function getValueArray(value: PropertyValue): readonly string[] {
  if (!Array.isArray(value)) return []
  return value.filter((v): v is string => typeof v === "string")
}

export const MULTI_RELATION_OPS: PropertyTypeOps = {
  validate(value: PropertyValue) {
    if (value == null) return null
    if (!Array.isArray(value)) return "Multi-relation value must be an array"
    for (const id of value) {
      if (typeof id !== "string") return "Multi-relation values must be strings"
    }
    return null
  },

  getSortValue(value: PropertyValue) {
    const ids = getValueArray(value)
    return ids.length > 0 ? ids.length : null
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
          if (Array.isArray(filterValue)) return ids.some((id) => filterValue.includes(id))
          return typeof filterValue === "string" && ids.includes(filterValue)
        case "not_includes":
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
