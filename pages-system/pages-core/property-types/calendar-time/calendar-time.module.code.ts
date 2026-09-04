import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/

function resolveFilterTime(filterValue: unknown): string | null {
  if (typeof filterValue === "string" && TIME_REGEX.test(filterValue)) return filterValue
  return null
}

export const CALENDAR_TIME_OPS: PropertyTypeOps = {
  validate(value: PropertyValue) {
    if (value == null || value === "") return null
    if (typeof value !== "string") return "Time must be a string"
    if (!TIME_REGEX.test(value)) return "Time must be in HH:MM format"
    return null
  },

  getSortValue(value: PropertyValue) {
    if (typeof value !== "string" || !TIME_REGEX.test(value)) return null
    return value
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "equals", label: "Is" },
      { value: "gt", label: "Is after" },
      { value: "lt", label: "Is before" },
      { value: "gte", label: "Is at or after" },
      { value: "lte", label: "Is at or before" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    const { operator, value: filterValue } = config
    return (value: PropertyValue) => {
      switch (operator) {
        case "equals": {
          const resolved = resolveFilterTime(filterValue)
          return resolved != null ? value === resolved : value === filterValue
        }
        case "gt": {
          const resolved = resolveFilterTime(filterValue)
          return typeof value === "string" && resolved != null && value > resolved
        }
        case "lt": {
          const resolved = resolveFilterTime(filterValue)
          return typeof value === "string" && resolved != null && value < resolved
        }
        case "gte": {
          const resolved = resolveFilterTime(filterValue)
          return typeof value === "string" && resolved != null && value >= resolved
        }
        case "lte": {
          const resolved = resolveFilterTime(filterValue)
          return typeof value === "string" && resolved != null && value <= resolved
        }
        case "is_empty":
          return value == null || value === ""
        case "is_not_empty":
          return value != null && value !== ""
        default:
          return true
      }
    }
  },
}
