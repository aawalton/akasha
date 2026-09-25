import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import { wordable } from "akasha/page/core/property-type/modules/rrule-wording/rrule-wording.module.code.ts"

export function isRruleValue(
  value: PropertyValue
): value is { readonly rule: string; readonly anchorFromCompletion: boolean } {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false
  const rule: unknown = Reflect.get(value, "rule")
  if (typeof rule !== "string" || rule.length === 0) return false
  const anchor: unknown = Reflect.get(value, "anchorFromCompletion")
  if (typeof anchor !== "boolean") return false
  return true
}

function ruleRefusal(rule: string): string | null {
  if (rule.length === 0) return "rrule.rule must be non-empty"
  if (wordable(rule)) return null
  return `\`${rule}\` is a rule the recurrence wording does not cover, so it would read as that text rather than as words`
}

export function rruleRefusal(value: unknown): string | null {
  if (value === null || value === undefined) return null
  if (typeof value === "string") return ruleRefusal(value)
  if (typeof value !== "object" || Array.isArray(value)) {
    return "rrule value must be a rule or an object holding one"
  }
  const rule: unknown = Reflect.get(value, "rule")
  if (typeof rule !== "string") return "rrule.rule must be a string"
  const anchor: unknown = Reflect.get(value, "anchorFromCompletion")
  if (typeof anchor !== "boolean") {
    return "rrule.anchorFromCompletion must be a boolean"
  }
  return ruleRefusal(rule)
}

export const RRULE_OPS: PropertyTypeOps = {
  validate: rruleRefusal,

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
