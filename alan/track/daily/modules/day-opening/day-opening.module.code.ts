import {
  getEsoDayStr,
  getEsoDayWindow,
} from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.module.code.ts"
import {
  type DayWindow,
  dayAfter,
  dayBefore,
  type Refused,
  openingInstantOn as recordedOpeningOn,
  spannedWindowIn,
} from "akasha/alan/harness/health-sample/day/modules/opening-window/opening-window.module.code.ts"
import { AKASHA, rootFor } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { Roots } from "akasha/page/modules/markdown-page-at/markdown-page-at.module.code.ts"

export function openedWindowOn(roots: Roots, dayStr: string): DayWindow | Refused {
  return spannedWindowIn(rootFor(roots, AKASHA), dayStr)
}

export function openedDayWindow(roots: Roots, dayStr: string): DayWindow {
  const spanned = openedWindowOn(roots, dayStr)
  if (!("refused" in spanned)) return spanned
  const window = getEsoDayWindow(dayStr)
  return { from: window.start.toISOString(), to: window.end.toISOString() }
}

function recordedOpeningAt(roots: Roots, dayStr: string): number | null {
  const opening = recordedOpeningOn(rootFor(roots, AKASHA), dayStr)
  return "refused" in opening ? null : opening.getTime()
}

export function openedDayOf(roots: Roots, instant: Date): string {
  const day = getEsoDayStr(instant)
  const at = instant.getTime()
  const opened = recordedOpeningAt(roots, day)
  if (opened !== null && at < opened) return dayBefore(day)
  const next = dayAfter(day)
  const opensNext = recordedOpeningAt(roots, next)
  return opensNext !== null && at >= opensNext ? next : day
}
