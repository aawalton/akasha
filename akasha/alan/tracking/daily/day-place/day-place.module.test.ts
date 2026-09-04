import { describe, expect, mock, test } from "bun:test"
import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"

const HERE = import.meta.dir

const REPO = join(HERE, "..", "..", "..", "..", "..")

const CORPUS = join(REPO, "pages", "daily-tracking")

const DAY_PAGE = /^(\d{4}-\d{2}-\d{2})\.daily-tracking\.md$/

interface Reached {
  readonly verb: string
  readonly act: string
  readonly pageType: string
  readonly name: string
}

const reached: Reached[] = []

const landed = { ok: true as const, at: "reached-nothing" }

mock.module("@tools/lib/page-query-client", () => ({
  askComposed: () => Promise.resolve({ ok: true, rows: [], n: 0, unfound: [] }),
  askTaking: () => Promise.resolve({ ok: true, rows: [], n: 0, unfound: [] }),
  pageLanding: (act: string, pageType: string, name: string) => {
    reached.push({ verb: "pageLanding", act, pageType, name })
    return Promise.resolve(landed)
  },
  patchPage: (pageType: string, name: string) => {
    reached.push({ verb: "patchPage", act: "patch", pageType, name })
    return Promise.resolve(landed)
  },
  rowLanding: (act: string, pageType: string, name: string) => {
    reached.push({ verb: "rowLanding", act, pageType, name })
    return Promise.resolve(landed)
  },
  rowsLanding: (act: string, pageType: string, name: string) => {
    reached.push({ verb: "rowsLanding", act, pageType, name })
    return Promise.resolve(landed)
  },
  removeRow: (pageType: string, name: string) => {
    reached.push({ verb: "removeRow", act: "remove-row", pageType, name })
    return Promise.resolve(landed)
  },
}))

/**
 * The two landings this file watches, over the rest of the module as it really is.
 *
 * `mock.module` replaces a module for the whole test process, not for this file, so a stub
 * holding only these two names took every other export of `akasha-day` away from
 * `akasha-day.module.test.ts` when the two ran together. Spreading the real module first
 * leaves `rowsBeside` and its siblings standing.
 */
const realAkashaDay = await import("../akasha-day/akasha-day.module.code.ts")

mock.module("../akasha-day/akasha-day.module.code.ts", () => ({
  ...realAkashaDay,
  landAkashaDayPage: (act: string, name: string) => {
    reached.push({ verb: "landAkashaDayPage", act, pageType: "akasha", name })
    return Promise.resolve(landed)
  },
  landAkashaSessionRow: (act: string, name: string) => {
    reached.push({ verb: "landAkashaSessionRow", act, pageType: "akasha", name })
    return Promise.resolve(landed)
  },
}))

