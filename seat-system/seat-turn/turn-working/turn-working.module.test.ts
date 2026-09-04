import { expect, test } from "bun:test"
import {
  anyWorking,
  anyWorkingRead,
  keptWorkingIn,
  lastAnswerIn,
  workingLines,
  workingOf,
} from "./turn-working.module.code.ts"

const ENDED = '{"type":"assistant","message":{"stop_reason":"end_turn"}}'

const MIDWAY = '{"type":"assistant","message":{"stop_reason":"tool_use"}}'

const ASKED = '{"type":"user","message":{"role":"user"}}'

test("a seat is working where its last answer did not end the turn", () => {
  expect(anyWorking({ activeTurn: true })).toBe(true)
  expect(anyWorking({ activeTurn: false })).toBe(false)
})

test("unread is not off", () => {
  expect(anyWorkingRead({})).toBe(false)
  expect(anyWorking({})).toBe(false)
  expect(anyWorkingRead({ activeTurn: false })).toBe(true)
})

test("an answer ending the turn is told from one part way through", () => {
  expect(lastAnswerIn(ENDED, true)?.stopReason).toBe("end_turn")
  expect(lastAnswerIn(MIDWAY, true)?.stopReason).toBe("tool_use")
})

test("the last answer is the one read, whatever came before it", () => {
  expect(lastAnswerIn(`${ENDED}\n${ASKED}\n${MIDWAY}`, true)?.stopReason).toBe("tool_use")
  expect(lastAnswerIn(`${MIDWAY}\n${ENDED}`, true)?.stopReason).toBe("end_turn")
})

test("a stretch holding no answer is unread rather than idle", () => {
  expect(lastAnswerIn(`${ASKED}\n{"type":"system"}`, true)).toBeNull()
  expect(lastAnswerIn("", true)).toBeNull()
})

test("a line severed by the window's edge is dropped rather than read", () => {
  expect(lastAnswerIn(`${MIDWAY}\n${ASKED}`, false)).toBeNull()
  expect(lastAnswerIn(`${MIDWAY}\n${ASKED}`, true)?.stopReason).toBe("tool_use")
})

test("a line that will not parse is passed over", () => {
  expect(lastAnswerIn(`${ENDED}\nba`, true)?.stopReason).toBe("end_turn")
})

test("a reading kept in a shape this does not know is unread", () => {
  expect(keptWorkingIn(null)).toEqual({})
  expect(keptWorkingIn("working")).toEqual({})
  expect(keptWorkingIn([])).toEqual({})
  expect(keptWorkingIn({ activeTurn: "yes" })).toEqual({})
  expect(keptWorkingIn({ activeTurn: true, scannedTo: 12 })).toEqual({
    activeTurn: true,
    scannedTo: 12,
  })
})

test("a seat akasha holds nothing for is unread", () => {
  expect(workingOf("")).toEqual({})
  expect(workingLines({}).every((one) => one.includes("unread"))).toBe(true)
})
