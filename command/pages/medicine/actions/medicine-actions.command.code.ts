import { getMountainMorningDayStr } from "akasha/alan/harness/day-boundary/modules/mountain-day/mountain-day.module.code.ts"
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
import { medicineActions as page } from "akasha/command/pages/medicine/actions/medicine-actions.command.ts"
import {
  differenceOf,
  type Model,
  modelIn,
  type Run,
  runOf,
  type Spread,
  spreadOf,
} from "akasha/command/pages/medicine/modules/mortality-model/mortality-model.module.code.ts"
import {
  LEVERS,
  type Lever,
  UNMODELLED,
} from "akasha/command/pages/medicine/modules/mortality-readings/mortality-readings.module.code.ts"

const NAME_WIDTH = 28

const GAIN_WIDTH = 26

const PERCENT = 100

const TWO_PLACES = 2

const MOVED_FROM = 0.0005

export type Moved = { readonly cause: string; readonly points: number }

export type Acted = {
  readonly named: string
  readonly gain: Spread
  readonly moved: readonly Moved[]
}

function signed(one: number): string {
  return `${one >= 0 ? "+" : ""}${one.toFixed(TWO_PLACES)}`
}

export function gainOf(spread: Spread): string {
  return `${signed(spread.middle)}  (${signed(spread.low)} to ${signed(spread.high)})`
}

export function movedOf(moved: readonly Moved[]): string {
  if (moved.length === 0) return "moves no cause"
  return moved.map((one) => `${one.cause} ${signed(one.points * PERCENT)} pts`).join(", ")
}

export function rowOf(one: Acted): string {
  return `  ${one.named.padEnd(NAME_WIDTH)}${gainOf(one.gain).padEnd(GAIN_WIDTH)}${movedOf(one.moved)}`
}

const LAST_AGE = 100

const AGE_STEP = 5

function actsOn(model: Model, slug: string, lever: Lever): boolean {
  const next = lever.to(model.held)
  const read = model.readings.get(slug) ?? []
  for (let age = Math.floor(model.held.age); age < LAST_AGE; age += AGE_STEP) {
    for (const one of read) {
      if (one.dose(model.held, age) !== one.dose(next, age)) return true
      if (one.share?.(model.held) !== one.share?.(next)) return true
    }
  }
  return false
}

function actOf(model: Model, before: Run, lever: Lever): Acted {
  const after = runOf(model.causes, model.readings, lever.to(model.held), model.draws)
  const moved = model.causes
    .map((cause, index) => ({ cause, index }))
    .filter((one) => actsOn(model, one.cause.slug, lever))
    .map(({ cause, index }) => {
      const was = before.lifetime[index] ?? new Float64Array()
      const is = after.lifetime[index] ?? new Float64Array()
      return { cause: cause.slug, points: spreadOf(differenceOf(is, was)).middle }
    })
    .filter((one) => Math.abs(one.points) >= MOVED_FROM)
    .sort((a, b) => a.points - b.points)
  return {
    named: lever.named,
    gain: spreadOf(differenceOf(after.expectancy, before.expectancy)),
    moved,
  }
}

export function actedOf(model: Model): readonly Acted[] {
  const before = runOf(model.causes, model.readings, model.held, model.draws)
  return LEVERS.map((lever) => actOf(model, before, lever)).sort(
    (a, b) => b.gain.middle - a.gain.middle || a.named.localeCompare(b.named)
  )
}

function saidOf(acted: readonly Acted[]): readonly string[] {
  return [
    "actions, ranked by the years of life each adds, counted to 100",
    `  ${"action".padEnd(NAME_WIDTH)}${"years added".padEnd(GAIN_WIDTH)}change in the chance of dying of each cause`,
    ...acted.map(rowOf),
    "",
    "not modelled",
    ...UNMODELLED.map((one) => `  ${one}`),
    "",
    "every range is the 10th to the 90th percentile, over draws shared by every action",
  ]
}

export function medicineActions(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return mistaking(read.refused)
  try {
    const acted = actedOf(modelIn(given.root, getMountainMorningDayStr(new Date())))
    if (read.taken.json) return told([JSON.stringify({ acted, unmodelled: UNMODELLED })])
    return told([...saidOf(acted)])
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
