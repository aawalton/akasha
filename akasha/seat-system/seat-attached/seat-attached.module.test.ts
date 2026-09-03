import { expect, test } from "bun:test"
import { dropAttachedSessions, seatIsAttached, sessionsIn } from "./seat-attached.module.code.ts"

test("every session tmux names is one somebody is attached to", () => {
  expect([...sessionsIn("akasha\nalan\nastra")].sort()).toEqual(["akasha", "alan", "astra"])
})

test("a blank line names no session", () => {
  expect([...sessionsIn("akasha\n\n  \nalan\n")].sort()).toEqual(["akasha", "alan"])
})

test("a name is taken without the space around it", () => {
  expect([...sessionsIn("  akasha  \n")]).toEqual(["akasha"])
})

test("tmux saying nothing is nobody attached rather than no answer", () => {
  expect(sessionsIn("").size).toBe(0)
})

test("one session named twice is one session", () => {
  expect([...sessionsIn("akasha\nakasha\n")]).toEqual(["akasha"])
})

test("a seat is attached or not attached or unknown, and never throws", () => {
  dropAttachedSessions()
  const said = seatIsAttached("a-seat-no-tmux-names")
  expect(said === null || said === false).toBe(true)
})
