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
import { medicineCauses as page } from "akasha/command/pages/medicine/causes/medicine-causes.command.ts"
import type { Logs } from "akasha/command/pages/medicine/modules/health-logs/health-logs.module.code.ts"
import {
  ageSpreadOf,
  type Model,
  modelIn,
  runOf,
  type Spread,
  spreadOf,
} from "akasha/command/pages/medicine/modules/mortality-model/mortality-model.module.code.ts"
import type { Held } from "akasha/command/pages/medicine/modules/mortality-readings/mortality-readings.module.code.ts"

const NAME_WIDTH = 36

const SHARE_WIDTH = 24

const PERCENT = 100

const ONE_PLACE = 1

const NO_PLACE = 0

const SHOWN_FROM = 0.0005

export type Ranked = {
  readonly cause: string
  readonly chance: Spread
  readonly age: Spread | null
}

export function percentOf(spread: Spread): string {
  const at = (one: number): string => (one * PERCENT).toFixed(ONE_PLACE)
  return `${at(spread.middle)}%  (${at(spread.low)} to ${at(spread.high)})`
}

export function agesOf(spread: Spread | null): string {
  if (spread === null) return ""
  const at = (one: number): string => one.toFixed(NO_PLACE)
  return `${at(spread.middle)}  (${at(spread.low)} to ${at(spread.high)})`
}

export function rowOf(one: Ranked): string {
  const chance = percentOf(one.chance).padEnd(SHARE_WIDTH)
  return `  ${one.cause.padEnd(NAME_WIDTH)}${chance}${agesOf(one.age)}`.trimEnd()
}

export type Ranking = {
  readonly ranked: readonly Ranked[]
  readonly expectancy: Spread
  readonly aliveAtEnd: Spread
}

export function rankedOf(model: Model): Ranking {
  const run = runOf(model.causes, model.readings, model.held, model.draws)
  const start = Math.floor(model.held.age)
  const ranked = model.causes
    .map((cause, index) => ({
      cause: cause.slug,
      chance: spreadOf(run.lifetime[index] ?? new Float64Array()),
      age: ageSpreadOf(run.ages[index] ?? new Float64Array(), start),
    }))
    .filter((one) => one.chance.high >= SHOWN_FROM)
    .sort((a, b) => b.chance.middle - a.chance.middle || a.cause.localeCompare(b.cause))
  return { ranked, expectancy: spreadOf(run.expectancy), aliveAtEnd: spreadOf(run.aliveAtEnd) }
}

function placed(one: number | null, places: number, unit: string): string {
  return one === null ? "none logged" : `${one.toFixed(places)}${unit}`
}

export function inputsOf(held: Held, logs: Logs): readonly string[] {
  const below = (share: number): string => `${(share * PERCENT).toFixed(ONE_PLACE)}%`
  return [
    `Alan at ${held.age.toFixed(ONE_PLACE)}, read from his pages and his logs after ${logs.from} through ${logs.to}`,
    `  steps a day ${placed(logs.steps, NO_PLACE, "")} over ${String(logs.wornDays)} watch-on days, sleep ${placed(logs.sleepHours, ONE_PLACE, " h")} over ${String(logs.sleptDays)} nights`,
    `  safety level below 3 for ${below(logs.shareBelowThree)} and below 0 for ${below(logs.shareBelowZero)} of ${logs.loggedHours.toFixed(NO_PLACE)} logged hours`,
  ]
}

function saidOf(model: Model): readonly string[] {
  const held = rankedOf(model)
  const life = held.expectancy
  return [
    ...inputsOf(model.held, model.logs),
    "",
    `  ${"cause".padEnd(NAME_WIDTH)}${"chance of dying of it".padEnd(SHARE_WIDTH)}age at that death`,
    ...held.ranked.map(rowOf),
    `  ${"alive at 100".padEnd(NAME_WIDTH)}${percentOf(held.aliveAtEnd)}`,
    "",
    `life expectancy, counted to 100: ${life.middle.toFixed(ONE_PLACE)} (${life.low.toFixed(ONE_PLACE)} to ${life.high.toFixed(ONE_PLACE)})`,
    "every range is the 10th to the 90th percentile",
  ]
}

export function medicineCauses(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return mistaking(read.refused)
  try {
    const model = modelIn(given.root, getMountainMorningDayStr(new Date()))
    if (read.taken.json) {
      return told([JSON.stringify({ age: model.held.age, logs: model.logs, ...rankedOf(model) })])
    }
    return told([...saidOf(model)])
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
