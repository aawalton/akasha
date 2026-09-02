import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import { fetchTasks, tasksIn, trackingOn } from "./inboxes-tasks.readout.code.ts"

const DAY = "2026-09-02"

test("the day asked for is the tracking day named", () => {
  const asked = trackingOn(DAY)
  expect(asked["page-type"]).toBe("daily-tracking")
  expect(asked.where).toEqual({ date: { is: DAY } })
  expect(asked.keys).toEqual(["inbox-tasks"])
  expect(asked.limit).toBe(1)
})

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

test("the temper count standing beside it is never read as the task count", () => {
  expect(tasksIn({ "inbox-temper-tasks": "22" })).toBeNull()
})

test("no tracking day is no reading rather than a count of zero", async () => {
  expect(await fetchTasks(answering([]), DAY)).toBeNull()
})

test("a day carrying a count answers with that count", async () => {
  expect(await fetchTasks(answering([{ values: { "inbox-tasks": 24 } }]), DAY)).toBe(24)
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(fetchTasks(refusing("the store is down"), DAY)).rejects.toThrow(
    "unknown rather than none"
  )
})
