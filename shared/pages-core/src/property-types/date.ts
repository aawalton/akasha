import type { BetweenDateValue, RelativeToTodayValue, SentinelDateValue } from "./date-sentinels"
import { resolveDateSentinel, resolveRelativeToToday } from "./date-sentinels"
import type { FilterConfig, FilterOperatorOption, PropertyTypeOps, PropertyValue } from "./types"

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

const RELATIVE_DIRECTIONS = new Set<string>(["past", "next", "this"])
const RELATIVE_UNITS = new Set<string>(["day", "week", "month", "year"])

function isRelativeDirection(v: unknown): v is RelativeToTodayValue["direction"] {
  return typeof v === "string" && RELATIVE_DIRECTIONS.has(v)
}

function isRelativeUnit(v: unknown): v is RelativeToTodayValue["unit"] {
  return typeof v === "string" && RELATIVE_UNITS.has(v)
}

function isSentinelDateValue(value: unknown): value is SentinelDateValue {
  if (value == null || typeof value !== "object") return false
  if (!("sentinel" in value) || typeof value.sentinel !== "string") return false
  if ("customDate" in value) {
    const cd = value.customDate
    if (cd !== undefined && typeof cd !== "string") return false
  }
  return true
}

function isBetweenDateValue(value: unknown): value is BetweenDateValue {
  if (value == null || typeof value !== "object") return false
  if (!("type" in value) || value.type !== "between") return false
  if (!("start" in value) || !isSentinelDateValue(value.start)) return false
  if (!("end" in value) || !isSentinelDateValue(value.end)) return false
  return true
}

function isRelativeToTodayValue(value: unknown): value is RelativeToTodayValue {
  if (value == null || typeof value !== "object") return false
  if (!("type" in value) || value.type !== "relative_to_today") return false
  if (!("direction" in value) || !isRelativeDirection(value.direction)) return false
  if (!("unit" in value) || !isRelativeUnit(value.unit)) return false
  return true
}

function resolveFilterDate(filterValue: unknown): string | null {
  if (typeof filterValue === "string") return filterValue
  if (isSentinelDateValue(filterValue)) {
    try {
      return resolveDateSentinel(filterValue.sentinel, filterValue.customDate)
    } catch {
      return null
    }
  }
  return null
}

export const dateOps: PropertyTypeOps = {
  validate(value: PropertyValue) {
    if (value == null || value === "") return null
    if (typeof value !== "string") return "Date must be a string"
    if (!DATE_REGEX.test(value)) return "Date must be in YYYY-MM-DD format"
    return null
  },

  getSortValue(value: PropertyValue) {
    if (typeof value !== "string" || !DATE_REGEX.test(value)) return null
    return value
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "is_relative_to_today", label: "Is relative to today" },
      { value: "equals", label: "Is" },
      { value: "gt", label: "Is after" },
      { value: "lt", label: "Is before" },
      { value: "gte", label: "Is on or after" },
      { value: "lte", label: "Is on or before" },
      { value: "is_between", label: "Is between" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    const { operator, value: filterValue } = config
    return (value: PropertyValue) => {
      switch (operator) {
        case "equals": {
          const resolved = resolveFilterDate(filterValue)
          return resolved != null ? value === resolved : value === filterValue
        }
        case "gt": {
          const resolved = resolveFilterDate(filterValue)
          return typeof value === "string" && resolved != null && value > resolved
        }
        case "lt": {
          const resolved = resolveFilterDate(filterValue)
          return typeof value === "string" && resolved != null && value < resolved
        }
        case "gte": {
          const resolved = resolveFilterDate(filterValue)
          return typeof value === "string" && resolved != null && value >= resolved
        }
        case "lte": {
          const resolved = resolveFilterDate(filterValue)
          return typeof value === "string" && resolved != null && value <= resolved
        }
        case "is_between": {
          if (typeof value !== "string") return false
          if (!isBetweenDateValue(filterValue)) return false
          try {
            const startDate = resolveDateSentinel(
              filterValue.start.sentinel,
              filterValue.start.customDate
            )
            const endDate = resolveDateSentinel(
              filterValue.end.sentinel,
              filterValue.end.customDate
            )
            return value >= startDate && value <= endDate
          } catch {
            return false
          }
        }
        case "is_relative_to_today": {
          if (typeof value !== "string") return false
          if (!isRelativeToTodayValue(filterValue)) return false
          try {
            const { start, end } = resolveRelativeToToday(filterValue)
            return value >= start && value < end
          } catch {
            return false
          }
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
