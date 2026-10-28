import { getMountainMorningDayStr } from "akasha/alan/harness/day-boundary/modules/mountain-day/mountain-day.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { activity } from "akasha/command/argument/pages/activity.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { units } from "akasha/command/argument/pages/units.argument.ts"
import {
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { medicineActivity as page } from "akasha/command/pages/medicine/activity/medicine-activity.command.ts"
import {
  type Model,
  modelIn,
  normalsOf,
  runOf,
  type Spread,
  seeded,
  spreadOf,
} from "akasha/command/pages/medicine/modules/mortality-model/mortality-model.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  numberAt,
  recordsIn,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ACTIVITY_PAGE_TYPE = "risk-activity"

const MILLION = 1_000_000

const Z_95 = 1.959964

const SEED = 20_261_029

const MINUTES_PER_YEAR = 365.2425 * 24 * 60

export const HEALTHY_SHARE = 0.764

const NAME_WIDTH = 30

const UNIT_WIDTH = 46

const LABEL_WIDTH = 34

const PERCENT = 100

const ONE_PLACE = 1

const TWO_PLACES = 2

const TWO_FIGURES = 2

const TENS = 10

const TENTHS = 0.1

export type Injury = {
  readonly injury: string
  readonly perMillion: number
  readonly weight: number
  readonly years: number
}

export type Activity = {
  readonly slug: string
  readonly unit: string
  readonly low: number
  readonly central: number
  readonly high: number
  readonly assumption: string | null
  readonly injuries: readonly Injury[]
}

export function activityOf(slug: string, value: Value): Activity {
  return {
    slug,
    unit: textAt(value, "exposureUnit") ?? "",
    low: numberAt(value, "micromortsPerUnitLow") ?? Number.NaN,
    central: numberAt(value, "micromortsPerUnitCentral") ?? Number.NaN,
    high: numberAt(value, "micromortsPerUnitHigh") ?? Number.NaN,
    assumption: textAt(value, "exposureAssumption"),
    injuries: recordsIn(value.injuryDisability).map((one) => ({
      injury: textAt(one, "injury") ?? "",
      perMillion: numberAt(one, "injuriesPerMillionUnits") ?? Number.NaN,
      weight: numberAt(one, "disabilityWeight") ?? Number.NaN,
      years: numberAt(one, "disabilityYears") ?? Number.NaN,
    })),
  }
}

function activitiesIn(root: string): readonly Activity[] {
  return valuesOfType(root, ACTIVITY_PAGE_TYPE)
    .map((one) => activityOf(textAt(one.value, "slug") ?? one.path, one.value))
    .sort((a, b) => a.slug.localeCompare(b.slug))
}

function healthyYearsOf(model: Model): Float64Array {
  const run = runOf(model.causes, model.readings, model.held, model.draws)
  return run.expectancy.map((lived) => (lived - model.held.age) * HEALTHY_SHARE)
}

export function disabilityYearsOf(one: Activity): number {
  return one.injuries.reduce(
    (sum, injury) => sum + (injury.perMillion / MILLION) * injury.weight * injury.years,
    0
  )
}

export type Price = {
  readonly total: Spread
  readonly death: Spread
  readonly disability: Spread
}

export function priceOf(one: Activity, healthy: Float64Array, count: number): Price {
  if (!(one.low > 0 && one.high >= one.low)) {
    throw new Error(`\`${one.slug}\` states micromorts that are no range`)
  }
  const mu = (Math.log(one.low) + Math.log(one.high)) / 2
  const sigma = (Math.log(one.high) - Math.log(one.low)) / (2 * Z_95)
  const lost = disabilityYearsOf(one) * count
  const normals = normalsOf(seeded(SEED), healthy.length)
  const death = normals.map((normal) => Math.exp(mu + sigma * normal) * count)
  const disability = healthy.map((years) => (years > 0 ? (lost / years) * MILLION : Number.NaN))
  const total = death.map((dying, index) => dying + (disability[index] ?? 0))
  return { total: spreadOf(total), death: spreadOf(death), disability: spreadOf(disability) }
}

export function minutesOf(healthy: Float64Array): Spread {
  return spreadOf(healthy.map((years) => (years / MILLION) * MINUTES_PER_YEAR))
}

export function figureOf(one: number): string {
  if (!Number.isFinite(one)) return "none"
  if (one === 0) return "0"
  if (Math.abs(one) >= TENS) return one.toFixed(ONE_PLACE)
  if (Math.abs(one) >= TENTHS) return one.toFixed(TWO_PLACES)
  return one.toPrecision(TWO_FIGURES)
}

export function spreadSaid(spread: Spread): string {
  return `${figureOf(spread.middle)}  (${figureOf(spread.low)} to ${figureOf(spread.high)})`
}

export function unitsIn(said: string | undefined): number | null {
  if (said === undefined) return 1
  const count = Number(said)
  return Number.isFinite(count) && count > 0 ? count : null
}

function rowOf(one: Activity, price: Price): string {
  const unit = one.unit.slice(0, UNIT_WIDTH - 2).padEnd(UNIT_WIDTH)
  return `  ${one.slug.padEnd(NAME_WIDTH)}${unit}${spreadSaid(price.total)}`
}

function closingOf(minutes: Spread): readonly string[] {
  const share = (HEALTHY_SHARE * PERCENT).toFixed(ONE_PLACE)
  const at = (one: number): string => one.toFixed(ONE_PLACE)
  return [
    `one disability-adjusted micromort is ${at(minutes.middle)} minutes (${at(minutes.low)} to ${at(minutes.high)}) of Alan's healthy life`,
    `his healthy life is taken as ${share}% of his remaining life, a share derived rather than published`,
    "every range is the 10th to the 90th percentile",
  ]
}

export function pricedOf(one: Activity, price: Price, count: number): readonly string[] {
  return [
    `${one.slug}, ${figureOf(count)} × ${one.unit}`,
    `  ${"disability-adjusted micromorts".padEnd(LABEL_WIDTH)}${spreadSaid(price.total)}`,
    `  ${"  from death".padEnd(LABEL_WIDTH)}${spreadSaid(price.death)}`,
    `  ${"  from disability".padEnd(LABEL_WIDTH)}${spreadSaid(price.disability)}`,
    ...(one.assumption === null ? [] : ["", `assumed: ${one.assumption}`]),
  ]
}

function listedOf(
  activities: readonly Activity[],
  healthy: Float64Array
): readonly { readonly activity: Activity; readonly price: Price }[] {
  return activities
    .map((one) => ({ activity: one, price: priceOf(one, healthy, 1) }))
    .sort(
      (a, b) =>
        b.price.total.middle - a.price.total.middle ||
        a.activity.slug.localeCompare(b.activity.slug)
    )
}

function answerOf(slug: string | undefined, count: number, asJson: boolean, root: string): Answer {
  const activities = activitiesIn(root)
  const chosen = slug === undefined ? null : activities.find((one) => one.slug === slug)
  if (chosen === undefined) {
    const known = activities.map((one) => one.slug).join(", ")
    return refusedBy([`\`${slug ?? ""}\` is no risk activity; the risk activities are ${known}`])
  }
  const model = modelIn(root, getMountainMorningDayStr(new Date()))
  const healthy = healthyYearsOf(model)
  const minutes = minutesOf(healthy)
  const age = model.held.age
  if (chosen === null) {
    const listed = listedOf(activities, healthy)
    if (asJson) return told([JSON.stringify({ age, minutes, listed })])
    return told([
      `risk activities, ranked by the disability-adjusted micromorts one unit costs Alan at ${age.toFixed(ONE_PLACE)}`,
      `  ${"activity".padEnd(NAME_WIDTH)}${"one unit".padEnd(UNIT_WIDTH)}disability-adjusted micromorts`,
      ...listed.map((one) => rowOf(one.activity, one.price)),
      "",
      ...closingOf(minutes),
    ])
  }
  const price = priceOf(chosen, healthy, count)
  if (asJson) return told([JSON.stringify({ age, units: count, activity: chosen, price, minutes })])
  return told([...pricedOf(chosen, price, count), "", ...closingOf(minutes)])
}

export function medicineActivity(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [activity, units, json])
  if ("refused" in read) return mistaking(read.refused)
  const count = unitsIn(read.taken.units)
  if (count === null) {
    return refusedBy([`\`${read.taken.units ?? ""}\` is no number of units above zero`])
  }
  try {
    return answerOf(read.taken.activity, count, read.taken.json, given.root)
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
