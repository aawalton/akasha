import { expect, test } from "bun:test"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { at } from "akasha/commands/arguments/pages/at.argument.ts"
import { day } from "akasha/commands/arguments/pages/day.argument.ts"
import { difficulty } from "akasha/commands/arguments/pages/difficulty.argument.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import { fromFile } from "akasha/commands/arguments/pages/from-file.argument.ts"
import { id } from "akasha/commands/arguments/pages/id.argument.ts"
import { last } from "akasha/commands/arguments/pages/last.argument.ts"
import { open } from "akasha/commands/arguments/pages/open.argument.ts"
import { relationship } from "akasha/commands/arguments/pages/relationship.argument.ts"
import { safety } from "akasha/commands/arguments/pages/safety.argument.ts"
import { title } from "akasha/commands/arguments/pages/title.argument.ts"
import { trackSessionFile } from "akasha/commands/pages/track/session/file/track-session-file.command.ts"
import { trackSessionOpen } from "akasha/commands/pages/track/session/open/track-session-open.command.ts"
import {
  addressed,
  anchoredIn,
  instantIn,
  levelsFor,
  type Row,
  sayingFor,
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

const NAMED = [at, day, difficulty, dryRun, fromFile, relationship, safety, title]

const OPENING = "akasha track session open"

const FILING = "akasha track session file"

test("the flag is one this command takes", () => {
  const argv = ["--title", "Held", "--relationship", "Jen"]
  const read = takenFor(argv, OPENING, trackSessionOpen, NAMED)
  expect("refused" in read ? read.refused : []).toEqual([])
  expect("taken" in read ? read.taken.relationship : []).toEqual(["Jen"])
})

test("a flag said with nothing after it is refused rather than read as naming nothing", () => {
  const ended = takenFor(["--title", "Held", "--relationship"], OPENING, trackSessionOpen, NAMED)
  expect("refused" in ended ? ended.refused : []).toEqual([
    "`--relationship` takes a value, and none follows it",
  ])
  const argv = ["--title", "Held", "--relationship", "--day", "2026-09-01"]
  const read = takenFor(argv, OPENING, trackSessionOpen, NAMED)
  expect("refused" in read ? read.refused : []).toEqual([
    "`--relationship` takes a value, and none follows it",
  ])
})

test("a flag said more than once is refused, and one that repeats gathers every saying", () => {
  const twice = takenFor(["--title", "one", "--title", "two"], OPENING, trackSessionOpen, NAMED)
  expect("refused" in twice ? twice.refused : []).toEqual([
    "`--title` is said twice, and one call says it once",
  ])
  const argv = ["--title", "Held", "--relationship", "one", "--relationship", "two"]
  const read = takenFor(argv, OPENING, trackSessionOpen, NAMED)
  expect("taken" in read ? read.taken.relationship : []).toEqual(["one", "two"])
})

test("a lone dash is a value, so standard input survives being read as one", () => {
  const read = takenFor(["--from-file", "-"], FILING, trackSessionFile, NAMED)
  expect("refused" in read ? read.refused : []).toEqual([])
  expect("taken" in read ? read.taken.fromFile : null).toBe("-")
})

test("a flag no value follows is refused, and what the command needs is still unsaid", () => {
  const alone = takenFor(["--title"], OPENING, trackSessionOpen, NAMED)
  expect("refused" in alone ? alone.refused : []).toEqual([
    "`--title` takes a value, and none follows it",
    "`akasha track session open` takes `--title`, and nothing said it",
  ])
  const argv = ["--title", "--day", "2026-09-01"]
  const read = takenFor(argv, OPENING, trackSessionOpen, NAMED)
  expect("refused" in read ? read.refused : []).toEqual([
    "`--title` takes a value, and none follows it",
    "`akasha track session open` takes `--title`, and nothing said it",
  ])
})

test("a bare time falls on the day named, and a time naming its own day is not moved", () => {
  expect(anchoredIn({ day: "2026-09-01" }, "09:00")).toBe("2026-09-01 09:00")
  expect(anchoredIn({ day: "2026-09-01" }, "2026-08-30 09:00")).toBe("2026-08-30 09:00")
  expect(anchoredIn({}, "09:00")).toBe("09:00")
})

test("a call naming no time acts now, and a time that reads as none acts at no instant", () => {
  expect(instantIn({}, undefined, NOW)).toBe(NOW.toISOString())
  expect(instantIn({}, "half past", NOW)).toBe(null)
})

test("a time that reads as none is refused in the words the clock refused it in", () => {
  expect(sayingFor({}, "half past", at.said, NOW)).toContain("is no time")
  expect(sayingFor({}, "2026-09-01 09:00", at.said, NOW)).toBe(`${at.said} takes a wall time`)
})

test("a level outside what it runs over is refused, and both levels are weighed at once", () => {
  const one = levelsFor({ safety: "9" }, "Wrote", null, [])
  expect(one).toEqual({ read: "refused", refusals: [expect.stringContaining("-2 to 5")] })
  const two = levelsFor({ difficulty: "9" }, "Wrote", null, [])
  expect(two).toEqual({ read: "refused", refusals: [expect.stringContaining("0 to 5")] })
  const both = levelsFor({ safety: "9", difficulty: "9" }, "Wrote", null, [])
  expect(both.read).toBe("refused")
  expect(both.read === "refused" ? both.refusals : []).toHaveLength(2)
})

test("a safety no call says is carried from the stretch acted on", () => {
  const carried = { ...(rowsOf()[1] as Row), safetyLevel: "3" }
  expect(levelsFor({}, "Wrote", carried, [])).toEqual({
    read: "levels",
    levels: { safetyLevel: "3" },
  })
})

test("a difficulty no call says is read from the activity the title names", () => {
  expect(
    levelsFor({}, "Walked the dog", null, [{ title: "Walked", defaultDifficulty: 2 }])
  ).toEqual({ read: "levels", levels: { difficultyLevel: "2" } })
})

test("a stretch is addressed by its id, by the open one, by the last ended, or by a time", () => {
  const rows = rowsOf()
  expect(addressed({ id: WROTE }, rows, NOW)).toBe(rows[1] as Row)
  expect(addressed({ open: true }, rows, NOW)).toBe(rows[2] as Row)
  expect(addressed({ last: true }, rows, NOW)).toBe(rows[1] as Row)
  expect(addressed({ day: "2026-09-01", at: "09:00" }, rows, NOW)).toBe(rows[1] as Row)
})

test("a call naming the stretch no way is refused naming all four ways", () => {
  const said = addressed({}, rowsOf(), NOW)
  expect(said).toContain(id.said)
  expect(said).toContain(at.said)
  expect(said).toContain(open.said)
  expect(said).toContain(last.said)
})

test("a way that names no stretch of this day is refused", () => {
  expect(addressed({ id: HELD }, rowsOf(), NOW)).toContain("carries the id")
  expect(addressed({ open: true }, rowsOf().slice(0, 2), NOW)).toBe(
    "this day carries no open stretch"
  )
  expect(addressed({ last: true }, rowsOf().slice(2), NOW)).toBe(
    "this day carries no stretch that has ended"
  )
  expect(addressed({ at: "2026-08-31 23:00" }, rowsOf(), NOW)).toBe(
    "no stretch of this day covers 2026-08-31 23:00"
  )
})

test("two ways said together are settled by precedence rather than refused, which is a gap", () => {
  const rows = rowsOf()
  expect(addressed({ id: WROTE, open: true }, rows, NOW)).toBe(rows[1] as Row)
  expect(addressed({ open: true, last: true }, rows, NOW)).toBe(rows[2] as Row)
})
