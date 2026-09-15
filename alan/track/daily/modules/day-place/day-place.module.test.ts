import { describe, expect, mock, test } from "bun:test"
import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { firstCapture } from "akasha/util/narrow/modules/first-capture/first-capture.module.code.ts"

const HERE = import.meta.dir

const REPO = join(HERE, "..", "..", "..", "..")

const CORPUS = join(REPO, "pages", "daily-tracking")

const DAY_PAGE = /^(\d{4}-\d{2}-\d{2})\.daily-tracking\.md$/

interface Reached {
  readonly verb: string
  readonly act: string
  readonly pageType: string
  readonly name: string
}

const REACHED: Reached[] = []

const LANDED = { ok: true as const, at: "reached-nothing" }

const realAkashaDay = await import(
  "akasha/alan/track/daily/modules/akasha-day/akasha-day.module.code.ts"
)

mock.module("akasha/alan/track/daily/modules/akasha-day/akasha-day.module.code.ts", () => ({
  ...realAkashaDay,
  landAkashaDayPage: (act: string, name: string) => {
    REACHED.push({ verb: "landAkashaDayPage", act, pageType: "akasha", name })
    return Promise.resolve(LANDED)
  },
}))

const { AKASHA, DAILY_TRACKING, dayNameIn, dayNameOf, dayPageAt, dayPlaceOf, landDayPage } =
  await import("akasha/alan/track/daily/modules/day-place/day-place.module.code.ts")

function daysOnDisk(): readonly string[] {
  if (!existsSync(CORPUS)) return []
  const found: string[] = []
  for (const name of readdirSync(CORPUS)) {
    const day = firstCapture(DAY_PAGE.exec(name))
    if (day !== null) found.push(day)
  }
  return found.sort()
}

const UNNAMED_DAY = "2999-01-01"

const UNNAMED_NEXT = "2999-01-02"

describe("where a day is kept", () => {
  test("no day is left in markdown", () => {
    expect(daysOnDisk()).toEqual([])
  })

  test("every day goes to akasha, including one no list names", () => {
    const today = new Date().toISOString().slice(0, 10)
    for (const day of ["2026-03-05", "2026-09-01", "2026-09-02", today, UNNAMED_DAY]) {
      expect(dayPlaceOf(day)).toBe(AKASHA)
      expect(dayNameOf(day)).toBe(`day-${day}`)
    }
  })

  test("an akasha day is named with its date prefixed", () => {
    expect(dayNameIn(AKASHA, "2026-03-05")).toBe("day-2026-03-05")
  })
})

describe("create and edit agree on where a day is", () => {
  const day = "2026-03-05"

  test("akasha: one page type, one name, for every act, and the name is prefixed", () => {
    const name = `day-${day}`
    const acts = [dayPageAt(AKASHA, "patch", day), dayPageAt(AKASHA, "write", day)]
    for (const at of acts) {
      expect(at.place).toBe(AKASHA)
      expect(at.pageType).toBe(DAILY_TRACKING)
      expect(at.name).toBe(name)
    }
  })
})

describe("what reaches the file layer", () => {
  test("a day nothing has heard of reaches the akasha half and never the old place", async () => {
    REACHED.length = 0
    await landDayPage("patch", UNNAMED_DAY, { date: UNNAMED_DAY }, "tracking")
    const name = `day-${UNNAMED_DAY}`
    expect(REACHED).toEqual([{ verb: "landAkashaDayPage", act: "patch", pageType: "akasha", name }])
  })

  test("no day reaches any verb but the akasha one", async () => {
    REACHED.length = 0
    for (const day of ["2026-03-05", UNNAMED_DAY, UNNAMED_NEXT]) {
      await landDayPage("write", day, { date: day }, "tracking")
    }
    expect(REACHED).toHaveLength(3)
    expect(REACHED.filter((one) => one.pageType === "akasha")).toHaveLength(3)
    for (const one of REACHED) {
      expect(one.verb).toBe("landAkashaDayPage")
    }
  })
})

const DAYS: readonly string[] = ["2026-01-01", "2026-03-05", "2026-08-31", "2026-12-31"]

describe("the funnel's day names", () => {
  test("a day is spelled by the prefix and never by its bare date", () => {
    for (const day of DAYS) {
      expect(dayNameIn(AKASHA, day)).not.toBe(day)
      expect(dayNameIn(AKASHA, day)).toBe(`day-${day}`)
    }
  })
})
