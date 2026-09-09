import {
  type DayWindow,
  dayAfter,
  dayBefore,
  type Refused,
  spannedWindowIn,
} from "@akasha/health-samples-day/opening-window"
import { AKASHA, rootFor } from "@akasha/pages/checkout-roots"
import type { Roots } from "@akasha/pages/markdown-page-at"
import {
  getEsoDayStr,
  getEsoDayWindow,
} from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"

export function openedWindowOn(roots: Roots, dayStr: string): DayWindow | Refused {
  return spannedWindowIn(rootFor(roots, AKASHA), dayStr)
}

export function openedDayWindow(roots: Roots, dayStr: string): DayWindow {
  const spanned = openedWindowOn(roots, dayStr)
  if (!("refused" in spanned)) return spanned
  const window = getEsoDayWindow(dayStr)
  return { from: window.start.toISOString(), to: window.end.toISOString() }
}

export function openingInstantOn(roots: Roots, dayStr: string): string {
  return openedDayWindow(roots, dayStr).from
}

export function openingInstantAt(roots: Roots, at: number): string {
  return openingInstantOn(roots, getEsoDayStr(new Date(at)))
}

export function openedDayOf(roots: Roots, instant: Date): string {
  const day = getEsoDayStr(instant)
  const at = instant.getTime()
  if (at < Date.parse(openingInstantOn(roots, day))) return dayBefore(day)
  const next = dayAfter(day)
  return at >= Date.parse(openingInstantOn(roots, next)) ? next : day
}

export interface DayOpening {
  readonly instant: string
  readonly day: string
}

export function openedOn(roots: Roots, at: number): DayOpening {
  const day = openedDayOf(roots, new Date(at))
  return { instant: openingInstantOn(roots, day), day }
}
