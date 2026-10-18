import { expect, test } from "bun:test"
import {
  CALORIES_TO_THE_POINT,
  constitutionIn,
  enduranceIn,
  GRAMS_TO_THE_POINT,
  gramsIn,
  POUNDS_TO_THE_POINT,
  strengthIn,
} from "akasha/alan/attribute/modules/points/attribute-points.computed-property-module.code.ts"
import type { Row } from "akasha/alan/harness/readout/modules/asking/readout-asking.module.code.ts"

const lifted = (figure: unknown) => ({ "strength-volume": figure })

const moved = (figure: unknown) => ({ "active-calories": figure })

const ate = (grams: unknown): Row => ({ values: { plantGrams: grams } })

test("the strength points are the pounds over the pounds one point costs", () => {
  expect(POUNDS_TO_THE_POINT).toBe(2204.62)
  expect(strengthIn(lifted(2204.62))).toBeCloseTo(1, 10)
  expect(strengthIn(lifted(2204.62 * 2))).toBeCloseTo(2, 10)
})

test("the endurance points are the calories over the calories one point costs", () => {
  expect(CALORIES_TO_THE_POINT).toBe(200)
  expect(enduranceIn(moved(200))).toBeCloseTo(1, 10)
  expect(enduranceIn(moved(200 * 2))).toBeCloseTo(2, 10)
})

test("a figure given as text is read as the number that text spells", () => {
  expect(strengthIn(lifted(String(2204.62)))).toBeCloseTo(1, 10)
  expect(enduranceIn(moved(String(200)))).toBeCloseTo(1, 10)
})

test("points of zero are points rather than absent ones", () => {
  expect(strengthIn(lifted(0))).toBe(0)
  expect(strengthIn(lifted("0"))).toBe(0)
  expect(enduranceIn(moved(0))).toBe(0)
  expect(enduranceIn(moved("0"))).toBe(0)
})

test("a day carrying no figure earns nothing rather than points of zero", () => {
  for (const figure of [null, undefined, "", "   ", "soon"]) {
    expect(strengthIn(lifted(figure))).toBeNull()
    expect(enduranceIn(moved(figure))).toBeNull()
  }
  expect(strengthIn({})).toBeNull()
  expect(enduranceIn({})).toBeNull()
})

test("the grams are every entry's grams added together", () => {
  expect(gramsIn([ate(30), ate(12), ate(8)])).toBe(50)
})

test("an entry whose grams spell no number adds nothing to the grams", () => {
  expect(gramsIn([ate(30), ate(""), ate("   "), ate("some")])).toBe(30)
})

test("a hundred grams of whole plants eaten is one point", () => {
  expect(GRAMS_TO_THE_POINT).toBe(100)
  expect(constitutionIn(100)).toBeCloseTo(1, 10)
  expect(constitutionIn(320)).toBeCloseTo(3.2, 10)
})
