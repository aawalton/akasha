import { expect, test } from "bun:test"
import {
  armedAfterTyping,
  awaitsTurn,
  echoDropped,
  echoesSettled,
  echoesShown,
  echoOf,
  echoWritten,
  type PendingAction,
  sendingFor,
  TURN_AWAITED_MS,
  turnAwaited,
} from "akasha/story/world/stories/played/modules/action-bar-state/action-bar-state.module.code.ts"

const LOOK: PendingAction = { id: "agent-message-1", text: "I look around", kind: "action" }

test("an echo of a line wrapped whole in brackets is tagged feedback", () => {
  expect(echoOf("k", "[slow down]", 1).kind).toBe("feedback")
  expect(echoOf("k", "I wait", 1).kind).toBe("action")
})

test("an echo still sending is shown", () => {
  expect(echoesShown([echoOf("k", "I wait", 1)], [])).toHaveLength(1)
})

test("an echo the waiting list already shows is not shown twice", () => {
  const echoes = echoWritten([echoOf("k", LOOK.text, 1)], "k", LOOK.id, 2)
  expect(echoesShown(echoes, [LOOK])).toEqual([])
})

test("an echo written before the waiting list was asked for is settled by that list", () => {
  const echoes = echoWritten([echoOf("k", "I wait", 1)], "k", "agent-message-2", 5)
  expect(echoesSettled(echoes, 4, false)).toHaveLength(1)
  expect(echoesSettled(echoes, 6, false)).toEqual([])
})

test("an echo still sending is never settled", () => {
  expect(echoesSettled([echoOf("k", "I wait", 1)], 9, false)).toHaveLength(1)
})

test("an action's echo is kept while the turn answering it is awaited", () => {
  const echoes = echoWritten([echoOf("k", "I wait", 1)], "k", "agent-message-2", 5)
  expect(echoesSettled(echoes, 6, true)).toHaveLength(1)
})

test("feedback's echo is settled by the waiting list even while a turn is awaited", () => {
  const echoes = echoWritten([echoOf("k", "[slow down]", 1)], "k", "agent-message-2", 5)
  expect(echoesSettled(echoes, 6, true)).toEqual([])
})

test("a turn is awaited over an action and not over feedback", () => {
  expect(awaitsTurn([LOOK])).toBe(true)
  expect(awaitsTurn([{ kind: "feedback" }])).toBe(false)
  expect(awaitsTurn([])).toBe(false)
})

test("a turn awaited is awaited past the turns seen while an action waits", () => {
  expect(turnAwaited(null, 3, 10, true)).toEqual({ turnsAt: 3, at: 10 })
  expect(turnAwaited({ turnsAt: 2, at: 1 }, 3, 10, true)).toEqual({ turnsAt: 3, at: 10 })
})

test("a turn awaited stays awaited once no action waits, until a turn arrives", () => {
  const awaited = { turnsAt: 3, at: 10 }
  expect(turnAwaited(awaited, 3, 20, false)).toBe(awaited)
  expect(turnAwaited(awaited, 4, 20, false)).toBeNull()
})

test("a turn awaited past its limit is no longer awaited", () => {
  const awaited = { turnsAt: 3, at: 10 }
  expect(turnAwaited(awaited, 3, 10 + TURN_AWAITED_MS, false)).toBe(awaited)
  expect(turnAwaited(awaited, 3, 11 + TURN_AWAITED_MS, false)).toBeNull()
})

test("nothing is awaited where nothing was sent", () => {
  expect(turnAwaited(null, 3, 10, false)).toBeNull()
})

test("an echo whose send failed is dropped", () => {
  expect(echoDropped([echoOf("k", "I wait", 1)], "k")).toEqual([])
})

test("an empty line sends nothing", () => {
  expect(sendingFor("   ", [], [], null)).toBe("none")
})

test("a line already waiting arms rather than sends, and sends once armed", () => {
  expect(sendingFor(" I look around ", [LOOK], [], null)).toBe("arm")
  expect(sendingFor("I look around", [LOOK], [], "I look around")).toBe("send")
  expect(sendingFor("I look up", [LOOK], [], null)).toBe("send")
})

test("a line still echoing arms rather than sends", () => {
  expect(sendingFor("I wait", [], [echoOf("k", "I wait", 1)], null)).toBe("arm")
})

test("typing a different line disarms", () => {
  expect(armedAfterTyping("I wait", "I wai")).toBeNull()
  expect(armedAfterTyping("I wait", "I wait ")).toBe("I wait")
})
