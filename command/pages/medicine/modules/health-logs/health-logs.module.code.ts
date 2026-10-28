import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { dayStrOf } from "akasha/alan/harness/day-boundary/modules/day-string/day-string.computed-property-module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { entriesIn } from "akasha/page/modules/entries/page-entries.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  numberAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const DAY_PAGE_TYPE = "day"

const DAY_SLUG_PREFIX = "day-"

const SAMPLES = "health-samples"

const SESSIONS = "sessions"

const ENTRIES = "jsonl"

const ACTIVE_ENERGY = "activeEnergy"

const STEP_COUNT = "stepCount"

const WORN_KILOCALORIES = 100

const MONTHS = 3

const MS_PER_MINUTE = 60_000

const MINUTES_PER_HOUR = 60

const SLEEP = /^sleep$/i

const DEPRESSED_BELOW = 3

const IDEATION_BELOW = 0

export type DayActivity = { readonly activeEnergy: number; readonly steps: number }

export type DayHours = {
  readonly sleptMinutes: number
  readonly loggedMinutes: number
  readonly belowThreeMinutes: number
  readonly belowZeroMinutes: number
}

export type Logs = {
  readonly from: string
  readonly to: string
  readonly wornDays: number
  readonly activeEnergy: number | null
  readonly steps: number | null
  readonly sleptDays: number
  readonly sleepHours: number | null
  readonly loggedHours: number
  readonly shareBelowThree: number
  readonly shareBelowZero: number
}

export function openedBefore(to: string): string {
  const [year, month, day] = to.split("-").map(Number)
  return dayStrOf(new Date(Date.UTC(year ?? 0, (month ?? 1) - 1 - MONTHS, day ?? 1)))
}

function mostOf(bySource: ReadonlyMap<string, number>): number {
  return Math.max(0, ...bySource.values())
}

function added(into: Map<string, number>, source: string, value: number): undefined {
  into.set(source, (into.get(source) ?? 0) + value)
  return undefined
}

export function activityOf(samples: readonly Value[]): DayActivity {
  const energy = new Map<string, number>()
  const steps = new Map<string, number>()
  for (const one of samples) {
    const metric = textAt(one, "metric")
    const value = numberAt(one, "value")
    const source = textAt(one, "sourceName") ?? ""
    if (value === null) continue
    if (metric === ACTIVE_ENERGY) added(energy, source, value)
    if (metric === STEP_COUNT) added(steps, source, value)
  }
  return { activeEnergy: mostOf(energy), steps: mostOf(steps) }
}

function minutesOf(one: Value): number | null {
  const started = Date.parse(textAt(one, "startedAt") ?? "")
  const ended = Date.parse(textAt(one, "endedAt") ?? "")
  if (Number.isNaN(started) || Number.isNaN(ended) || ended <= started) return null
  return (ended - started) / MS_PER_MINUTE
}

export function hoursOf(sessions: readonly Value[]): DayHours {
  let sleptMinutes = 0
  let loggedMinutes = 0
  let belowThreeMinutes = 0
  let belowZeroMinutes = 0
  for (const one of sessions) {
    const minutes = minutesOf(one)
    if (minutes === null) continue
    if (SLEEP.test(textAt(one, "title") ?? "")) sleptMinutes += minutes
    const level = Number(textAt(one, "safetyLevel") ?? Number.NaN)
    if (Number.isNaN(level)) continue
    loggedMinutes += minutes
    if (level < DEPRESSED_BELOW) belowThreeMinutes += minutes
    if (level < IDEATION_BELOW) belowZeroMinutes += minutes
  }
  return { sleptMinutes, loggedMinutes, belowThreeMinutes, belowZeroMinutes }
}

function entriesBeside(root: string, page: string, slug: string): readonly Value[] {
  const at = besideAt(page, slug, ENTRIES)
  if (at === null || !existsSync(join(root, at))) return []
  const read = entriesIn(at, readFileSync(join(root, at), "utf8"))
  if ("refused" in read) throw new Error(read.refused)
  return read.entries
}

function meanOf(values: readonly number[]): number | null {
  return values.length === 0 ? null : values.reduce((sum, one) => sum + one, 0) / values.length
}

export function logsOf(
  from: string,
  to: string,
  activity: readonly DayActivity[],
  hours: readonly DayHours[]
): Logs {
  const worn = activity.filter((one) => one.activeEnergy >= WORN_KILOCALORIES)
  const slept = hours.filter((one) => one.sleptMinutes > 0)
  const logged = hours.reduce((sum, one) => sum + one.loggedMinutes, 0)
  const share = (key: "belowThreeMinutes" | "belowZeroMinutes"): number =>
    logged === 0 ? 0 : hours.reduce((sum, one) => sum + one[key], 0) / logged
  const sleep = meanOf(slept.map((one) => one.sleptMinutes))
  return {
    from,
    to,
    wornDays: worn.length,
    activeEnergy: meanOf(worn.map((one) => one.activeEnergy)),
    steps: meanOf(worn.map((one) => one.steps)),
    sleptDays: slept.length,
    sleepHours: sleep === null ? null : sleep / MINUTES_PER_HOUR,
    loggedHours: logged / MINUTES_PER_HOUR,
    shareBelowThree: share("belowThreeMinutes"),
    shareBelowZero: share("belowZeroMinutes"),
  }
}

export function logsIn(root: string, to: string): Logs {
  const from = openedBefore(to)
  const activity: DayActivity[] = []
  const hours: DayHours[] = []
  for (const one of valuesOfType(root, DAY_PAGE_TYPE)) {
    const slug = textAt(one.value, "slug") ?? ""
    const day = slug.startsWith(DAY_SLUG_PREFIX) ? slug.slice(DAY_SLUG_PREFIX.length) : ""
    if (day <= from || day > to) continue
    activity.push(activityOf(entriesBeside(root, one.path, SAMPLES)))
    hours.push(hoursOf(entriesBeside(root, one.path, SESSIONS)))
  }
  return logsOf(from, to, activity, hours)
}
