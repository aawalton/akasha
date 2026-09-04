import type {
  BetweenDateValue,
  BetweenInstantValue,
  RelativeToTodayValue,
  SentinelDateValue,
  SentinelInstantValue,
} from "@akasha/pages-core/property-types/date-sentinels"
import type { ReadonlyJSONValue } from "@akasha/pages-core/schema/pages"

export function isJsonObject(
  value: ReadonlyJSONValue | undefined
): value is { readonly [key: string]: ReadonlyJSONValue } {
  return value != null && typeof value === "object" && !Array.isArray(value)
}

export function sentinelDateToJson(v: SentinelDateValue): ReadonlyJSONValue {
  return v.customDate !== undefined
    ? { sentinel: v.sentinel, customDate: v.customDate }
    : { sentinel: v.sentinel }
}

export function sentinelInstantToJson(v: SentinelInstantValue): ReadonlyJSONValue {
  return v.customInstant !== undefined
    ? { sentinel: v.sentinel, customInstant: v.customInstant }
    : { sentinel: v.sentinel }
}

export function betweenDateToJson(v: BetweenDateValue): ReadonlyJSONValue {
  return { type: "between", start: sentinelDateToJson(v.start), end: sentinelDateToJson(v.end) }
}

export function betweenInstantToJson(v: BetweenInstantValue): ReadonlyJSONValue {
  return {
    type: "between",
    start: sentinelInstantToJson(v.start),
    end: sentinelInstantToJson(v.end),
  }
}

export function relativeToTodayToJson(v: RelativeToTodayValue): ReadonlyJSONValue {
  return { type: v.type, direction: v.direction, unit: v.unit }
}

const DATE_SENTINELS = [
  "today",
  "tomorrow",
  "yesterday",
  "one_week_ago",
  "one_week_from_now",
  "one_month_ago",
  "one_month_from_now",
  "custom_date",
] as const satisfies ReadonlyArray<SentinelDateValue["sentinel"]>

export function isDateSentinel(v: unknown): v is SentinelDateValue["sentinel"] {
  return typeof v === "string" && DATE_SENTINELS.some((s) => s === v)
}

export function parseSentinelDateValue(value: ReadonlyJSONValue | undefined): SentinelDateValue {
  if (isJsonObject(value) && "sentinel" in value && isDateSentinel(value.sentinel)) {
    const customDate =
      "customDate" in value && typeof value.customDate === "string" ? value.customDate : undefined
    return { sentinel: value.sentinel, customDate }
  }
  if (typeof value === "string") {
    return { sentinel: "custom_date", customDate: value }
  }
  return { sentinel: "custom_date" }
}

export function parseSentinelInstantValue(
  value: ReadonlyJSONValue | undefined
): SentinelInstantValue {
  if (isJsonObject(value) && "sentinel" in value && isDateSentinel(value.sentinel)) {
    const customInstant =
      "customInstant" in value && typeof value.customInstant === "number"
        ? value.customInstant
        : undefined
    return { sentinel: value.sentinel, customInstant }
  }
  if (typeof value === "number") {
    return { sentinel: "custom_date", customInstant: value }
  }
  return { sentinel: "custom_date" }
}

const RELATIVE_DIRECTIONS = ["past", "next", "this"] as const satisfies ReadonlyArray<
  RelativeToTodayValue["direction"]
>
const RELATIVE_UNITS = ["day", "week", "month", "year"] as const satisfies ReadonlyArray<
  RelativeToTodayValue["unit"]
>

function isRelativeDirection(v: unknown): v is RelativeToTodayValue["direction"] {
  return typeof v === "string" && RELATIVE_DIRECTIONS.some((d) => d === v)
}

function isRelativeUnit(v: unknown): v is RelativeToTodayValue["unit"] {
  return typeof v === "string" && RELATIVE_UNITS.some((u) => u === v)
}

export function parseRelativeToTodayValue(
  value: ReadonlyJSONValue | undefined
): RelativeToTodayValue {
  if (
    isJsonObject(value) &&
    "type" in value &&
    value.type === "relative_to_today" &&
    "direction" in value &&
    isRelativeDirection(value.direction) &&
    "unit" in value &&
    isRelativeUnit(value.unit)
  ) {
    return { type: "relative_to_today", direction: value.direction, unit: value.unit }
  }
  return { type: "relative_to_today", direction: "this", unit: "week" }
}

export function parseBetweenDateValue(value: ReadonlyJSONValue | undefined): BetweenDateValue {
  if (isJsonObject(value) && "type" in value && value.type === "between") {
    const start = "start" in value ? parseSentinelDateValue(value.start) : undefined
    const end = "end" in value ? parseSentinelDateValue(value.end) : undefined
    return {
      type: "between",
      start: start ?? { sentinel: "custom_date" },
      end: end ?? { sentinel: "custom_date" },
    }
  }
  return {
    type: "between",
    start: { sentinel: "custom_date" },
    end: { sentinel: "custom_date" },
  }
}

export function parseBetweenInstantValue(
  value: ReadonlyJSONValue | undefined
): BetweenInstantValue {
  if (isJsonObject(value) && "type" in value && value.type === "between") {
    const start = "start" in value ? parseSentinelInstantValue(value.start) : undefined
    const end = "end" in value ? parseSentinelInstantValue(value.end) : undefined
    return {
      type: "between",
      start: start ?? { sentinel: "custom_date" },
      end: end ?? { sentinel: "custom_date" },
    }
  }
  return {
    type: "between",
    start: { sentinel: "custom_date" },
    end: { sentinel: "custom_date" },
  }
}
