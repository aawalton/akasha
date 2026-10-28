import { expect, test } from "bun:test"
import {
  ageSpreadOf,
  boundsOf,
  type Cause,
  drawsFor,
  rateAt,
  runOf,
  spreadOf,
} from "akasha/command/pages/medicine/modules/mortality-model/mortality-model.module.code.ts"
import {
  type Held,
  readingsFor,
} from "akasha/command/pages/medicine/modules/mortality-readings/mortality-readings.module.code.ts"

const HELD: Held = {
  age: 40.5,
  steps: 10_000,
  sleepHours: 8,
  meatPerDay: 1,
  shareBelowThree: 0.5,
  shareBelowZero: 0,
  onStimulant: true,
  conditions: new Map([["ADHD", "self"]]),
  parkinsonsFirstDegree: true,
}

const FLAT: Cause = {
  slug: "flat",
  bands: [{ start: 40, end: 120, rate: 1000 }],
  factors: [],
}

test("a rate is read from the band holding the age, and an age no band holds has none", () => {
  expect(rateAt(FLAT.bands, 50)).toBeCloseTo(0.01)
  expect(rateAt(FLAT.bands, 30)).toBe(0)
})

test("a risk factor the readings do not know is refused rather than guessed", () => {
  const stray: Cause = {
    ...FLAT,
    slug: "colorectal-cancer",
    factors: [{ factor: "stray", low: 1, central: 2, high: 3, citation: "a" }],
  }
  expect(() => boundsOf(stray, readingsFor(40), HELD)).toThrow("stray")
  expect(() => boundsOf({ ...stray, slug: "flat" }, readingsFor(40), HELD)).toThrow("flat")
})

test("a self-diagnosed condition ranges from no added risk to the source's central value", () => {
  const injury: Cause = {
    slug: "accidental-fall",
    bands: FLAT.bands,
    factors: [
      { factor: "ADHD", low: 1.71, central: 2.14, high: 2.68, citation: "a" },
      { factor: "ADHD medication", low: 0.66, central: 0.75, high: 0.86, citation: "b" },
    ],
  }
  const [adhd] = boundsOf(injury, readingsFor(40), HELD)
  expect(Math.exp(adhd?.mu ?? 0)).toBeCloseTo(Math.sqrt(2.14))
})

test("one flat cause takes everyone who does not live to 100", () => {
  const draws = drawsFor([FLAT], 10)
  const run = runOf([FLAT], readingsFor(40), HELD, draws, 10)
  const died = run.lifetime[0]?.[0] ?? 0
  expect(died + (run.aliveAtEnd[0] ?? 0)).toBeCloseTo(1)
  expect(run.expectancy[0] ?? 0).toBeGreaterThan(40)
})

test("a spread gives the 10th, 50th and 90th percentile", () => {
  const spread = spreadOf(Float64Array.from({ length: 11 }, (_, index) => index))
  expect(spread).toEqual({ low: 1, middle: 5, high: 9 })
})

test("an age spread with no weight is none", () => {
  expect(ageSpreadOf(new Float64Array(3), 40)).toBeNull()
  expect(ageSpreadOf(Float64Array.from([0, 1, 0]), 40)?.middle).toBe(41)
})
