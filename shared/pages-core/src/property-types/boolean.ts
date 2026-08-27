import type { FilterConfig, FilterOperatorOption, PropertyTypeOps, PropertyValue } from "./types"

function isTruthy(value: unknown): boolean {
  return Boolean(value)
}

export const booleanOps: PropertyTypeOps = {
  validate() {
    return null
  },

  getSortValue(value: PropertyValue) {
    return isTruthy(value) ? 1 : 0
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "equals", label: "Equals" },
      { value: "not_equals", label: "Does not equal" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    return (value) => {
      switch (config.operator) {
        case "equals":
          return isTruthy(value) === isTruthy(config.value)
        case "not_equals":
          return isTruthy(value) !== isTruthy(config.value)
        default:
          return true
      }
    }
  },
}
