import {
  dayStrOf,
  MS_PER_DAY,
  NOON,
  parseDay,
} from "akasha/alan/harness/day-boundary/modules/day-string/day-string.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  numberAt,
  slugAt,
  textAt,
  textsAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const MOVEMENT_TYPE = "strength-exercise"

export const SET_TYPE = "strength-log"

const DAYS = 7

const WARMUP = "isWarmup"

const DAY = "day-"

export type Movement = {
  readonly slug: string
  readonly title: string | null
  readonly muscles: readonly string[]
  readonly pattern: string | null
  readonly category: string | null
  readonly implement: string | null
  readonly scoring: string | null
  readonly sfr: number | null
}

export type Tally = {
  readonly muscles: ReadonlyMap<string, number>
  readonly patterns: ReadonlyMap<string, number>
  readonly counted: number
  readonly passed: number
}

export type TrainingWeek = {
  readonly from: string
  readonly to: string
  readonly tally: Tally
  readonly movements: ReadonlyMap<string, Movement>
  readonly sets: readonly Value[]
}

export function openedOn(last: string): string {
  const parsed = parseDay(last)
  if (parsed === null) return last
  const [year, month, day] = parsed
  const noon = Date.UTC(year, month - 1, day, NOON, 0, 0, 0)
  return dayStrOf(new Date(noon - (DAYS - 1) * MS_PER_DAY))
}

export function movementsIn(pages: readonly Value[]): ReadonlyMap<string, Movement> {
  const held = new Map<string, Movement>()
  for (const one of pages) {
    const slug = textAt(one, "slug")
    if (slug === null) continue
    held.set(slug, {
      slug,
      title: textAt(one, "title"),
      muscles: textsAt(one, "primaryMuscles") ?? [],
      pattern: textAt(one, "movementPattern"),
      category: textAt(one, "exerciseCategory"),
      implement: slugAt(one, "equipment"),
      scoring: textAt(one, "scoringMode"),
      sfr: numberAt(one, "sfrScore"),
    })
  }
  return held
}

export function dayOf(one: Value): string | null {
  const named = slugAt(one, "day")
  return named === null || !named.startsWith(DAY) ? null : named.slice(DAY.length)
}

export function nearFailureIn(one: Value, nearFailure: number): boolean {
  const effort = numberAt(one, "rpe")
  return one[WARMUP] !== true && effort !== null && effort >= nearFailure
}

export function tallyOf(
  sets: readonly Value[],
  movements: ReadonlyMap<string, Movement>,
  from: string,
  to: string,
  nearFailure: number
): Tally {
  const muscles = new Map<string, number>()
  const patterns = new Map<string, number>()
  let counted = 0
  let passed = 0
  for (const one of sets) {
    const on = dayOf(one)
    if (on === null || on < from || on > to) continue
    const named = slugAt(one, "exercise")
    const movement = named === null ? undefined : movements.get(named)
    if (!nearFailureIn(one, nearFailure) || movement === undefined) {
      passed += 1
      continue
    }
    counted += 1
    for (const muscle of movement.muscles) muscles.set(muscle, (muscles.get(muscle) ?? 0) + 1)
    const pattern = movement.pattern
    if (pattern !== null) patterns.set(pattern, (patterns.get(pattern) ?? 0) + 1)
  }
  return { muscles, patterns, counted, passed }
}

export function weekIn(root: string, to: string, nearFailure: number): TrainingWeek {
  const movements = movementsIn(valuesOfType(root, MOVEMENT_TYPE).map((one) => one.value))
  const sets = valuesOfType(root, SET_TYPE).map((one) => one.value)
  const from = openedOn(to)
  return { from, to, tally: tallyOf(sets, movements, from, to, nearFailure), movements, sets }
}
