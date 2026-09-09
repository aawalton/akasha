import { describe, expect, mock, test } from "bun:test"
import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"

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

const realAkashaDay = await import("../akasha-day/akasha-day.module.code.ts")

mock.module("../akasha-day/akasha-day.module.code.ts", () => ({
  ...realAkashaDay,
  landAkashaDayPage: (act: string, name: string) => {
    REACHED.push({ verb: "landAkashaDayPage", act, pageType: "akasha", name })
    return Promise.resolve(LANDED)
  },
  landAkashaSessionRow: (act: string, name: string) => {
    REACHED.push({ verb: "landAkashaSessionRow", act, pageType: "akasha", name })
    return Promise.resolve(LANDED)
  },
}))

const {
  AKASHA,
  DAILY_TRACKING,
  SESSION_TRACKING,
  dayNameIn,
  dayNameOf,
  dayOfName,
  dayPageAt,
  dayPlaceOf,
  derivedDayIn,
  dropSessionRow,
  landDayPage,
  landSessionRow,
  sessionRowAt,
} = await import("./day-place.module.code.ts")

function daysOnDisk(): readonly string[] {
  if (!existsSync(CORPUS)) return []
  const found: string[] = []
  for (const name of readdirSync(CORPUS)) {
    const day = DAY_PAGE.exec(name)
    if (day !== null) found.push(day[1] as string)
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

  test("an akasha day is named with its date prefixed, and the name reads back", () => {
    expect(dayNameIn(AKASHA, "2026-03-05")).toBe("day-2026-03-05")
    expect(dayOfName("day-2026-03-05")).toBe("2026-03-05")
    expect(dayOfName("2026-03-05")).toBe("2026-03-05")
  })
})

describe("create, edit and delete agree on where a day is", () => {
  const day = "2026-03-05"

  test("akasha: one page type, one name, for every act, and the name is prefixed", () => {
    const name = `day-${day}`
    const acts = [dayPageAt(AKASHA, "patch", day), dayPageAt(AKASHA, "write", day)]
    for (const at of acts) {
      expect(at.place).toBe(AKASHA)
      expect(at.pageType).toBe(DAILY_TRACKING)
      expect(at.name).toBe(name)
    }
    const rows = [
      sessionRowAt(AKASHA, "write-row", day),
      sessionRowAt(AKASHA, "patch-row", day),
      sessionRowAt(AKASHA, "remove-row", day),
    ]
    for (const at of rows) {
      expect(at.place).toBe(AKASHA)
      expect(at.pageType).toBe(SESSION_TRACKING)
      expect(at.name).toBe(name)
    }
  })

  test("a derived read is let through, because the derive reads where the day is kept", () => {
    expect(() => derivedDayIn(AKASHA, day)).not.toThrow()
  })
})

describe("what reaches the file layer", () => {
  test("a day nothing has heard of reaches the akasha half and never the old place", async () => {
    REACHED.length = 0
    await landDayPage("patch", UNNAMED_DAY, { date: UNNAMED_DAY }, "tracking")
    await landSessionRow("write-row", UNNAMED_DAY, { id: "one" }, "tracking")
    await landSessionRow("patch-row", UNNAMED_DAY, { id: "one" }, "tracking")
    await dropSessionRow(UNNAMED_DAY, "one", "tracking")
    const name = `day-${UNNAMED_DAY}`
    expect(REACHED).toEqual([
      { verb: "landAkashaDayPage", act: "patch", pageType: "akasha", name },
      { verb: "landAkashaSessionRow", act: "write-row", pageType: "akasha", name },
      { verb: "landAkashaSessionRow", act: "patch-row", pageType: "akasha", name },
      { verb: "landAkashaSessionRow", act: "remove-row", pageType: "akasha", name },
    ])
  })

  test("no day and no session row reaches any verb but the two akasha ones", async () => {
    REACHED.length = 0
    for (const day of ["2026-03-05", UNNAMED_DAY, UNNAMED_NEXT]) {
      await landDayPage("write", day, { date: day }, "tracking")
      await landSessionRow("write-row", day, { id: "one" }, "tracking")
      await dropSessionRow(day, "one", "tracking")
    }
    expect(REACHED).toHaveLength(9)
    expect(REACHED.filter((one) => one.pageType === "akasha")).toHaveLength(9)
    for (const one of REACHED) {
      expect(["landAkashaDayPage", "landAkashaSessionRow"]).toContain(one.verb)
    }
  })
})

const DAYS: readonly string[] = ["2026-01-01", "2026-03-05", "2026-08-31", "2026-12-31"]

describe("the funnel's day names", () => {
  test("the funnel takes back the day from the name it spelled", () => {
    for (const day of DAYS) {
      expect(dayOfName(dayNameIn(AKASHA, day))).toBe(day)
    }
  })

  test("a day is spelled by the prefix and never by its bare date", () => {
    for (const day of DAYS) {
      expect(dayNameIn(AKASHA, day)).not.toBe(day)
      expect(dayNameIn(AKASHA, day)).toBe(`day-${day}`)
    }
  })
})
