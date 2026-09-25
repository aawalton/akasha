import { describe, expect, test } from "bun:test"
import {
  kebabisedRow,
  valuesOfDeclared,
} from "akasha/page/modules/akasha-page-values/akasha-page-values.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

describe("the values an akasha page declares", () => {
  test("camel keys become kebab and every value is carried as text", () => {
    const values = valuesOfDeclared("x/day-2026-03-05.day.ts", {
      healthPoints: 2.2166,
      inboxTasksClearedToday: false,
      meals: ["one", "two"],
    })
    expect(values["health-points"]).toBe("2.2166")
    expect(values["inbox-tasks-cleared-today"]).toBe("false")
    expect(values["meals"]).toEqual(["one", "two"])
  })

  test("a body stating no slug and no page type takes both off its file name", () => {
    const values = valuesOfDeclared("x/day-2026-03-05.day.ts", { date: "2026-03-05" })
    expect(values["slug"]).toBe("day-2026-03-05")
    expect(values["page-type-slug"]).toBe("day")
  })

  test("a body stating them keeps what it states", () => {
    const values = valuesOfDeclared("x/day-2026-03-05.day.ts", {
      slug: "day-2026-03-05",
      type: `${pageType.slug}/day`,
    })
    expect(values["slug"]).toBe("day-2026-03-05")
    expect(values["page-type-slug"]).toBe("day")
  })

  test("a camel row is turned and a kebab row is left as it is", () => {
    expect(kebabisedRow({ startTime: "a", dailyTracking: "b" })).toEqual({
      "start-time": "a",
      "daily-tracking": "b",
    })
    expect(kebabisedRow({ "start-time": "a", id: "b" })).toEqual({ "start-time": "a", id: "b" })
  })

  test("a one-letter word in a camel key stays a word of the property's slug", () => {
    const values = valuesOfDeclared("x/x.check-code.ts", { namesAPropertyKey: true })
    expect(values["names-a-property-key"]).toBe("true")
    expect(kebabisedRow({ answersACheckoutRoot: true })).toEqual({
      "answers-a-checkout-root": true,
    })
  })
})
