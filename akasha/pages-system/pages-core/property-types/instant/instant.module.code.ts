import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { InstantFormat } from "../../schema/property-config-schemas/property-config-schemas.module.code.ts"
import type {
  BetweenInstantValue,
  SentinelInstantValue,
} from "../date-sentinels/date-sentinels.module.code.ts"
import {
  isRelativeToTodayValue,
  resolveInstantSentinel,
  resolveInstantSentinelEndOfDay,
  resolveRelativeToTodayInstant,
  resolveSentinelInstantDayRange,
} from "../date-sentinels/date-sentinels.module.code.ts"
import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

function isSentinelInstantValue(value: unknown): value is SentinelInstantValue {
  if (value == null || typeof value !== "object") return false
  if (!("sentinel" in value)) return false
  const sentinel = value.sentinel
  if (typeof sentinel !== "string") return false
  if ("customInstant" in value) {
    const ci = value.customInstant
    if (ci !== undefined && typeof ci !== "number") return false
  }
  return true
}

function isBetweenInstantValue(value: unknown): value is BetweenInstantValue {
  if (value == null || typeof value !== "object") return false
  if (!("type" in value) || value.type !== "between") return false
  if (!("start" in value) || !isSentinelInstantValue(value.start)) return false
  if (!("end" in value) || !isSentinelInstantValue(value.end)) return false
  return true
}

function resolveFilterInstantStartOfDay(filterValue: unknown): number | null {
  if (typeof filterValue === "number") return filterValue
  if (isSentinelInstantValue(filterValue)) {
    try {
      return resolveInstantSentinel(filterValue.sentinel, filterValue.customInstant)
    } catch {
      return null
    }
  }
  return null
}

function resolveFilterInstantEndOfDay(filterValue: unknown): number | null {
  if (typeof filterValue === "number") return filterValue
  if (isSentinelInstantValue(filterValue)) {
    try {
      return resolveInstantSentinelEndOfDay(filterValue.sentinel, filterValue.customInstant)
    } catch {
      return null
    }
  }
  return null
}

export function instantToMillis(value: PropertyValue | undefined): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null
  if (typeof value === "string") {
    if (value === "") return null
    const parsed = Date.parse(value)
    return Number.isNaN(parsed) ? null : parsed
  }
  return null
}

const toMillis = instantToMillis

type AbsoluteInstantFormat = Exclude<InstantFormat, "relative">

const ABSOLUTE_INSTANT_OPTS: Record<AbsoluteInstantFormat, Intl.DateTimeFormatOptions> = {
  "absolute-date-time": {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
  },
  "absolute-date": { year: "numeric", month: "short", day: "2-digit" },
  "absolute-time": { hour: "numeric", minute: "2-digit" },
}

export function formatAbsoluteInstant(
  ms: number,
  format: AbsoluteInstantFormat,
  timeZone?: string
): string {
  const base = ABSOLUTE_INSTANT_OPTS[format]
  const opts = timeZone != null ? { ...base, timeZone } : base
  switch (format) {
    case "absolute-date-time":
    case "absolute-date":
    case "absolute-time":
      return new Intl.DateTimeFormat(undefined, opts).format(ms)
    default:
      return assertNever(format)
  }
}

export const INSTANT_OPS: PropertyTypeOps = {
  validate(value: PropertyValue) {
    if (value == null || value === "") return null
    if (toMillis(value) !== null) return null
    return "Instant must be a number or ISO 8601 datetime string"
  },

  getSortValue(value: PropertyValue) {
    return toMillis(value)
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
      const valueMs = toMillis(value)
      switch (operator) {
        case "equals": {
          if (isSentinelInstantValue(filterValue)) {
            if (valueMs === null) return false
            try {
              const { start, end } = resolveSentinelInstantDayRange(filterValue)
              return valueMs >= start && valueMs < end
            } catch {
              return false
            }
          }
          const filterMs = toMillis(filterValue)
          if (valueMs === null && filterMs === null) return value === filterValue
          return valueMs !== null && valueMs === filterMs
        }
        case "gt": {
          const resolved = resolveFilterInstantEndOfDay(filterValue)
          return valueMs !== null && resolved != null && valueMs > resolved
        }
        case "lt": {
          const resolved = resolveFilterInstantStartOfDay(filterValue)
          return valueMs !== null && resolved != null && valueMs < resolved
        }
        case "gte": {
          const resolved = resolveFilterInstantStartOfDay(filterValue)
          return valueMs !== null && resolved != null && valueMs >= resolved
        }
        case "lte": {
          const resolved = resolveFilterInstantEndOfDay(filterValue)
          return valueMs !== null && resolved != null && valueMs <= resolved
        }
        case "is_between": {
          if (valueMs === null) return false
          if (!isBetweenInstantValue(filterValue)) return false
          try {
            const startMs = resolveInstantSentinel(
              filterValue.start.sentinel,
              filterValue.start.customInstant
            )
            const endMs = resolveInstantSentinelEndOfDay(
              filterValue.end.sentinel,
              filterValue.end.customInstant
            )
            return valueMs >= startMs && valueMs <= endMs
          } catch {
            return false
          }
        }
        case "is_relative_to_today": {
          if (valueMs === null) return false
          if (!isRelativeToTodayValue(filterValue)) return false
          try {
            const { start, end } = resolveRelativeToTodayInstant(filterValue)
            return valueMs >= start && valueMs < end
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
