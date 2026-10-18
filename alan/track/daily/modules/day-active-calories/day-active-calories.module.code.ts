import { dirname, join } from "node:path"
import {
  dayAfter,
  dayStrOf,
  MS_PER_DAY,
  NOON,
  parseDay,
} from "akasha/alan/harness/day-boundary/modules/day-string/day-string.computed-property-module.code.ts"
import { getEsoDayStr } from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.computed-property-module.code.ts"
import { sampleRowsIn } from "akasha/alan/harness/health-sample/access/modules/sample-selecting/sample-selecting.module.code.ts"
import { loadActiveCaloriesByDay } from "akasha/alan/harness/health-sample/day/modules/active-calories/active-calories.module.code.ts"
import { checkoutRoot } from "akasha/alan/track/daily/modules/day-place/day-place.module.code.ts"
import {
  type WriteOutcome,
  writeActiveCalories,
} from "akasha/alan/track/daily/modules/write-daily-points/write-daily-points.module.code.ts"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { leftWhereCodeMoved } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/code-moving/code-moving.module.code.ts"
import {
  type Following,
  followWithin,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/file-following/file-following.module.code.ts"

export async function rollupActiveCaloriesForDay(
  dayStr: string
): Promise<{ activeCalories: number | null; outcome: WriteOutcome | "unmeasured" }> {
  const read = await loadActiveCaloriesByDay({ dayStrs: [dayStr] })
  if (read.unread.length > 0) {
    process.stderr.write(`cardio: ${dayStr} has no recorded wake, so its span is not known\n`)
    return { activeCalories: null, outcome: "unmeasured" }
  }
  const activeCalories = read.byDay.get(dayStr) ?? null
  if (activeCalories === null) return { activeCalories: null, outcome: "unmeasured" }
  const outcome = await writeActiveCalories(dayStr, activeCalories)
  return { activeCalories, outcome }
}

const DAYS_ROLLED = 4

export function daysUpTo(dayStr: string, count: number): readonly string[] {
  const parsed = parseDay(dayStr)
  if (parsed === null) return [dayStr]
  const [y, m, d] = parsed
  const at = Date.UTC(y, m - 1, d, NOON, 0, 0, 0)
  const days: string[] = []
  for (let back = count - 1; back >= 0; back -= 1) {
    days.push(dayStrOf(new Date(at - back * MS_PER_DAY)))
  }
  return days
}

export const NOTHING_LANDED =
  "no day of the four carries a health sample the calories are counted from"

const NOTHING_LANDED_STATUS = 2

export async function rollDays(days: readonly string[]): Promise<readonly string[]> {
  const landed: string[] = []
  for (const day of days) {
    try {
      const rolled = await rollupActiveCaloriesForDay(day)
      if (rolled.activeCalories !== null) landed.push(`${day} ${rolled.outcome}`)
    } catch (thrown) {
      process.stderr.write(`the active calories for ${day} did not land: ${saidBy(thrown)}\n`)
    }
  }
  return landed
}

export async function runDayActiveCalories(): Promise<void> {
  const landed = await rollDays(daysUpTo(getEsoDayStr(new Date()), DAYS_ROLLED))
  if (landed.length === 0) throw new Error(NOTHING_LANDED)
  process.stdout.write(`active calories on ${landed.join(", ")}\n`)
}

export const SETTLE_MS = 5_000

const SAMPLES_OF_DAY = /\/day-(\d{4}-\d{2}-\d{2})\.day\.health-samples\.jsonl$/

export function dayOfSamples(at: string): string | null {
  return firstCapture(SAMPLES_OF_DAY.exec(at))
}

export function daysAround(dayStr: string, today: string): readonly string[] {
  return daysUpTo(dayAfter(dayStr), 3).filter((day) => day <= today)
}

export function daysTouchedBy(moved: readonly string[], today: string): readonly string[] {
  const days = new Set<string>()
  for (const at of moved) {
    const day = dayOfSamples(at)
    if (day === null) continue
    for (const one of daysAround(day, today)) days.add(one)
  }
  return [...days].sort()
}

export type Roll = (days: readonly string[]) => Promise<unknown>

export function followSamples(args: {
  readonly folder: string
  readonly today: () => string
  readonly roll: Roll
  readonly said: (message: string) => undefined
  readonly settleMs?: number
}): Following {
  const owed = new Set<string>()
  let rolling = false
  const drain = async (): Promise<undefined> => {
    if (rolling) return undefined
    rolling = true
    try {
      while (owed.size > 0) {
        const days = [...owed].sort()
        owed.clear()
        await args.roll(days)
      }
    } finally {
      rolling = false
    }
    return undefined
  }
  const ask = (days: readonly string[]): undefined => {
    for (const day of days) owed.add(day)
    drain().catch((thrown: unknown) => args.said(saidBy(thrown)))
    return undefined
  }
  const recent = (at: string): boolean => {
    const day = dayOfSamples(at)
    return day !== null && daysUpTo(args.today(), DAYS_ROLLED).includes(day)
  }
  ask(daysUpTo(args.today(), DAYS_ROLLED))
  return followWithin(
    new Set([args.folder]),
    recent,
    (moved) => ask(daysTouchedBy(moved, args.today())),
    args.settleMs ?? SETTLE_MS,
    undefined,
    1
  )
}

function sayOnTheConsole(message: string): undefined {
  process.stdout.write(`${message}\n`)
  return undefined
}

export function watchActiveCalories(): Following {
  const today = (): string => getEsoDayStr(new Date())
  const folder = join(checkoutRoot(), dirname(dirname(sampleRowsIn(today()))))
  return followSamples({
    folder,
    today,
    said: sayOnTheConsole,
    roll: async (days) => {
      leftWhereCodeMoved()
      const landed = await rollDays(days)
      if (landed.length > 0) sayOnTheConsole(`active calories on ${landed.join(", ")}`)
    },
  })
}

if (import.meta.main) {
  try {
    await runDayActiveCalories()
  } catch (thrown) {
    if (!(thrown instanceof Error) || thrown.message !== NOTHING_LANDED) throw thrown
    process.stderr.write(`${NOTHING_LANDED}\n`)
    process.exit(NOTHING_LANDED_STATUS)
  }
}
