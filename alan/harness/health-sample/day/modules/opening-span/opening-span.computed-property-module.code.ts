import {
  getEsoDayStr,
  getEsoDayWindow,
} from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.computed-property-module.code.ts"
import { denverInstantMs } from "akasha/alan/harness/day-boundary/modules/us-zone-offset/us-zone-offset.computed-property-module.code.ts"

export interface DayWindow {
  readonly from: string
  readonly to: string
}

export interface SleepBlockInput {
  readonly title: unknown
  readonly startedAt: unknown
  readonly endedAt: unknown
}

interface Span {
  readonly startMs: number
  readonly endMs: number
}

const SLEEP = "sleep"

const EVENING_HOUR = 18

function isSleepTitle(title: unknown): boolean {
  return typeof title === "string" && title.trim().toLowerCase() === SLEEP
}

export function dayBefore(dayStr: string): string {
  return getEsoDayStr(new Date(getEsoDayWindow(dayStr).start.getTime() - 1))
}

export function dayAfter(dayStr: string): string {
  return getEsoDayStr(getEsoDayWindow(dayStr).end)
}

function eveningOf(dayStr: string): Date {
  const [year, month, at] = dayStr.split("-").map(Number)
  if (year === undefined || month === undefined || at === undefined) return new Date(Number.NaN)
  const struck = denverInstantMs(Date.UTC(year, month - 1, at, EVENING_HOUR, 0, 0, 0))
  return struck === null ? new Date(Number.NaN) : new Date(struck)
}

function spanOf(block: SleepBlockInput): Span | null {
  if (!isSleepTitle(block.title)) return null
  if (typeof block.startedAt !== "string" || typeof block.endedAt !== "string") return null
  const startMs = Date.parse(block.startedAt)
  const endMs = Date.parse(block.endedAt)
  if (Number.isNaN(startMs) || Number.isNaN(endMs)) return null
  if (endMs <= startMs) return null
  return { startMs, endMs }
}

export function openingInstantFromBlocks(
  blocks: readonly SleepBlockInput[],
  dayStr: string
): Date | null {
  const afterMs = eveningOf(dayBefore(dayStr)).getTime()
  const beforeMs = eveningOf(dayStr).getTime()
  let first: Span | null = null
  for (const block of blocks) {
    const span = spanOf(block)
    if (span === null) continue
    if (span.endMs <= afterMs || span.startMs >= beforeMs) continue
    if (first === null || span.startMs < first.startMs) first = span
  }
  return first === null ? null : new Date(first.startMs)
}

export function esoWindowOf(dayStr: string): { readonly start: Date; readonly end: Date } | null {
  try {
    return getEsoDayWindow(dayStr)
  } catch {
    return null
  }
}

export function windowSpanned(
  dayStr: string,
  opening: Date | null,
  nextOpening: Date | null
): DayWindow | null {
  const eso = esoWindowOf(dayStr)
  if (eso === null) return null
  return {
    from: (opening ?? eso.start).toISOString(),
    to: (nextOpening ?? eso.end).toISOString(),
  }
}
