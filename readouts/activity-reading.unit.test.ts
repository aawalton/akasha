import { describe, expect, it } from "bun:test"
import {
  activityFrom,
  caloriesBySource,
  MEASURES_QUERY,
  measuresFromAnswer,
} from "./activity-reading.ts"

const DAY = "2026-08-18"

function answerOf(rows: readonly { readonly values: Record<string, unknown> }[]) {
  return { n: rows.length, rows }
}

const carrying = [
  {
    values: {
      date: DAY,
      "active-calories": "120",
      "strength-volume": "2400",
      "nutrition-points": "465",
      "sleep-points": "375",
    },
  },
  {
    values: {
      date: "2026-08-19",
      "active-calories": "70",
      "strength-volume": "0",
      "nutrition-points": "200",
      "sleep-points": "270",
    },
  },
]

describe("measuresFromAnswer", () => {
  it("reads a day's measures off the kebab keys the files state", () => {
    expect(measuresFromAnswer(answerOf(carrying), DAY)).toEqual({
      activeCalories: 120,
      strengthVolume: 2400,
      nutritionPoints: 465,
      sleepHours: 6.25,
    })
  })

  it("gives null for a day the corpus does not hold", () => {
    expect(measuresFromAnswer(answerOf(carrying), "2099-01-01")).toBeNull()
  })

  it("refuses an empty corpus rather than drawing a blank day", () => {
    expect(() => measuresFromAnswer(answerOf([]), DAY)).toThrow(/no days at all/)
  })

  it("refuses a count that outruns the rows handed back", () => {
    expect(() => measuresFromAnswer({ n: 99, rows: carrying }, DAY)).toThrow(/counted 99/)
  })

  it("refuses a spelling no page uses, rather than reading null off every row", () => {
    const camel = [
      {
        values: {
          date: DAY,
          activeCalories: "120",
          strengthVolume: "2400",
          nutritionPoints: "465",
          sleepPoints: "375",
        },
      },
    ]
    expect(() => measuresFromAnswer(answerOf(camel), DAY)).toThrow(/active-calories/)
  })

  it("names the query it asked in every refusal", () => {
    expect(() => measuresFromAnswer(answerOf([]), DAY)).toThrow(new RegExp(MEASURES_QUERY))
  })
})

describe("activityFrom", () => {
  it("adds measured calories to strength volume over seven", () => {
    expect(
      activityFrom(120, {
        activeCalories: null,
        strengthVolume: 2400,
        nutritionPoints: null,
        sleepHours: null,
      })
    ).toBeCloseTo(120 + 2400 / 7)
  })

  it("falls back to the day's stated calories where nothing was measured", () => {
    expect(
      activityFrom(null, {
        activeCalories: 70,
        strengthVolume: null,
        nutritionPoints: null,
        sleepHours: null,
      })
    ).toBe(70)
  })

  it("gives null where the day is absent and nothing was measured", () => {
    expect(activityFrom(null, null)).toBeNull()
  })
})

describe("caloriesBySource", () => {
  it("takes the largest single source rather than summing overlapping ones", () => {
    expect(
      caloriesBySource([
        { sourceName: "watch", value: 60 },
        { sourceName: "watch", value: 40 },
        { sourceName: "phone", value: 70 },
      ])
    ).toBe(100)
  })
})
