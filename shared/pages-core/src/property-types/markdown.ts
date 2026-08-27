import { textFilterPredicate } from "./filter-utils"
import type { FilterConfig, FilterOperatorOption, PropertyTypeOps, PropertyValue } from "./types"

export const markdownOps: PropertyTypeOps = {
  validate() {
    return null
  },

  getSortValue(value: PropertyValue) {
    const str = String(value ?? "")
    return str !== "" ? str : null
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "contains", label: "Contains" },
      { value: "not_contains", label: "Does not contain" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    return textFilterPredicate(config)
  },
}
