import { expect, test } from "bun:test"
import { answering, refusing } from "@akasha/readout-system/readout-asking/testing"
import { fetchTemperTasks, tasksIn, trackingOn } from "./inboxes-temper-tasks.readout.code.ts"

test("the day asked for is the tracking day named", () => {
  const asked = trackingOn("2026-08-30")
  expect(asked["page-type"]).toBe("daily-tracking")
  expect(asked.where).toEqual({ date: { is: "2026-08-30" } })
  expect(asked.keys).toEqual(["inbox-temper-tasks"])
  expect(asked.limit).toBe(1)
})

test("a count stated as text is read as the number that count spells", () => {
  expect(tasksIn({ "inbox-temper-tasks": "7" })).toBe(7)
  expect(tasksIn({ "inbox-temper-tasks": 4 })).toBe(4)
})

test("a count of zero is a count", () => {
  expect(tasksIn({ "inbox-temper-tasks": "0" })).toBe(0)
  expect(tasksIn({ "inbox-temper-tasks": 0 })).toBe(0)
})

test("a day carrying no count is no reading rather than a count of zero", () => {
  expect(tasksIn({})).toBeNull()
  expect(tasksIn({ "inbox-temper-tasks": "" })).toBeNull()
  expect(tasksIn({ "inbox-temper-tasks": "   " })).toBeNull()
  expect(tasksIn({ "inbox-temper-tasks": "soon" })).toBeNull()
})

test("no tracking day is no reading rather than a count of zero", async () => {
  expect(await fetchTemperTasks(answering([]), "2026-08-30")).toBeNull()
})

test("a day carrying a count answers with that count", async () => {
  expect(
    await fetchTemperTasks(answering([{ values: { "inbox-temper-tasks": 12 } }]), "2026-08-30")
  ).toBe(12)
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(fetchTemperTasks(refusing("the store is down"), "2026-08-30")).rejects.toThrow(
    "the store is down"
  )
})
