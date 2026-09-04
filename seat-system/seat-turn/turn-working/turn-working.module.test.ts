import { expect, test } from "bun:test"
import {
  anyWorking,
  anyWorkingRead,
  keptWorkingIn,
  lastAnswerIn,
  turnEnded,
  workingLines,
  workingOf,
} from "./turn-working.module.code.ts"

const ENDED = '{"type":"assistant","message":{"stop_reason":"end_turn"}}'

const MIDWAY = '{"type":"assistant","message":{"stop_reason":"tool_use"}}'

const ASKED = '{"type":"user","message":{"role":"user"}}'

const BETWEEN = '{"type":"bridge-session"}\n{"type":"cost-state"}\n{"type":"atis-latch"}'

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
  expect(turnEnded({ kind: "assistant", stopReason: "end_turn" })).toBe(true)
  expect(turnEnded({ kind: "assistant", stopReason: "tool_use" })).toBe(false)
})

test("a prompt is no answer, so a prompt ends no turn", () => {
  expect(turnEnded({ kind: "user", stopReason: null })).toBe(false)
})

test("a prompt with nothing answering it yet is a turn still to finish", () => {
  const said = lastAnswerIn(`${ENDED}\n${ASKED}`, true)

  expect(said?.kind).toBe("user")
  expect(said === null ? null : turnEnded(said)).toBe(false)
})

test("a turn answered to its end is finished", () => {
  const said = lastAnswerIn(`${ASKED}\n${MIDWAY}\n${ENDED}`, true)

  expect(said?.kind).toBe("assistant")
  expect(said === null ? null : turnEnded(said)).toBe(true)
})

test("what the harness keeps between turns neither starts nor ends one", () => {
  expect(lastAnswerIn(`${ENDED}\n${BETWEEN}`, true)?.kind).toBe("assistant")
  expect(lastAnswerIn(`${ASKED}\n${BETWEEN}`, true)?.kind).toBe("user")
})

test("a stretch holding neither a prompt nor an answer is unread rather than idle", () => {
  expect(lastAnswerIn(BETWEEN, true)).toBeNull()
  expect(lastAnswerIn("", true)).toBeNull()
})

test("a line severed by the window's edge is dropped rather than read", () => {
  expect(lastAnswerIn(`${MIDWAY}\n{"type":"cost-state"}`, false)).toBeNull()
  expect(lastAnswerIn(`${MIDWAY}\n{"type":"cost-state"}`, true)?.stopReason).toBe("tool_use")
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
