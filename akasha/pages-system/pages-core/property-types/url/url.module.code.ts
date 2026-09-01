import { textFilterPredicate } from "../filter-utils/filter-utils.module.code.ts"
import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

function tryHostname(value: PropertyValue): string | null {
  if (value === null || value === undefined) return null
  try {
    const hostname = new URL(String(value)).hostname
    return hostname !== "" ? hostname : null
  } catch {
    return null
  }
}

export const URL_OPS: PropertyTypeOps = {
  validate(value: PropertyValue) {
    if (value === null || value === undefined || value === "") return null
    try {
      new URL(String(value))
      return null
    } catch {
      return "Invalid URL"
    }
  },

  getSortValue(value: PropertyValue) {
    const hostname = tryHostname(value)
    if (hostname != null) return hostname
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
