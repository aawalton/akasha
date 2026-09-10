import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"

const LAST_VALUE = "lastValue"

const LAST_VALUE_AT = "lastValueAt"

const LAST_VALUE_FALLS_PER_HOUR = "lastValueFallsPerHour"

export const STALE_AFTER_MS = 45 * 60_000

export const NOT_FALLING = 0

export type Reading = {
  readonly value: number
  readonly at: string
  readonly fallsPerHour: number
}

export function fallsPerHourOn(values: Readonly<Record<string, unknown>>): number {
  const falls = values[LAST_VALUE_FALLS_PER_HOUR]
  return typeof falls === "number" && Number.isFinite(falls) ? falls : NOT_FALLING
}

export function keepReading(
  root: string,
  page: string,
  value: number,
  at: Date,
  fallsPerHour?: number
): undefined {
  mergeUncommitted(root, page, {
    [LAST_VALUE]: value,
    [LAST_VALUE_AT]: at.toISOString(),
    ...(fallsPerHour === undefined ? {} : { [LAST_VALUE_FALLS_PER_HOUR]: fallsPerHour }),
  })
}

export function readingKept(root: string, page: string): Reading | null {
  const held = uncommittedIn(root, page)
  if (held === null) return null
  const value = held[LAST_VALUE]
  const at = held[LAST_VALUE_AT]
  if (value === undefined && at === undefined) return null
  if (typeof value !== "number" || typeof at !== "string") {
    throw new Error(
      `'${page}' sits beside a reading carrying only one of its two halves, so what it last ` +
        "read is unknown rather than nothing"
    )
  }
  return { value, at, fallsPerHour: fallsPerHourOn(held) }
}

export function readingOn(values: Readonly<Record<string, unknown>>): Reading | null {
  const value = values[LAST_VALUE]
  const at = values[LAST_VALUE_AT]
  if (typeof value !== "number" || typeof at !== "string") return null
  return { value, at, fallsPerHour: fallsPerHourOn(values) }
}

export function readingAged(kept: Reading, now: Date): number {
  const took = Date.parse(kept.at)
  if (Number.isNaN(took)) {
    throw new Error(
      `'${kept.at}' is no moment, so how long ago the reading was taken cannot be worked out`
    )
  }
  return now.getTime() - took
}
