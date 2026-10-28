import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Activity,
  activityOf,
  disabilityYearsOf,
  figureOf,
  medicineActivity,
  minutesOf,
  pricedOf,
  priceOf,
  spreadSaid,
  unitsIn,
} from "akasha/command/pages/medicine/activity/medicine-activity.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha nowhere",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const HIKE: Activity = {
  slug: "hike",
  unit: "per day",
  low: 1,
  central: 2,
  high: 4,
  assumption: "the hike count is assumed",
  injuries: [{ injury: "fracture", perMillion: 100, weight: 0.05, years: 0.5 }],
}

test("an activity is read off its page's values", () => {
  const read = activityOf("hike", {
    exposureUnit: "per day",
    micromortsPerUnitLow: 1,
    micromortsPerUnitCentral: 2,
    micromortsPerUnitHigh: 4,
    injuryDisability: [
      {
        injury: "fracture",
        injuriesPerMillionUnits: 100,
        disabilityWeight: 0.05,
        disabilityYears: 0.5,
      },
    ],
  })
  expect(read.unit).toBe("per day")
  expect(read.assumption).toBeNull()
  expect(read.injuries).toHaveLength(1)
})

test("an injury costs its rate times its weight times its years", () => {
  expect(disabilityYearsOf(HIKE)).toBeCloseTo(100e-6 * 0.05 * 0.5, 12)
})

test("micromorts that are no range are refused", () => {
  expect(() => priceOf({ ...HIKE, low: 0 }, new Float64Array([30]), 1)).toThrow("no range")
})

test("a price is death plus disability, scaled by the units", () => {
  const healthy = new Float64Array(2000).fill(30)
  const one = priceOf(HIKE, healthy, 1)
  const ten = priceOf(HIKE, healthy, 10)
  expect(one.death.middle).toBeCloseTo(2, 0)
  expect(one.disability.middle).toBeCloseTo((100e-6 * 0.05 * 0.5 * 1e6) / 30, 6)
  expect(ten.death.middle).toBeCloseTo(one.death.middle * 10, 6)
  expect(one.total.middle).toBeGreaterThan(one.death.middle)
})

test("one disability-adjusted micromort of 30 healthy years is about 16 minutes", () => {
  expect(minutesOf(new Float64Array([30])).middle).toBeCloseTo(15.8, 1)
})

test("a figure keeps two figures however small it is", () => {
  expect(figureOf(12.345)).toBe("12.3")
  expect(figureOf(0.456)).toBe("0.46")
  expect(figureOf(0.000123)).toBe("0.00012")
  expect(figureOf(0)).toBe("0")
  expect(spreadSaid({ low: 1, middle: 2, high: 4 })).toBe("2.00  (1.00 to 4.00)")
})

test("units default to one and refuse what is no number above zero", () => {
  expect(unitsIn(undefined)).toBe(1)
  expect(unitsIn("2.5")).toBe(2.5)
  expect(unitsIn("0")).toBeNull()
  expect(unitsIn("many")).toBeNull()
})

test("a price says its parts and what its page assumes", () => {
  const spread = { low: 1, middle: 2, high: 3 }
  const said = pricedOf(HIKE, { total: spread, death: spread, disability: spread }, 1)
  expect(said[0]).toContain("hike")
  expect(said.some((line) => line.includes("from death"))).toBe(true)
  expect(said.at(-1)).toBe("assumed: the hike count is assumed")
})

test("a units value that is no number is refused", () => {
  const said = medicineActivity(["--units", "lots"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("lots")
})
