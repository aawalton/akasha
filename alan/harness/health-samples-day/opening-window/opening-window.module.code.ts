import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  getEsoDayStr,
  getEsoDayWindow,
} from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import { instantsForMountainWall } from "akasha/alan/harness/day/mountain-wall/mountain-wall.module.code.ts"
import { akashaRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { entriesIn } from "akasha/pages/entries/page-entries.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

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

interface Span {
  readonly startMs: number
  readonly endMs: number
}

const DAY_PAGE_TYPE = "day"

const SESSIONS_SLUG = "sessions"

const ENTRY_EXTENSION = "jsonl"

const DAY_SLUG_PREFIX = "day-"

const SLEEP = "sleep"

const TITLE = "title"

const START_TIME = "startTime"

const END_TIME = "endTime"

const EVENING_HOUR = 18

function isSleepTitle(title: unknown): boolean {
  return typeof title === "string" && title.trim().toLowerCase() === SLEEP
}

export function dayBefore(dayStr: string): string {
  return getEsoDayStr(new Date(getEsoDayWindow(dayStr).start.getTime() - 1))
}

function eveningOf(dayStr: string): Date {
  const [year, month, at] = dayStr.split("-").map(Number)
  if (year === undefined || month === undefined || at === undefined) return new Date(Number.NaN)
  const found = instantsForMountainWall({
    year,
    month,
    day: at,
    hour: EVENING_HOUR,
    minute: 0,
    second: 0,
  })
  const struck = found[0]
  return struck === undefined ? new Date(Number.NaN) : new Date(struck)
}

function spanOf(block: SleepBlockInput): Span | null {
  if (!isSleepTitle(block.title)) return null
  if (typeof block.startTime !== "string" || typeof block.endTime !== "string") return null
  const startMs = Date.parse(block.startTime)
  const endMs = Date.parse(block.endTime)
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

export function openingInstantOn(root: string, dayStr: string): Date | Refused {
  const esoWindow = getEsoDayWindow(dayStr)
  if (esoWindow.start.getTime() === 0 || esoWindow.end.getTime() === 0) {
    return {
      refused: `'${dayStr}' is no day, so there is no evening to read a sleep block against`,
    }
  }
  const blocks = sleepBlocksOn(root, dayStr)
  if ("refused" in blocks) return blocks
  const opening = openingInstantFromBlocks(blocks, dayStr)
  if (opening === null) {
    return {
      refused:
        `${dayStr} holds ${blocks.length} stretch(es) of time and none titled ${SLEEP} starts or ` +
        "runs past six the evening before, so when the day opened is not recorded",
    }
  }
  return opening
}

export function openingWindowIn(root: string, dayStr: string): DayWindow | Refused {
  const from = openingInstantOn(root, dayStr)
  if ("refused" in from) return { refused: `${dayStr} has no window: ${from.refused}` }
  const to = openingInstantOn(root, dayAfter(dayStr))
  if ("refused" in to) {
    return {
      refused: `${dayStr} has no window: it closes when the next day opened, and ${to.refused}`,
    }
  }
  return { from: from.toISOString(), to: to.toISOString() }
}

function closingWithoutNext(dayStr: string, now: Date): Date {
  const closed = eveningOf(dayStr)
  const latest = eveningOf(dayAfter(dayStr))
  const at = now.getTime()
  return at > closed.getTime() && at < latest.getTime() ? now : closed
}

export function spannedWindowIn(
  root: string,
  dayStr: string,
  now: Date = new Date()
): DayWindow | Refused {
  const eso = getEsoDayWindow(dayStr)
  if (eso.start.getTime() === 0 || eso.end.getTime() === 0) {
    return { refused: `'${dayStr}' is no day, so no span can be counted over it` }
  }
  const opening = openingInstantOn(root, dayStr)
  const next = openingInstantOn(root, dayAfter(dayStr))
  return {
    from: ("refused" in opening ? eveningOf(dayBefore(dayStr)) : opening).toISOString(),
    to: ("refused" in next ? closingWithoutNext(dayStr, now) : next).toISOString(),
  }
}

export function spannedWindow(dayStr: string): DayWindow | Refused {
  return spannedWindowIn(akashaRoot(), dayStr)
}
