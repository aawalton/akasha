import { expect, test } from "bun:test"
import {
  decideWaitResume,
  WAIT_FIRST_MS,
  WAIT_MAX_MS,
  type WaitResumeInput,
  waitMs,
} from "./supervisor-wait-resume-decide.module.code.ts"

const NOW = 9_000_000

function asked(over: Partial<WaitResumeInput>): WaitResumeInput {
  return { deathDetected: true, consecutiveDeaths: 1, lastNudgeAtMs: null, now: NOW, ...over }
}

test("a turn that did not end in a death holds", () => {
  expect(decideWaitResume(asked({ deathDetected: false })).kind).toBe("hold")
})

test("a seat that died and was never nudged is nudged as the first attempt", () => {
  const said = decideWaitResume(asked({ lastNudgeAtMs: null, consecutiveDeaths: 7 }))
  expect(said).toMatchObject({ kind: "nudge", attempt: 1 })
})

test("the first two deaths wait the first wait", () => {
  expect(waitMs(1)).toBe(WAIT_FIRST_MS)
  expect(waitMs(2)).toBe(WAIT_FIRST_MS)
})

test("the wait doubles with each death past the second", () => {
  expect(waitMs(3)).toBe(WAIT_FIRST_MS * 2)
  expect(waitMs(4)).toBe(WAIT_FIRST_MS * 4)
})

test("the wait stops at the maximum wait however many deaths there have been", () => {
  expect(waitMs(1000)).toBe(WAIT_MAX_MS)
})

test("a death count that is no finite number is read as one", () => {
  expect(waitMs(Number.NaN)).toBe(WAIT_FIRST_MS)
  expect(waitMs(Number.POSITIVE_INFINITY)).toBe(WAIT_FIRST_MS)
})

test("a seat nudges again once its wait has passed", () => {
  const said = decideWaitResume(
    asked({ consecutiveDeaths: 3, lastNudgeAtMs: NOW - waitMs(3), now: NOW })
  )
  expect(said).toMatchObject({ kind: "nudge", attempt: 3 })
})

test("a seat inside its wait waits, and says when it is ready", () => {
  const lastNudgeAtMs = NOW - 1000
  const said = decideWaitResume(asked({ consecutiveDeaths: 3, lastNudgeAtMs, now: NOW }))
  expect(said.kind).toBe("wait")
  if (said.kind === "wait") expect(said.readyAtMs).toBe(lastNudgeAtMs + waitMs(3))
})
