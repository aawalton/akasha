import {
  type Logs,
  logsIn,
} from "akasha/command/pages/medicine/modules/health-logs/health-logs.module.code.ts"
import {
  conditionsIn,
  type Held,
  meatPerDayIn,
  onStimulantIn,
  parkinsonsIn,
  type Reading,
  readingsFor,
  SELF,
} from "akasha/command/pages/medicine/modules/mortality-readings/mortality-readings.module.code.ts"
import {
  valuedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  numberAt,
  recordsIn,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PER_HUNDRED_THOUSAND = 100_000

const LAST_AGE = 100

const Z_95 = 1.959964

const DRAWS = 4000

const SEED = 20_261_028

const LOW_SHARE = 0.1

const HIGH_SHARE = 0.9

const MID_SHARE = 0.5

const HALF = 0.5

const MS_PER_YEAR = 365.2425 * 86_400_000

const PERSON = "person"

const ALAN = "alan"

const CAUSE_PAGE_TYPE = "cause-of-death"

export type Band = { readonly start: number; readonly end: number; readonly rate: number }

export type Factor = {
  readonly factor: string
  readonly low: number
  readonly central: number
  readonly high: number
  readonly citation: string
}

export type Cause = {
  readonly slug: string
  readonly bands: readonly Band[]
  readonly factors: readonly Factor[]
}

export function causeOf(slug: string, value: Value): Cause {
  const bands = recordsIn(value.baselineRates).map((one) => ({
    start: numberAt(one, "ageBandStart") ?? Number.NaN,
    end: numberAt(one, "ageBandEnd") ?? Number.NaN,
    rate: numberAt(one, "deathsPerHundredThousand") ?? Number.NaN,
  }))
  const factors = recordsIn(value.riskFactors).map((one) => ({
    factor: textAt(one, "factor") ?? "",
    low: numberAt(one, "relativeRiskLow") ?? Number.NaN,
    central: numberAt(one, "relativeRiskCentral") ?? Number.NaN,
    high: numberAt(one, "relativeRiskHigh") ?? Number.NaN,
    citation: textAt(one, "citation") ?? "",
  }))
  return { slug, bands, factors }
}

export type Bound = {
  readonly key: string
  readonly reading: Reading
  readonly mu: number
  readonly sigma: number
}

function keyOf(factor: Factor): string {
  return `${factor.factor}|${factor.citation}`
}

function boundOf(cause: Cause, factor: Factor, reading: Reading, held: Held): Bound {
  const self = reading.condition !== undefined && held.conditions.get(reading.condition) === SELF
  const low = self ? Math.min(1, factor.central) : factor.low
  const high = self ? Math.max(1, factor.central) : factor.high
  if (!(low > 0 && high >= low)) {
    throw new Error(
      `\`${cause.slug}\` states a relative risk for ${factor.factor} that is no range`
    )
  }
  const mu = (Math.log(low) + Math.log(high)) / 2
  const sigma = (Math.log(high) - Math.log(low)) / (2 * Z_95)
  return { key: keyOf(factor), reading, mu, sigma }
}

export function boundsOf(
  cause: Cause,
  readings: ReadonlyMap<string, readonly Reading[]>,
  held: Held
): readonly Bound[] {
  const read = readings.get(cause.slug) ?? []
  if (read.length !== cause.factors.length) {
    throw new Error(
      `\`${cause.slug}\` states ${cause.factors.length} risk factor(s) and the readings know ${read.length}`
    )
  }
  return cause.factors.map((factor, index) => {
    const reading = read[index]
    if (reading === undefined || reading.factor !== factor.factor) {
      throw new Error(
        `\`${cause.slug}\` risk factor ${index} is ${factor.factor} and the readings expect ${reading?.factor ?? "none"}`
      )
    }
    return boundOf(cause, factor, reading, held)
  })
}

function seeded(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let mixed = state
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1)
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61)
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4_294_967_296
  }
}

function normalsOf(next: () => number, count: number): Float64Array {
  const drawn = new Float64Array(count)
  for (let index = 0; index < count; index += 1) {
    const uniform = Math.max(next(), Number.MIN_VALUE)
    drawn[index] = Math.sqrt(-2 * Math.log(uniform)) * Math.cos(2 * Math.PI * next())
  }
  return drawn
}

export type Draws = ReadonlyMap<string, Float64Array>

export function drawsFor(causes: readonly Cause[], count: number = DRAWS): Draws {
  const next = seeded(SEED)
  const keys = [...new Set(causes.flatMap((one) => one.factors.map(keyOf)))].sort()
  return new Map(keys.map((key) => [key, normalsOf(next, count)]))
}

export function rateAt(bands: readonly Band[], age: number): number {
  const band = bands.find((one) => age >= one.start && age <= one.end)
  return band === undefined ? 0 : band.rate / PER_HUNDRED_THOUSAND
}

type Running = {
  readonly causes: readonly Cause[]
  readonly bounds: readonly (readonly Bound[])[]
  readonly draws: Draws
  readonly held: Held
}

