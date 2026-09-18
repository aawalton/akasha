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
import {
  type Tally,
  weekIn,
} from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import { fitnessWeek as page } from "akasha/command/pages/fitness/week/fitness-week.command.ts"

const NAME_WIDTH = 26

const COUNT_WIDTH = 3

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
  const held = weekIn(root, to, selectionPolicy.nearFailureRpeFloor)
  const tally = held.tally
  const from = held.from
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