const {
  AKASHA,
  DAILY_TRACKING,
  MARKDOWN,
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

/**
 * The markdown days still on disk, which is none and stays none.
 *
 * The folder itself is gone once git has nothing left to keep in it, so a missing folder is the
 * same answer as an empty one. Throwing there would make this file red on a fresh checkout for the
 * one reason that is not a fault.
 */
function daysOnDisk(): readonly string[] {
  if (!existsSync(CORPUS)) return []
  const found: string[] = []
  for (const name of readdirSync(CORPUS)) {
    const day = DAY_PAGE.exec(name)
    if (day !== null) found.push(day[1] as string)
  }
  return found.sort()
}

/**
 * Days no writer has reached, standing for every day that is still to come.
 *
 * These are the shape of the fault this file now guards. `MIGRATED_DAYS` was a set naming the days
 * carried across, and a day it did not name was answered `markdown`. It named up to 2026-09-01 on
 * the day 2026-09-02 was being tracked, so Alan's live day was written to `pages/daily-tracking/`
 * after every day before it had moved, and the migration that would have carried it over had been
 * deleted as dead. Every test below that names a far-off day is asking the question that set got
 * wrong: not "is this day migrated" but "where does a day nobody has thought about go".
 */
const UNNAMED_DAY = "2999-01-01"

const UNNAMED_NEXT = "2999-01-02"

describe("where a day is kept", () => {
  test("no day is left in markdown", () => {
    expect(daysOnDisk()).toEqual([])
  })

  /**
   * A day is akasha whether or not anything here has heard of it.
   *
   * The day after the last one the funnel knew about is the case that was wrong, so it is named
   * first. The rest are a day Alan tracked, a day far past anything anyone will list, and the day
   * this test happens to run on — which is the one no constant can ever be edited in time for.
   */
  test("every day goes to akasha, including one no list names", () => {
    const today = new Date().toISOString().slice(0, 10)
    for (const day of ["2026-03-05", "2026-09-01", "2026-09-02", today, UNNAMED_DAY]) {
      expect(dayPlaceOf(day)).toBe(AKASHA)
      expect(dayNameOf(day)).toBe(`wake-day-${day}`)
    }
  })

  test("an akasha day is named with its date prefixed, and the name reads back", () => {
    expect(dayNameIn(AKASHA, "2026-03-05")).toBe("wake-day-2026-03-05")
    expect(dayNameIn(MARKDOWN, "2026-03-05")).toBe("2026-03-05")
    expect(dayOfName("wake-day-2026-03-05")).toBe("2026-03-05")
    expect(dayOfName("2026-03-05")).toBe("2026-03-05")
  })
})

describe("create, edit and delete agree on where a day is", () => {
  const day = "2026-03-05"

  test("markdown: one page type, one name, for every act", () => {
    const acts = [dayPageAt(MARKDOWN, "patch", day), dayPageAt(MARKDOWN, "write", day)]
    for (const at of acts) {
      expect(at.place).toBe(MARKDOWN)
      expect(at.pageType).toBe(DAILY_TRACKING)
      expect(at.name).toBe(day)
    }
    const rows = [
      sessionRowAt(MARKDOWN, "write-row", day),
      sessionRowAt(MARKDOWN, "patch-row", day),
      sessionRowAt(MARKDOWN, "remove-row", day),
    ]
    for (const at of rows) {
      expect(at.place).toBe(MARKDOWN)
      expect(at.pageType).toBe(SESSION_TRACKING)
      expect(at.name).toBe(day)
    }
  })

  test("akasha: one page type, one name, for every act, and the name is prefixed", () => {
    const name = `wake-day-${day}`
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

  test("a derived read is let through in both halves, because the derive reads both", () => {
    expect(() => derivedDayIn(MARKDOWN, day)).not.toThrow()
    expect(() => derivedDayIn(AKASHA, day)).not.toThrow()
  })
})

describe("what reaches the file layer", () => {
  test("a day nothing has heard of reaches the akasha half and never the old place", async () => {
    reached.length = 0
    await landDayPage("patch", UNNAMED_DAY, { date: UNNAMED_DAY }, "ops-tracking")
    await landSessionRow("write-row", UNNAMED_DAY, { id: "one" }, "ops-tracking")
    await landSessionRow("patch-row", UNNAMED_DAY, { id: "one" }, "ops-tracking")
    await dropSessionRow(UNNAMED_DAY, "one", "ops-tracking")
    const name = `wake-day-${UNNAMED_DAY}`
    expect(reached).toEqual([
      { verb: "landAkashaDayPage", act: "patch", pageType: "akasha", name },
      { verb: "landAkashaSessionRow", act: "write-row", pageType: "akasha", name },
      { verb: "landAkashaSessionRow", act: "patch-row", pageType: "akasha", name },
      { verb: "landAkashaSessionRow", act: "remove-row", pageType: "akasha", name },
    ])
  })

  /**
   * The old place is reached by nothing, which is the claim the markdown half being gone rests on.
   *
   * Naming the verbs rather than counting them is the point: a write that slipped through to
   * `pageLanding` would land a `.daily-tracking.md` file that no reader of Alan's days now looks
   * at, and it would look like a successful write from every side.
   */
  test("no day and no session row reaches the markdown verbs", async () => {
    reached.length = 0
    for (const day of ["2026-03-05", UNNAMED_DAY, UNNAMED_NEXT]) {
      await landDayPage("write", day, { date: day }, "ops-tracking")
      await landSessionRow("write-row", day, { id: "one" }, "ops-tracking")
      await dropSessionRow(day, "one", "ops-tracking")
    }
    expect(reached).toHaveLength(9)
    expect(reached.filter((one) => one.pageType === "akasha")).toHaveLength(9)
    for (const one of reached) {
      expect(["landAkashaDayPage", "landAkashaSessionRow"]).toContain(one.verb)
    }
  })
})
