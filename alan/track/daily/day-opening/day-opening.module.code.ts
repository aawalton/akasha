import { getEsoDayStr, getEsoDayWindow } from "@akasha/day/eso-day"
import { isSleepTitle } from "@akasha/health-samples-day/opening-window"
import type { Roots } from "@akasha/pages/markdown-page-at"

export const DAY_PAGE_TYPE = "day"

export interface SleepBlock {
  readonly title: unknown
  readonly startTime: unknown
  readonly endTime: unknown
}

export function openingInstantFromBlocks(
  blocks: readonly SleepBlock[],
  window: { readonly start: Date; readonly end: Date }
): Date | null {
  const startMs = window.start.getTime()
  const endMs = window.end.getTime()
  let earliest: number | null = null
  for (const block of blocks) {
    if (!isSleepTitle(block.title)) continue
    if (typeof block.startTime !== "string" || typeof block.endTime !== "string") continue
    const blockStartMs = Date.parse(block.startTime)
    const blockEndMs = Date.parse(block.endTime)
    if (Number.isNaN(blockStartMs) || Number.isNaN(blockEndMs)) continue
    if (blockEndMs <= blockStartMs) continue
    if (blockEndMs < startMs || blockEndMs >= endMs) continue
    if (earliest === null || blockEndMs < earliest) earliest = blockEndMs
  }
  return earliest === null ? null : new Date(earliest)
}

export function sleepBlocksOn(_roots: Roots, _dayStr: string): readonly SleepBlock[] {
  return []
}

export function openingInstantOn(roots: Roots, dayStr: string): string {
  const window = getEsoDayWindow(dayStr)
  const woke = openingInstantFromBlocks(sleepBlocksOn(roots, dayStr), window)
  return (woke ?? window.start).toISOString()
}

export function openingInstantAt(roots: Roots, at: number): string {
  return openingInstantOn(roots, getEsoDayStr(new Date(at)))
}

export function dayAfter(dayStr: string): string {
  return getEsoDayStr(getEsoDayWindow(dayStr).end)
}

export function dayBefore(dayStr: string): string {
  return getEsoDayStr(new Date(getEsoDayWindow(dayStr).start.getTime() - 1))
}

export function openedDayOf(roots: Roots, instant: Date): string {
  const day = getEsoDayStr(instant)
  const at = instant.getTime()
  if (at < Date.parse(openingInstantOn(roots, day))) return dayBefore(day)
  const next = dayAfter(day)
  return at >= Date.parse(openingInstantOn(roots, next)) ? next : day
}

export function openedDayWindow(
  roots: Roots,
  dayStr: string
): { readonly from: string; readonly to: string } {
  return { from: openingInstantOn(roots, dayStr), to: openingInstantOn(roots, dayAfter(dayStr)) }
}

export interface DayOpening {
  readonly instant: string
  readonly day: string
}

export function openedOn(roots: Roots, at: number): DayOpening {
  const day = openedDayOf(roots, new Date(at))
  return { instant: openingInstantOn(roots, day), day }
}
