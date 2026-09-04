import { mergeUncommitted, uncommittedIn } from "@akasha/pages-system/page-uncommitted"

const LAST_VALUE = "lastValue"

const LAST_VALUE_AT = "lastValueAt"

export const STALE_AFTER_MS = 45 * 60_000

export type Reading = {
  readonly value: number
  readonly at: string
}

export function keepReading(root: string, page: string, value: number, at: Date): undefined {
  mergeUncommitted(root, page, { [LAST_VALUE]: value, [LAST_VALUE_AT]: at.toISOString() })
}

export function readingKept(root: string, page: string): Reading | null {
  const held = uncommittedIn(root, page)
  if (held === null) return null
  const value = held[LAST_VALUE]
  const at = held[LAST_VALUE_AT]
  if (value === undefined && at === undefined) return null
  if (typeof value !== "number" || typeof at !== "string") {
    throw new Error(
      `'${page}' stands beside a reading carrying only one of its two halves, so what it last ` +
        "read is unknown rather than nothing"
    )
  }
  return { value, at }
}

export function readingOn(values: Readonly<Record<string, unknown>>): Reading | null {
  const value = values[LAST_VALUE]
  const at = values[LAST_VALUE_AT]
  if (typeof value !== "number" || typeof at !== "string") return null
  return { value, at }
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
