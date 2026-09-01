import { isJson } from "@akasha/utils-narrow/is-json"
import type { Json } from "@akasha/utils-narrow/json-value"
import type { PropertyType } from "../../page-data/page-data.module.code.ts"
import type { PageCondition } from "../../page-types/page-types.module.code.ts"
import type {
  RelativeToTodayValue,
  SentinelDateValue,
  SentinelInstantValue,
} from "../../property-types/date-sentinels/date-sentinels.module.code.ts"
import {
  resolveDateSentinel,
  resolveInstantSentinel,
  resolveInstantSentinelEndOfDay,
  resolveRelativeToToday,
  resolveRelativeToTodayInstant,
  resolveSentinelInstantDayRange,
} from "../../property-types/date-sentinels/date-sentinels.module.code.ts"
import type { FilterOperator } from "../../property-types/property-type-ops/property-type-ops.module.code.ts"

type LooseSentinel = SentinelDateValue & SentinelInstantValue

type LooseBetween = {
  readonly type: "between"
  readonly start: LooseSentinel
  readonly end: LooseSentinel
}

function narrowJsonArray(values: readonly unknown[]): readonly Json[] | null {
  const out: Json[] = []
  for (const v of values) {
    if (!isJson(v)) return null
    out.push(v)
  }
  return out
}

function multiValueContainment(key: string, value: unknown): readonly PageCondition[] | null {
  const arr = Array.isArray(value) ? narrowJsonArray(value) : isJson(value) ? [value] : null
  if (arr === null || arr.length === 0) return null
  const conds: readonly PageCondition[] = arr.map((v) => ({ key, includes: v }))
  return conds.length === 1 ? conds : [{ or: conds }]
}

function isSentinelOperand(value: unknown): value is LooseSentinel {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false
  if (!("sentinel" in value) || typeof value.sentinel !== "string") return false
  return true
}

function isBetweenValue(value: unknown): value is LooseBetween {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false
  if (!("type" in value) || value.type !== "between") return false
  if (!("start" in value) || !isSentinelOperand(value.start)) return false
  if (!("end" in value) || !isSentinelOperand(value.end)) return false
  return true
}

const RELATIVE_DIRECTIONS = new Set(["past", "next", "this"])
const RELATIVE_UNITS = new Set(["day", "week", "month", "year"])

function isRelativeToTodayValue(value: unknown): value is RelativeToTodayValue {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false
  if (!("type" in value) || value.type !== "relative_to_today") return false
  if (!("direction" in value) || typeof value.direction !== "string") return false
  if (!RELATIVE_DIRECTIONS.has(value.direction)) return false
  if (!("unit" in value) || typeof value.unit !== "string") return false
  if (!RELATIVE_UNITS.has(value.unit)) return false
  return true
}

function resolveCalendarOrInstantOperand(
  value: unknown,
  type: PropertyType | undefined,
  boundary: "startOfDay" | "endOfDay"
): string | number | null {
  if (typeof value === "string" || typeof value === "number") return value
  if (isSentinelOperand(value)) {
    if (type === "calendar-date") {
      try {
        return resolveDateSentinel(value.sentinel, value.customDate)
      } catch {
        return null
      }
    }
    if (type === "instant") {
      try {
        return boundary === "endOfDay"
          ? resolveInstantSentinelEndOfDay(value.sentinel, value.customInstant)
          : resolveInstantSentinel(value.sentinel, value.customInstant)
      } catch {
        return null
      }
    }
  }
  return null
}

function expandRange(
  key: string,
  range: { start: string; end: string } | { start: number; end: number }
): readonly PageCondition[] {
  return [
    { key, gte: range.start },
    { key, lt: range.end },
  ]
}

type Translator = (
  key: string,
  value: unknown,
  type: PropertyType | undefined
) => readonly PageCondition[] | null

