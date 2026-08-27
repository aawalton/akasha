import { assertNever } from "../../../utils-narrow/src/assert-never"
import { requireMatchPositional } from "../../../utils-narrow/src/require-match-positional"
import { z } from "zod"
import type { GroupGranularity } from "../schema/view-data"
import { getWeekStart, MONTH_NAMES, monthKeyOf } from "./calendar-grid"
import { formatSmartDate } from "./format-smart-date"

const DAY_RE = /^(\d{4})-(\d{2})-(\d{2})$/
const MONTH_RE = /^(\d{4})-(\d{2})$/
const DAY_CAPTURES = z.tuple([z.coerce.number(), z.coerce.number(), z.coerce.number()])
const MONTH_CAPTURES = z.tuple([z.coerce.number(), z.coerce.number()])

export function applyGranularityBucket(dayStr: string, granularity: GroupGranularity): string {
  switch (granularity) {
    case "none":
      return dayStr
    case "week":
      return getWeekStart(dayStr)
    case "month": {
      const mk = monthKeyOf(dayStr)
      return mk === "" ? dayStr : mk
    }
    case "year": {
      const mk = monthKeyOf(dayStr)
      return mk === "" ? dayStr : mk.slice(0, 4)
    }
    default:
      return assertNever(granularity)
  }
}

export function formatGranularityLabel(key: string, granularity: GroupGranularity): string {
  switch (granularity) {
    case "none":
      return formatSmartDate(key)
    case "week": {
      let caps: readonly [number, number, number]
      try {
        caps = requireMatchPositional(DAY_RE, DAY_CAPTURES, key)
      } catch {
        return key
      }
      const [year, month, day] = caps
      const monthName = MONTH_NAMES[month - 1]
      if (monthName === undefined) return key
      return `Week of ${monthName.slice(0, 3)} ${day}, ${year}`
    }
    case "month": {
      let caps: readonly [number, number]
      try {
        caps = requireMatchPositional(MONTH_RE, MONTH_CAPTURES, key)
      } catch {
        return key
      }
      const [year, month] = caps
      const monthName = MONTH_NAMES[month - 1]
      if (monthName === undefined) return key
      return `${monthName} ${year}`
    }
    case "year":
      return key
    default:
      return assertNever(granularity)
  }
}
