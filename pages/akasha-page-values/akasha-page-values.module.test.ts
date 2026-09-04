import { describe, expect, test } from "bun:test"
import { isAkashaPage, kebabisedRow, valuesOfDeclared } from "./akasha-page-values.module.code.ts"

describe("the values an akasha page declares", () => {
  test("a `.ts` page is one and a `.md` page is not", () => {
    expect(isAkashaPage("akasha/alan/x/wake-day-2026-03-05.wake-day.ts")).toBe(true)
    expect(isAkashaPage("pages/daily-tracking/2026-03-05.daily-tracking.md")).toBe(false)
  })

  test("camel keys become kebab and every value is carried as text", () => {
    const values = valuesOfDeclared("x/wake-day-2026-03-05.wake-day.ts", {
      healthPoints: 2.2166,
      inboxTasksClearedToday: false,
      meals: ["one", "two"],
    })
    expect(values["health-points"]).toBe("2.2166")
    expect(values["inbox-tasks-cleared-today"]).toBe("false")
    expect(values["meals"]).toEqual(["one", "two"])
  })

  test("a body stating no slug and no page type takes both off its file name", () => {
    const values = valuesOfDeclared("x/wake-day-2026-03-05.wake-day.ts", { date: "2026-03-05" })
    expect(values["slug"]).toBe("wake-day-2026-03-05")
    expect(values["page-type-slug"]).toBe("wake-day")
  })

  test("a body stating them keeps what it states", () => {
    const values = valuesOfDeclared("x/wake-day-2026-03-05.wake-day.ts", {
      slug: "wake-day-2026-03-05",
      pageTypeSlug: "wake-day",
    })
    expect(values["slug"]).toBe("wake-day-2026-03-05")
    expect(values["page-type-slug"]).toBe("wake-day")
  })

  test("a camel row is turned and a kebab row is left as it stands", () => {
    expect(kebabisedRow({ startTime: "a", dailyTracking: "b" })).toEqual({
      "start-time": "a",
      "daily-tracking": "b",
    })
    expect(kebabisedRow({ "start-time": "a", id: "b" })).toEqual({ "start-time": "a", id: "b" })
  })
})
