import { expect, test } from "bun:test"
import {
  DAYS_AT,
  FOOD_ENTRIES_AT,
  landTracking,
} from "akasha/alan/track/modules/landing/track-landing.module.code.ts"
import type { Applied } from "akasha/command/modules/applying/applying.module.code.ts"

const ROOT = "/nowhere"

const AT = `${DAYS_AT}2026-09-01/day-2026-09-01.day.ts`

const ELSEWHERE = "alan/track/probe-entries/pages/probe.probe-entry.ts"

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
  const why = "refused" in said ? said.refused : ""
  expect(why).toContain(ELSEWHERE)
  expect(why).toContain(DAYS_AT)
  expect(why).toContain(FOOD_ENTRIES_AT)
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
  const said = await landTracking(asked, [], (_root, _asked, _message, writing) => {
    writing?.done?.push(COMMIT)
    throw new Error("the work after that commit stopped")
  })
  expect("refused" in said && said.refused).toContain(COMMIT)
})
