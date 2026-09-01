import { askComposed } from "@shared/pages-query/ask"
import { getEsoDayStrOffset, getEsoDayWindow } from "@shared/recurrence/reset-times"

const MAX_DAY_SESSIONS = 200

export interface DayWindow {
  readonly from: string
  readonly to: string
}

export interface SleepBlockInput {
  readonly title: unknown
  readonly startTime: unknown
  readonly endTime: unknown
}

function isSleepTitle(title: unknown): boolean {
  return typeof title === "string" && title.trim().toLowerCase() === "sleep"
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

async function wakeInstantForDay(dayStr: string): Promise<Date> {
  const esoWindow = getEsoDayWindow(dayStr)
  const dailyAsked = await askComposed({
    "page-type": "daily-tracking",
    where: { date: { is: dayStr } },
    limit: 1,
  })
  if (!dailyAsked.ok) {
    throw new Error(`wakeInstantForDay: ${dailyAsked.why}`)
  }
  const daily = dailyAsked.answer.rows[0]
  if (daily === undefined) return esoWindow.start
  const dailyId = daily.values["id"]
  const sessionsAsked = await askComposed({
    "page-type": "session-tracking",
    where: { "daily-tracking": { is: dailyId } },
    "sort-by": "start-time",
    descending: false,
    limit: MAX_DAY_SESSIONS,
  })
  if (!sessionsAsked.ok) {
    throw new Error(`wakeInstantForDay: ${sessionsAsked.why}`)
  }
  const wake = wakeInstantFromBlocks(
    sessionsAsked.answer.rows.map((r) => ({
      title: r.values["title"],
      startTime: r.values["start-time"],
      endTime: r.values["end-time"],
    })),
    esoWindow
  )
  return wake ?? esoWindow.start
}

export async function getWakeDayWindow(dayStr: string): Promise<DayWindow> {
  const nextDayStr = getEsoDayStrOffset(getEsoDayWindow(dayStr).start, 1)
  const [from, to] = await Promise.all([wakeInstantForDay(dayStr), wakeInstantForDay(nextDayStr)])
  return { from: from.toISOString(), to: to.toISOString() }
}
