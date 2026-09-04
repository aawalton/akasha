import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { getEsoDayStr, getEsoDayWindow } from "@akasha/day/eso-day"
import { listedAt } from "@akasha/indexes"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { entriesIn } from "@akasha/pages-system/page-entries"
import { besideAt } from "@akasha/pages-system/page-file-name"

export interface DayWindow {
  readonly from: string
  readonly to: string
}

export interface Refused {
  readonly refused: string
}

export interface SleepBlockInput {
  readonly title: unknown
  readonly startTime: unknown
  readonly endTime: unknown
}

export const DAY_PAGE_TYPE = "wake-day"

export const SESSIONS_SLUG = "sessions"

const ENTRY_EXTENSION = "jsonl"

const DAY_SLUG_PREFIX = "wake-day-"

const SLEEP = "sleep"

const TITLE = "title"

const START_TIME = "startTime"

const END_TIME = "endTime"

function isSleepTitle(title: unknown): boolean {
  return typeof title === "string" && title.trim().toLowerCase() === SLEEP
}

export function wakeInstantFromBlocks(
  blocks: readonly SleepBlockInput[],
  esoWindow: { readonly start: Date; readonly end: Date }
): Date | null {
  const startMs = esoWindow.start.getTime()
  const endMs = esoWindow.end.getTime()
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

export function sleepBlocksOn(root: string, dayStr: string): readonly SleepBlockInput[] | Refused {
  const slug = `${DAY_SLUG_PREFIX}${dayStr}`
  const listed = listedAt(root, DAY_PAGE_TYPE, slug)
  const page = listed.length === 1 ? listed[0]?.path : undefined
  if (page === undefined) {
    return {
      refused:
        `the index names ${listed.length} \`${DAY_PAGE_TYPE}\` page under '${slug}' and a day ` +
        "is one page",
    }
  }
  const at = besideAt(page, SESSIONS_SLUG, ENTRY_EXTENSION)
  if (at === null) return { refused: `'${page}' is no page file, so nothing sits beside it` }
  if (!existsSync(join(root, at))) {
    return {
      refused: `'${at}' is where ${dayStr} would keep its stretches of time and nothing is there`,
    }
  }
  const read = entriesIn(at, readFileSync(join(root, at), "utf8"))
  if ("refused" in read) return read
  return read.entries.map((one) => ({
    title: one[TITLE],
    startTime: one[START_TIME],
    endTime: one[END_TIME],
  }))
}

export function dayAfter(dayStr: string): string {
  return getEsoDayStr(getEsoDayWindow(dayStr).end)
}

export function wakeInstantOn(root: string, dayStr: string): Date | Refused {
  const esoWindow = getEsoDayWindow(dayStr)
  if (esoWindow.start.getTime() === 0 || esoWindow.end.getTime() === 0) {
    return {
      refused: `'${dayStr}' is no day, so there is no ESO day to read a sleep block against`,
    }
  }
  const blocks = sleepBlocksOn(root, dayStr)
  if ("refused" in blocks) return blocks
  const woke = wakeInstantFromBlocks(blocks, esoWindow)
  if (woke === null) {
    return {
      refused:
        `${dayStr} holds ${blocks.length} stretch(es) of time and none titled ${SLEEP} ends ` +
        "inside its ESO day, so when Alan woke is not recorded",
    }
  }
  return woke
}

export function wakeDayWindowIn(root: string, dayStr: string): DayWindow | Refused {
  const from = wakeInstantOn(root, dayStr)
  if ("refused" in from) return { refused: `${dayStr} has no window: ${from.refused}` }
  const to = wakeInstantOn(root, dayAfter(dayStr))
  if ("refused" in to) {
    return { refused: `${dayStr} has no window: it closes when Alan next woke, and ${to.refused}` }
  }
  return { from: from.toISOString(), to: to.toISOString() }
}

export function getWakeDayWindow(dayStr: string): DayWindow | Refused {
  return wakeDayWindowIn(akashaRoot(), dayStr)
}

export function spannedFromDayBoundaryIn(root: string, dayStr: string): boolean {
  return "refused" in wakeDayWindowIn(root, dayStr)
}

export function spannedFromDayBoundary(dayStr: string): boolean {
  return spannedFromDayBoundaryIn(akashaRoot(), dayStr)
}
