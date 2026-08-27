import type { FilterConfig, FilterOperatorOption, PropertyTypeOps, PropertyValue } from "./types"

function isEmpty(value: PropertyValue): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === "string") return value === ""
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === "object") return Object.keys(value).length === 0
  return false
}

export const jsonOps: PropertyTypeOps = {
  validate() {
    return null
  },

  getSortValue() {
    return null
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    return (value) => {
      switch (config.operator) {
        case "is_empty":
          return isEmpty(value)
        case "is_not_empty":
          return !isEmpty(value)
        default:
          return true
      }
    }
  },
}
