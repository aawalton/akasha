import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

function isRruleValue(
  value: PropertyValue
): value is { readonly rule: string; readonly anchorFromCompletion: boolean } {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false
  const rule: unknown = Reflect.get(value, "rule")
  if (typeof rule !== "string" || rule.length === 0) return false
  const anchor: unknown = Reflect.get(value, "anchorFromCompletion")
  if (typeof anchor !== "boolean") return false
  return true
}

export const RRULE_OPS: PropertyTypeOps = {
  validate(value: PropertyValue) {
    if (value === null || value === undefined) return null
    if (typeof value !== "object" || Array.isArray(value)) {
      return "rrule value must be an object"
    }
    const rule: unknown = Reflect.get(value, "rule")
    if (typeof rule !== "string") return "rrule.rule must be a string"
    if (rule.length === 0) return "rrule.rule must be non-empty"
    const anchor: unknown = Reflect.get(value, "anchorFromCompletion")
    if (typeof anchor !== "boolean") {
      return "rrule.anchorFromCompletion must be a boolean"
    }
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
          return !isRruleValue(value)
        case "is_not_empty":
          return isRruleValue(value)
        default:
          return true
      }
    }
  },
}
