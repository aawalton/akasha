import { expect, test } from "bun:test"
import {
  armedAfterTyping,
  echoDropped,
  echoesSettled,
  echoesShown,
  echoOf,
  echoWritten,
  type PendingAction,
  sendingFor,
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
  expect(echoesSettled(echoes, 4)).toHaveLength(1)
  expect(echoesSettled(echoes, 6)).toEqual([])
})

test("an echo still sending is never settled", () => {
  expect(echoesSettled([echoOf("k", "I wait", 1)], 9)).toHaveLength(1)
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
