import { expect, test } from "bun:test"
import {
  DAYS_AT,
  FOOD_ENTRIES_AT,
  landTracking,
  outsideTracked,
  strayAmong,
  trackedIn,
} from "akasha/alan/track/landing/track-landing.module.code.ts"
import type { Applied } from "akasha/commands/modules/applying/applying.module.code.ts"

const ROOT = "/nowhere"

const AT = `${DAYS_AT}2026-09-01/day-2026-09-01.day.ts`

const FOOD_AT = `${FOOD_ENTRIES_AT}2026-08-22-banana/food-entry-2026-08-22-banana.food-entry.ts`

const ELSEWHERE = "alan/track/probe-entries/pages/probe.probe-entry.ts"

test("a path under the tracked days is tracked", () => {
  expect(trackedIn(AT)).toBe(true)
})

test("a path under the food entries is tracked", () => {
  expect(trackedIn(FOOD_AT)).toBe(true)
})

test("a path elsewhere under Alan's tracking is not tracked", () => {
  expect(trackedIn(ELSEWHERE)).toBe(false)
})

test("no path is tracked", () => {
  expect(trackedIn(null)).toBe(false)
})

test("the refusal names every tree this lands under", () => {
  const said = outsideTracked(ELSEWHERE)
  expect(said).toContain(DAYS_AT)
  expect(said).toContain(FOOD_ENTRIES_AT)
})

test("only the stray paths of a change are named", () => {
  expect(strayAmong([AT, ELSEWHERE])).toEqual([outsideTracked(ELSEWHERE)])
})

test("a call composing nothing lands nothing", async () => {
  const said = await landTracking({ root: ROOT, changes: [], message: "held" })
  expect(said).toEqual({ refused: "nothing was composed to land" })
})

test("a stray path is refused before anything is written", async () => {
  const said = await landTracking({
    root: ROOT,
    changes: [{ path: ELSEWHERE, body: "held\n" }],
    message: "held",
  })
  expect(said).toEqual({ refused: outsideTracked(ELSEWHERE) })
})

const COMMIT = "1".repeat(40)

const LANDED: Applied = {
  base: "0".repeat(40),
  landed: [AT],
  formatted: [],
  said: [],
  wrong: ["the install stopped"],
  commit: COMMIT,
}

test("a landing that wrote before it went wrong says what it wrote in its refusal", async () => {
  const asked = { root: ROOT, changes: [{ path: AT, body: "held\n" }], message: "held" }
  const said = await landTracking(asked, [], () => Promise.resolve(LANDED))
  const why = `the install stopped\nlanded ${AT}\ncommitted as ${COMMIT}`
  expect(said).toEqual({ refused: why })
})

test("a landing that threw after it committed is refused naming that commit", async () => {
  const asked = { root: ROOT, changes: [{ path: AT, body: "held\n" }], message: "held" }
  const said = await landTracking(asked, [], (done) => {
    done.push(COMMIT)
    throw new Error("the work after that commit stopped")
  })
  expect("refused" in said && said.refused).toContain(COMMIT)
})
