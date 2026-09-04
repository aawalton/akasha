import type {
  FilterConfig,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

export function textFilterPredicate(config: FilterConfig): (value: PropertyValue) => boolean {
  const filterStr = String(config.value ?? "").toLowerCase()

  return (value) => {
    const str = String(value ?? "").toLowerCase()
    switch (config.operator) {
      case "contains":
        return str.includes(filterStr)
      case "not_contains":
        return !str.includes(filterStr)
      case "equals":
        return str === filterStr
      case "not_equals":
        return str !== filterStr
      case "is_empty":
        return str === ""
      case "is_not_empty":
        return str !== ""
      default:
        return true
    }
  }
}
