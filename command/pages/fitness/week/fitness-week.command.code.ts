import {
  dayStrOf,
  MS_PER_DAY,
  NOON,
  parseDay,
} from "akasha/alan/harness/day-boundary/modules/day-string/day-string.module.code.ts"
import { getMountainMorningDayStr } from "akasha/alan/harness/day-boundary/modules/mountain-day/mountain-day.module.code.ts"
import { selectionPolicy } from "akasha/alan/value/health/fitness/selection-policy/pages/selection-policy.selection-policy.ts"
import { movementPattern } from "akasha/alan/value/health/fitness/strength/exercise/properties/movement-pattern.select-property.ts"
import { primaryMuscles } from "akasha/alan/value/health/fitness/strength/exercise/properties/primary-muscles.select-property.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { fitnessWeek as page } from "akasha/command/pages/fitness/week/fitness-week.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  numberAt,
  slugAt,
  textAt,
  textsAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const MOVEMENT_TYPE = "strength-exercise"

const SET_TYPE = "strength-log"

const DAYS = 7

const NAME_WIDTH = 26

const COUNT_WIDTH = 3

const WARMUP = "isWarmup"

export type Movement = {
  readonly muscles: readonly string[]
  readonly pattern: string | null
}

export type Tally = {
  readonly muscles: ReadonlyMap<string, number>
  readonly patterns: ReadonlyMap<string, number>
  readonly counted: number
  readonly passed: number
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
      muscles: textsAt(one, "primaryMuscles") ?? [],
      pattern: textAt(one, "movementPattern"),
    })
  }
  return held
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
    const on = textAt(one, "setLogDate")
    if (on === null || on < from || on > to) continue
    const effort = numberAt(one, "rpe")
    const named = slugAt(one, "exercise")
    const movement = named === null ? undefined : movements.get(named)
    const near = effort !== null && effort >= nearFailure
    if (one[WARMUP] === true || !near || movement === undefined) {
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

export function sayingOf(took: number, low: number, high: number): string {
  if (took < low) return `owed ${String(low - took)}`
  if (took > high) return `over by ${String(took - high)}`
  return "met"
}

function rowOf(named: string, took: number, saying: string): string {
  return `  ${named.padEnd(NAME_WIDTH)}${String(took).padStart(COUNT_WIDTH)}  ${saying}`.trimEnd()
}

export function muscleRows(tally: Tally, low: number, high: number): readonly string[] {
  return [...primaryMuscles.values]
    .map((one) => ({ one, took: tally.muscles.get(one) ?? 0 }))
    .sort((a, b) => a.took - b.took || a.one.localeCompare(b.one))
    .map((held) => rowOf(held.one, held.took, sayingOf(held.took, low, high)))
}

export function patternRows(tally: Tally): readonly string[] {
  return [...movementPattern.values]
    .map((one) => ({ one, took: tally.patterns.get(one) ?? 0 }))
    .sort((a, b) => b.took - a.took || a.one.localeCompare(b.one))
    .map((held) => rowOf(held.one, held.took, ""))
}

export function saidOf(
  tally: Tally,
  from: string,
  to: string,
  low: number,
  high: number
): readonly string[] {
  return [
    `${from} to ${to} — ${String(tally.counted)} sets counted, ${String(tally.passed)} passed over`,
    "",
    `muscles, against a weekly floor of ${String(low)} and a ceiling of ${String(high)}`,
    ...muscleRows(tally, low, high),
    "",
    "patterns",
    ...patternRows(tally),
  ]
}

export function weekOf(root: string, to: string) {
  const movements = movementsIn(valuesOfType(root, MOVEMENT_TYPE).map((one) => one.value))
  const sets = valuesOfType(root, SET_TYPE).map((one) => one.value)
  const from = openedOn(to)
  const tally = tallyOf(sets, movements, from, to, selectionPolicy.nearFailureRpeFloor)
  return {
    from,
    to,
    counted: tally.counted,
    passed: tally.passed,
    weeklySetFloor: selectionPolicy.weeklySetFloor,
    weeklySetCeiling: selectionPolicy.weeklySetCeiling,
    muscles: Object.fromEntries(tally.muscles),
    patterns: Object.fromEntries(tally.patterns),
    said: saidOf(tally, from, to, selectionPolicy.weeklySetFloor, selectionPolicy.weeklySetCeiling),
  }
}

export function fitnessWeek(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return mistaking(read.refused)
  try {
    const held = weekOf(given.root, getMountainMorningDayStr(new Date()))
    if (read.taken.json) {
      const { said, ...data } = held
      return told([JSON.stringify(data)])
    }
    return told([...held.said])
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