function multiplierOf(
  bounds: readonly Bound[],
  running: Running,
  draw: number,
  age: number
): number {
  let product = 1
  for (const one of bounds) {
    const normal = running.draws.get(one.key)?.[draw] ?? 0
    const dosed = Math.exp(one.mu + one.sigma * normal) ** one.reading.dose(running.held, age)
    const share = one.reading.share?.(running.held)
    product *= share === undefined ? dosed : 1 - share + share * dosed
  }
  return product
}

function hazardsOf(running: Running, draw: number, age: number): readonly number[] {
  return running.causes.map(
    (cause, index) =>
      rateAt(cause.bands, age) * multiplierOf(running.bounds[index] ?? [], running, draw, age)
  )
}

function added(into: Float64Array | undefined, at: number, share: number): undefined {
  if (into !== undefined) into[at] = (into[at] ?? 0) + share
  return undefined
}

export type Run = {
  readonly lifetime: readonly Float64Array[]
  readonly ages: readonly Float64Array[]
  readonly expectancy: Float64Array
  readonly aliveAtEnd: Float64Array
}

export function runOf(
  causes: readonly Cause[],
  readings: ReadonlyMap<string, readonly Reading[]>,
  held: Held,
  draws: Draws,
  count: number = DRAWS
): Run {
  const running: Running = {
    causes,
    bounds: causes.map((cause) => boundsOf(cause, readings, held)),
    draws,
    held,
  }
  const start = Math.floor(held.age)
  const span = LAST_AGE - start
  const lifetime = causes.map(() => new Float64Array(count))
  const ages = causes.map(() => new Float64Array(span))
  const expectancy = new Float64Array(count)
  const aliveAtEnd = new Float64Array(count)
  for (let draw = 0; draw < count; draw += 1) {
    let alive = 1
    let lived = 0
    for (let year = 0; year < span; year += 1) {
      const hazards = hazardsOf(running, draw, start + year)
      const total = hazards.reduce((sum, one) => sum + one, 0)
      const dying = total > 0 ? 1 - Math.exp(-total) : 0
      hazards.forEach((one, index) => {
        const share = total > 0 ? (alive * dying * one) / total : 0
        added(lifetime[index], draw, share)
        added(ages[index], year, share)
      })
      lived += alive * (1 - dying * HALF)
      alive *= 1 - dying
    }
    expectancy[draw] = start + lived
    aliveAtEnd[draw] = alive
  }
  return { lifetime, ages, expectancy, aliveAtEnd }
}

export function quantileOf(values: Float64Array, share: number): number {
  const sorted = Float64Array.from(values).sort()
  if (sorted.length === 0) return Number.NaN
  return sorted[Math.min(sorted.length - 1, Math.floor(share * (sorted.length - 1)))] ?? Number.NaN
}

export type Spread = { readonly low: number; readonly middle: number; readonly high: number }

export function spreadOf(values: Float64Array): Spread {
  return {
    low: quantileOf(values, LOW_SHARE),
    middle: quantileOf(values, MID_SHARE),
    high: quantileOf(values, HIGH_SHARE),
  }
}

function ageAt(weights: Float64Array, start: number, reach: number): number {
  let reached = 0
  for (let year = 0; year < weights.length; year += 1) {
    reached += weights[year] ?? 0
    if (reached >= reach) return start + year
  }
  return start + weights.length - 1
}

export function ageSpreadOf(weights: Float64Array, start: number): Spread | null {
  const total = weights.reduce((sum, one) => sum + one, 0)
  if (total <= 0) return null
  return {
    low: ageAt(weights, start, LOW_SHARE * total),
    middle: ageAt(weights, start, MID_SHARE * total),
    high: ageAt(weights, start, HIGH_SHARE * total),
  }
}

export function differenceOf(after: Float64Array, before: Float64Array): Float64Array {
  return after.map((one, index) => one - (before[index] ?? 0))
}

export function ageOn(birthDate: string, today: string): number {
  return (Date.parse(`${today}T12:00:00Z`) - Date.parse(`${birthDate}T12:00:00Z`)) / MS_PER_YEAR
}

export function causesIn(root: string): readonly Cause[] {
  return valuesOfType(root, CAUSE_PAGE_TYPE)
    .map((one) => causeOf(textAt(one.value, "slug") ?? one.path, one.value))
    .sort((a, b) => a.slug.localeCompare(b.slug))
}

export type Model = {
  readonly logs: Logs
  readonly held: Held
  readonly causes: readonly Cause[]
  readonly readings: ReadonlyMap<string, readonly Reading[]>
  readonly draws: Draws
}

export function modelIn(root: string, today: string): Model {
  const person = valuedAt(root, PERSON, ALAN).value
  const born = textAt(person, "birthDate")
  if (born === null) throw new Error("Alan's person page states no birth date")
  const logs = logsIn(root, today)
  const held: Held = {
    age: ageOn(born, today),
    steps: logs.steps,
    sleepHours: logs.sleepHours,
    meatPerDay: meatPerDayIn(person),
    shareBelowThree: logs.shareBelowThree,
    shareBelowZero: logs.shareBelowZero,
    onStimulant: onStimulantIn(person),
    conditions: conditionsIn(person),
    parkinsonsFirstDegree: parkinsonsIn(person),
  }
  const causes = causesIn(root)
  return { logs, held, causes, readings: readingsFor(held.age), draws: drawsFor(causes) }
}
