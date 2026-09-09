import { expect, test } from "bun:test"
import {
  DAYS_AT,
  FOOD_ENTRIES_AT,
  landTracking,
  outsideTracked,
  strayAmong,
  trackedIn,
} from "./track-landing.module.code.ts"

const ROOT = "/nowhere"

const AT = `${DAYS_AT}2026-09-01/day-2026-09-01.day.ts`

const FOOD_AT = `${FOOD_ENTRIES_AT}2026-08-22-banana/food-entry-2026-08-22-banana.food-entry.ts`

const ELSEWHERE = "alan/track/session-activities/pages/read.session-activity.ts"

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
