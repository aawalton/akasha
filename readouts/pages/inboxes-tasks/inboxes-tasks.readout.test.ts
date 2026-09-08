import { expect, test } from "bun:test"
import { tasksIn } from "./inboxes-tasks.readout.code.ts"

test("a count stated as text is read as the number that count spells", () => {
  expect(tasksIn({ "inbox-tasks": "24" })).toBe(24)
  expect(tasksIn({ "inbox-tasks": 7 })).toBe(7)
})

test("a count of zero is a count", () => {
  expect(tasksIn({ "inbox-tasks": "0" })).toBe(0)
  expect(tasksIn({ "inbox-tasks": 0 })).toBe(0)
})

test("a day carrying no count is no reading rather than a count of zero", () => {
  expect(tasksIn({})).toBeNull()
  expect(tasksIn({ "inbox-tasks": "" })).toBeNull()
  expect(tasksIn({ "inbox-tasks": "   " })).toBeNull()
  expect(tasksIn({ "inbox-tasks": "soon" })).toBeNull()
  expect(tasksIn({ "inbox-tasks": null })).toBeNull()
})

test("the temper count beside it is never read as the task count", () => {
  expect(tasksIn({ "inbox-temper-tasks": "22" })).toBeNull()
})
