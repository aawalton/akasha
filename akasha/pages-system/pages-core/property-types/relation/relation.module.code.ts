import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

export const RELATION_OPS: PropertyTypeOps = {
  validate(value: PropertyValue) {
    if (value == null || value === "") return null
    if (typeof value !== "string") return "Relation value must be a string"
    return null
  },

  getSortValue(value: PropertyValue) {
    return typeof value === "string" ? value : null
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "equals", label: "Is" },
      { value: "not_equals", label: "Is not" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    const { operator, value: filterValue } = config
    return (value: PropertyValue) => {
      switch (operator) {
        case "equals":
          return value === filterValue
        case "not_equals":
          return value !== filterValue
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
