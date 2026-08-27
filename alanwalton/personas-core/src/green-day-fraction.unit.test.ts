import { describe, expect, it } from "bun:test"
import type { ReadonlyJSONValue } from "@shared/pages-core/schema/pages"
import type { PropertyDefinition } from "@shared/pages-core/types"
import {
  computeGreenDayFraction,
  GREEN_DAY_FRACTION_FIELD,
  GREEN_DAY_POINTS_FIELD,
  POINTS_FIELD,
} from "./green-day-fraction"

const POINTS_DEF: PropertyDefinition = {
  id: POINTS_FIELD,
  title: "Points",
  type: "formula",
  config: { expression: "sleepPoints + sourcePoints", returnType: "number" },
}

const GDF_FORMULA_DEF: PropertyDefinition = {
  id: GREEN_DAY_FRACTION_FIELD,
  title: "Green Day Fraction",
  type: "formula",
  config: {
    expression: "(greenDayPoints > 0) && (points / greenDayPoints) || 0",
    returnType: "number",
  },
}

const DEFS: readonly PropertyDefinition[] = [POINTS_DEF, GDF_FORMULA_DEF]

function attrs(record: Record<string, ReadonlyJSONValue>): Record<string, ReadonlyJSONValue> {
  return record
}

describe("computeGreenDayFraction", () => {
  it("divides the resolved (formula) points by the persona's greenDayPoints", () => {
    const value = computeGreenDayFraction(
      attrs({ sleepPoints: 700, sourcePoints: 300, [GREEN_DAY_POINTS_FIELD]: 10_000 }),
      DEFS
    )
    expect(value).toBeCloseTo(0.1, 10)
  })

  it("mirrors the greenDayFraction formula exactly (matches resolver over the formula def)", () => {
    const attributes = attrs({
      sleepPoints: 4200,
      sourcePoints: 800,
      [GREEN_DAY_POINTS_FIELD]: 10_000,
    })
    expect(computeGreenDayFraction(attributes, DEFS)).toBeCloseTo(0.5, 10)
  })

  it("returns 0 when greenDayPoints is zero (guards the divisor)", () => {
    expect(
      computeGreenDayFraction(attrs({ sourcePoints: 500, [GREEN_DAY_POINTS_FIELD]: 0 }), DEFS)
    ).toBe(0)
  })

  it("returns 0 when greenDayPoints is negative (mis-set page)", () => {
    expect(
      computeGreenDayFraction(attrs({ sourcePoints: 500, [GREEN_DAY_POINTS_FIELD]: -100 }), DEFS)
    ).toBe(0)
  })

  it("returns 0 when greenDayPoints is absent", () => {
    expect(computeGreenDayFraction(attrs({ sourcePoints: 500 }), DEFS)).toBe(0)
  })

  it("returns 0 when points resolves to zero", () => {
    expect(
      computeGreenDayFraction(
        attrs({ sleepPoints: 0, sourcePoints: 0, [GREEN_DAY_POINTS_FIELD]: 10_000 }),
        DEFS
      )
    ).toBe(0)
  })

  it("preserves a negative points ratio (formula keeps negative, does not floor)", () => {
    const value = computeGreenDayFraction(
      attrs({ sleepPoints: -500, sourcePoints: 0, [GREEN_DAY_POINTS_FIELD]: 10_000 }),
      DEFS
    )
    expect(value).toBeCloseTo(-0.05, 10)
  })

  it("returns 0 when the points formula is absent (no points def, no stored points)", () => {
    expect(
      computeGreenDayFraction(attrs({ [GREEN_DAY_POINTS_FIELD]: 10_000 }), [GDF_FORMULA_DEF])
    ).toBe(0)
  })

  it("reads a STORED points number when points is not a formula (post-hypothetical-flip safety)", () => {
    expect(
      computeGreenDayFraction(attrs({ points: 2500, [GREEN_DAY_POINTS_FIELD]: 10_000 }), [])
    ).toBeCloseTo(0.25, 10)
  })

  it("returns 0 when points is a formula-error sentinel (bad expression)", () => {
    const brokenPointsDef: PropertyDefinition = {
      id: POINTS_FIELD,
      title: "Points",
      type: "formula",
      config: { expression: "sleepPoints + (", returnType: "number" },
    }
    expect(
      computeGreenDayFraction(attrs({ sleepPoints: 700, [GREEN_DAY_POINTS_FIELD]: 10_000 }), [
        brokenPointsDef,
      ])
    ).toBe(0)
  })
})
