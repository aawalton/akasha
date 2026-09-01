import { textFilterPredicate } from "../filter-utils/filter-utils.module.code.ts"
import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

export const TEXT_OPS: PropertyTypeOps = {
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
      { value: "equals", label: "Equals" },
      { value: "not_equals", label: "Does not equal" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    return textFilterPredicate(config)
  },
}
