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

const REACHED: Reached[] = []

const LANDED = { ok: true as const, at: "reached-nothing" }

/**
 * The two landings this file watches, over the rest of the module as it really is.
 *
 * `mock.module` replaces a module for the whole test process, not for this file, so a stub
 * holding only these two names took every other export of `akasha-day` away from
 * `akasha-day.module.test.ts` when the two ran together. Spreading the real module first
 * leaves `rowsBeside` and its siblings standing.
 *
 * A second mock sat beside this one, over the markdown store's client, and it is gone with that
 * client. Nothing here needs to stub a store the funnel no longer reaches, and a mock of a module
 * that does not resolve is a mock nothing could ever call.
 */
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
    expect(dayOfName("wake-day-2026-03-05")).toBe("2026-03-05")
    expect(dayOfName("2026-03-05")).toBe("2026-03-05")
  })
})

describe("create, edit and delete agree on where a day is", () => {
  const day = "2026-03-05"

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

  test("a derived read is let through, because the derive reads where the day is kept", () => {
    expect(() => derivedDayIn(AKASHA, day)).not.toThrow()
  })
})

describe("what reaches the file layer", () => {
  test("a day nothing has heard of reaches the akasha half and never the old place", async () => {
    REACHED.length = 0
    await landDayPage("patch", UNNAMED_DAY, { date: UNNAMED_DAY }, "ops-tracking")
    await landSessionRow("write-row", UNNAMED_DAY, { id: "one" }, "ops-tracking")
    await landSessionRow("patch-row", UNNAMED_DAY, { id: "one" }, "ops-tracking")
    await dropSessionRow(UNNAMED_DAY, "one", "ops-tracking")
    const name = `wake-day-${UNNAMED_DAY}`
    expect(REACHED).toEqual([
      { verb: "landAkashaDayPage", act: "patch", pageType: "akasha", name },
      { verb: "landAkashaSessionRow", act: "write-row", pageType: "akasha", name },
      { verb: "landAkashaSessionRow", act: "patch-row", pageType: "akasha", name },
      { verb: "landAkashaSessionRow", act: "remove-row", pageType: "akasha", name },
    ])
  })

  /**
   * The old place is reached by nothing, which is the claim the markdown half being gone rests on.
   *
   * Naming the verbs rather than counting them is the point. This guarded a branch until the branch
   * went; it guards the absence of one now, and it would fire the day anyone puts a second road back
   * under these three calls without saying so here.
   */
  test("no day and no session row reaches any verb but the two akasha ones", async () => {
    REACHED.length = 0
    for (const day of ["2026-03-05", UNNAMED_DAY, UNNAMED_NEXT]) {
      await landDayPage("write", day, { date: day }, "ops-tracking")
      await landSessionRow("write-row", day, { id: "one" }, "ops-tracking")
      await dropSessionRow(day, "one", "ops-tracking")
    }
    expect(REACHED).toHaveLength(9)
    expect(REACHED.filter((one) => one.pageType === "akasha")).toHaveLength(9)
    for (const one of REACHED) {
      expect(["landAkashaDayPage", "landAkashaSessionRow"]).toContain(one.verb)
    }
  })
})

/**
 * A day's name goes out and comes back.
 *
 * This began as a guard that the migration's own prefix agreed with the name every reader asks
 * for. That prefix is gone: `convert.ts` was deleted once all 133 days had moved, and
 * `SLUG_PREFIX` went with it, so there is no second speller left to disagree with. What the
 * guard was for has been met by removing the thing it guarded against.
 *
 * What is still worth holding is the funnel's own arithmetic. `dayNameIn` spells a day for the
 * store and `dayOfName` takes the day back out of the name. A break in that pair says nothing
 * when it happens: a query for a name no page answers to comes back empty rather than refusing,
 * so Alan's tiles would read zero on a day he tracked and his points would be summed from
 * nothing. That silence is why this is a test rather than a comment.
 *
 * Days are sampled rather than taken from the corpus, so this states the rule instead of
 * measuring today's data, and keeps saying the same thing after the corpus has moved again.
 */
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
      expect(dayNameIn(AKASHA, day)).toBe(`wake-day-${day}`)
    }
  })
})
