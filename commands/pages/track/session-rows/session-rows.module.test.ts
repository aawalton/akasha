import { expect, test } from "bun:test"
import {
  AT,
  addressed,
  anchoredIn,
  DAY,
  DIFFICULTY,
  FROM_FILE,
  ID,
  instantIn,
  LAST,
  levelsFor,
  OPEN,
  RELATIONSHIP,
  type Row,
  SAFETY,
  saidEachFor,
  saidFor,
  sayingFor,
  TITLE,
  VALUED,
} from "akasha/commands/pages/track/session-rows/session-rows.module.code.ts"

const NOW = new Date("2026-09-01T20:00:00.000Z")

const SLEPT = "01a06818-339b-7fc2-8cd9-caea195150b1"

const WROTE = "01a06818-339b-7fc2-8cd9-caea195150b2"

const WALKED = "01a06818-339b-7fc2-8cd9-caea195150b3"

const HELD = "01a06818-339b-7fc2-8cd9-caea195150b0"

function rowsOf(): Row[] {
  return [
    {
      id: SLEPT,
      title: "Slept",
      startTime: "2026-09-01T06:00:00.000Z",
      endTime: "2026-09-01T14:00:00.000Z",
      dailyTracking: HELD,
    },
    {
      id: WROTE,
      title: "Wrote",
      startTime: "2026-09-01T14:00:00.000Z",
      endTime: "2026-09-01T16:00:00.000Z",
      dailyTracking: HELD,
    },
    { id: WALKED, title: "Walked", startTime: "2026-09-01T16:00:00.000Z", dailyTracking: HELD },
  ]
}

test("the flag is one this command takes", () => {
  expect(VALUED).toContain(RELATIONSHIP)
})

test("a flag said with nothing after it names nothing", () => {
  expect(saidEachFor(["--relationship", "--json"], RELATIONSHIP)).toEqual([])
  expect(saidEachFor(["--relationship"], RELATIONSHIP)).toEqual([])
})

test("a flag said more than once is read at its first saying alone", () => {
  expect(saidFor([TITLE, "one", TITLE, "two"], TITLE)).toBe("one")
  expect(saidEachFor([RELATIONSHIP, "one", RELATIONSHIP, "two"], RELATIONSHIP)).toEqual([
    "one",
    "two",
  ])
})

test("a lone dash is a value, so standard input survives being read as one", () => {
  expect(saidFor([FROM_FILE, "-"], FROM_FILE)).toBe("-")
})

test("a flag no value follows names nothing", () => {
  expect(saidFor([TITLE], TITLE)).toBe(null)
  expect(saidFor([TITLE, DAY, "2026-09-01"], TITLE)).toBe(null)
})

test("a bare time falls on the day named, and a time naming its own day is not moved", () => {
  expect(anchoredIn([DAY, "2026-09-01"], "09:00")).toBe("2026-09-01 09:00")
  expect(anchoredIn([DAY, "2026-09-01"], "2026-08-30 09:00")).toBe("2026-08-30 09:00")
  expect(anchoredIn([], "09:00")).toBe("09:00")
})

test("a call naming no time acts now, and a time that reads as none acts at no instant", () => {
  expect(instantIn([], AT, NOW)).toBe(NOW.toISOString())
  expect(instantIn([AT, "half past"], AT, NOW)).toBe(null)
})

test("a time that reads as none is refused in the words the clock refused it in", () => {
  expect(sayingFor([AT, "half past"], AT, NOW)).toContain("is no time")
  expect(sayingFor([AT, "2026-09-01 09:00"], AT, NOW)).toBe(`${AT} takes a wall time`)
})

test("a level outside what it runs over is refused, and both levels are weighed at once", () => {
  const one = levelsFor([SAFETY, "9"], "Wrote", null, [])
  expect(one).toEqual({ read: "refused", refusals: [expect.stringContaining("-2 to 5")] })
  const two = levelsFor([DIFFICULTY, "9"], "Wrote", null, [])
  expect(two).toEqual({ read: "refused", refusals: [expect.stringContaining("0 to 5")] })
  const both = levelsFor([SAFETY, "9", DIFFICULTY, "9"], "Wrote", null, [])
  expect(both.read).toBe("refused")
  expect(both.read === "refused" ? both.refusals : []).toHaveLength(2)
})

test("a safety no call says is carried from the stretch acted on", () => {
  const carried = { ...(rowsOf()[1] as Row), safetyLevel: "3" }
  expect(levelsFor([], "Wrote", carried, [])).toEqual({
    read: "levels",
    levels: { safetyLevel: "3" },
  })
})

test("a difficulty no call says is read from the activity the title names", () => {
  expect(
    levelsFor([], "Walked the dog", null, [{ title: "Walked", defaultDifficulty: 2 }])
  ).toEqual({ read: "levels", levels: { difficultyLevel: "2" } })
})

test("a stretch is addressed by its id, by the open one, by the last ended, or by a time", () => {
  const rows = rowsOf()
  expect(addressed([ID, WROTE], rows, NOW)).toBe(rows[1] as Row)
  expect(addressed([OPEN], rows, NOW)).toBe(rows[2] as Row)
  expect(addressed([LAST], rows, NOW)).toBe(rows[1] as Row)
  expect(addressed([DAY, "2026-09-01", AT, "09:00"], rows, NOW)).toBe(rows[1] as Row)
})

test("a call naming the stretch no way is refused naming all four ways", () => {
  const said = addressed([], rowsOf(), NOW)
  expect(said).toContain(ID)
  expect(said).toContain(AT)
  expect(said).toContain(OPEN)
  expect(said).toContain(LAST)
})

test("a way that names no stretch of this day is refused", () => {
  expect(addressed([ID, HELD], rowsOf(), NOW)).toContain("carries the id")
  expect(addressed([OPEN], rowsOf().slice(0, 2), NOW)).toBe("this day carries no open stretch")
  expect(addressed([LAST], rowsOf().slice(2), NOW)).toBe(
    "this day carries no stretch that has ended"
  )
  expect(addressed([AT, "2026-08-31 23:00"], rowsOf(), NOW)).toBe(
    "no stretch of this day covers 2026-08-31 23:00"
  )
})

test("two ways said together are settled by precedence rather than refused, which is a gap", () => {
  const rows = rowsOf()
  expect(addressed([ID, WROTE, OPEN], rows, NOW)).toBe(rows[1] as Row)
  expect(addressed([OPEN, LAST], rows, NOW)).toBe(rows[2] as Row)
})
