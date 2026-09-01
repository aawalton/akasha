import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

function isPlainObject(value: PropertyValue): value is { readonly [key: string]: PropertyValue } {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function hasInvocation(value: PropertyValue): boolean {
  if (!isPlainObject(value)) return false
  return typeof Reflect.get(value, "lastInvokedAt") === "string"
}

export const ACTION_BUTTON_OPS: PropertyTypeOps = {
  rendersWhenEmpty: true,

  validate(value: PropertyValue) {
    if (value == null || value === "") return null
    if (!isPlainObject(value)) return "Action value must be an invocation-record object"
    const last: unknown = Reflect.get(value, "lastInvokedAt")
    if (last === undefined) return null
    if (typeof last === "string") return null
    return "Action value lastInvokedAt must be a string"
  },

  getSortValue(value: PropertyValue) {
    if (!isPlainObject(value)) return null
    const last: unknown = Reflect.get(value, "lastInvokedAt")
    if (typeof last !== "string") return null
    const ms = Date.parse(last)
    return Number.isFinite(ms) ? ms : null
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
          return !hasInvocation(value)
        case "is_not_empty":
          return hasInvocation(value)
        default:
          return true
      }
    }
  },
}
