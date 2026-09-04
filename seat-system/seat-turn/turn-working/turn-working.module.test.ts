import { expect, test } from "bun:test"
import {
  anyWorking,
  anyWorkingRead,
  workingLines,
  workingOf,
  workingOn,
} from "./turn-working.module.code.ts"

const AT = Date.parse("2026-09-03T00:00:00.000Z")

test("a seat is working where any one component is on", () => {
  expect(anyWorking({ "active-turn": { value: true, at: AT } })).toBe(true)
  expect(anyWorking({ compacting: { value: true, at: AT } })).toBe(true)
  expect(workingOn({ compacting: { value: true, at: AT } })).toEqual(["compacting"])
})

test("unread is not off", () => {
  expect(anyWorkingRead({})).toBe(false)
  expect(anyWorkingRead({ "active-turn": { value: false, at: AT } })).toBe(true)
  expect(anyWorking({ "active-turn": { value: false, at: AT } })).toBe(false)
})

test("a component akasha declares no property for is unread", () => {
  expect(workingOf("any-agent")).toEqual({})
  expect(workingLines({}).every((one) => one.includes("unread"))).toBe(true)
})
