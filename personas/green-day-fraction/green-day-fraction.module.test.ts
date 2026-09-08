import { describe, expect, test } from "bun:test"
import { greenDayPointsOf } from "./green-day-fraction.module.code.ts"

describe("greenDayPointsOf", () => {
  test("answers the figure a persona states", () => {
    expect(greenDayPointsOf({ slug: "a-persona", greenDayPoints: 7 })).toBe(7)
  })

  test("refuses a persona stating none", () => {
    expect(() => greenDayPointsOf({ slug: "a-persona" })).toThrow(/states no greenDayPoints/)
  })

  test("refuses a persona whose figure is null", () => {
    expect(() => greenDayPointsOf({ slug: "a-persona", greenDayPoints: null })).toThrow(
      /states no greenDayPoints/
    )
  })

  test("names the persona it refuses", () => {
    expect(() => greenDayPointsOf({ slug: "a-persona" })).toThrow(/a-persona/)
  })

  test("refuses a figure of zero rather than substituting one", () => {
    expect(() => greenDayPointsOf({ slug: "a-persona", greenDayPoints: 0 })).toThrow(
      /no day's points can be read against/
    )
  })

  test("refuses a figure below zero", () => {
    expect(() => greenDayPointsOf({ slug: "a-persona", greenDayPoints: -1 })).toThrow(
      /no day's points can be read against/
    )
  })

  test("refuses a figure that is not finite", () => {
    expect(() =>
      greenDayPointsOf({ slug: "a-persona", greenDayPoints: Number.POSITIVE_INFINITY })
    ).toThrow(/no day's points can be read against/)
  })
})