const TRANSLATORS = {
  equals: (key, value, type) => {
    if (value === undefined) return null
    if (isSentinelOperand(value)) {
      if (type === "instant") {
        try {
          return expandRange(key, resolveSentinelInstantDayRange(value))
        } catch {
          return null
        }
      }
      const resolved = resolveCalendarOrInstantOperand(value, type, "startOfDay")
      return resolved == null ? null : [{ key, eq: resolved }]
    }
    if (type === "multi-relation" || type === "multi-select") {
      return multiValueContainment(key, value)
    }
    return isJson(value) ? [{ key, eq: value }] : null
  },
  not_equals: (key, value, type) => {
    if (value === undefined) return null
    if (isSentinelOperand(value)) {
      if (type === "instant") {
        try {
          const { start, end } = resolveSentinelInstantDayRange(value)
          return [
            {
              or: [
                { key, lt: start },
                { key, gte: end },
              ],
            },
          ]
        } catch {
          return null
        }
      }
      const resolved = resolveCalendarOrInstantOperand(value, type, "startOfDay")
      return resolved == null ? null : [{ key, neq: resolved }]
    }
    return isJson(value) ? [{ key, neq: value }] : null
  },
  contains: (key, value) => (typeof value === "string" ? [{ key, contains: value }] : null),
  not_contains: (key, value) => (typeof value === "string" ? [{ key, notContains: value }] : null),
  gt: (key, value, type) => {
    if (value === undefined) return null
    if (isSentinelOperand(value)) {
      const resolved = resolveCalendarOrInstantOperand(value, type, "endOfDay")
      return resolved == null ? null : [{ key, gt: resolved }]
    }
    return isJson(value) ? [{ key, gt: value }] : null
  },
  gte: (key, value, type) => {
    if (value === undefined) return null
    if (isSentinelOperand(value)) {
      const resolved = resolveCalendarOrInstantOperand(value, type, "startOfDay")
      return resolved == null ? null : [{ key, gte: resolved }]
    }
    return isJson(value) ? [{ key, gte: value }] : null
  },
  lt: (key, value, type) => {
    if (value === undefined) return null
    if (isSentinelOperand(value)) {
      const resolved = resolveCalendarOrInstantOperand(value, type, "startOfDay")
      return resolved == null ? null : [{ key, lt: resolved }]
    }
    return isJson(value) ? [{ key, lt: value }] : null
  },
  lte: (key, value, type) => {
    if (value === undefined) return null
    if (isSentinelOperand(value)) {
      const resolved = resolveCalendarOrInstantOperand(value, type, "endOfDay")
      return resolved == null ? null : [{ key, lte: resolved }]
    }
    return isJson(value) ? [{ key, lte: value }] : null
  },
  is_empty: (key, _value, type) => (type === "rich-document" ? null : [{ key, isEmpty: true }]),
  is_not_empty: (key, _value, type) =>
    type === "rich-document" ? null : [{ key, isNotEmpty: true }],
  includes: (key, value, type) => {
    if (value === undefined) return null
    if (type === "multi-relation" || type === "multi-select") {
      return multiValueContainment(key, value)
    }
    const arr = Array.isArray(value) ? narrowJsonArray(value) : isJson(value) ? [value] : null
    if (arr === null) return null
    return arr.length === 0 ? null : [{ key, in: arr }]
  },
  not_includes: (key, value) => {
    if (value === undefined) return null
    const arr = Array.isArray(value) ? narrowJsonArray(value) : isJson(value) ? [value] : null
    if (arr === null) return null
    return arr.length === 0 ? null : [{ key, notIn: arr }]
  },
  is_between: (key, value, type) => {
    if (!isBetweenValue(value)) return null
    if (type === "calendar-date") {
      try {
        const start = resolveDateSentinel(value.start.sentinel, value.start.customDate)
        const end = resolveDateSentinel(value.end.sentinel, value.end.customDate)
        return expandRange(key, { start, end })
      } catch {
        return null
      }
    }
    if (type === "instant") {
      try {
        const start = resolveInstantSentinel(value.start.sentinel, value.start.customInstant)
        const { end } = resolveSentinelInstantDayRange(value.end)
        return expandRange(key, { start, end })
      } catch {
        return null
      }
    }
    return null
  },
  is_relative_to_today: (key, value, type) => {
    if (!isRelativeToTodayValue(value)) return null
    if (type === "calendar-date") {
      try {
        return expandRange(key, resolveRelativeToToday(value))
      } catch {
        return null
      }
    }
    if (type === "instant") {
      try {
        return expandRange(key, resolveRelativeToTodayInstant(value))
      } catch {
        return null
      }
    }
    return null
  },
  path_starts_with: () => null,
  is_complete: () => null,
  is_incomplete: () => null,
  gte_percent: () => null,
  lte_percent: () => null,
} as const satisfies Record<FilterOperator, Translator>

function isFilterOperator(operator: string): operator is FilterOperator {
  return Object.hasOwn(TRANSLATORS, operator)
}

export function filterToCondition(
  propertyId: string,
  operator: string,
  value: unknown,
  type?: PropertyType
): readonly PageCondition[] | null {
  if (!isFilterOperator(operator)) return null
  return TRANSLATORS[operator](propertyId, value, type)
}
