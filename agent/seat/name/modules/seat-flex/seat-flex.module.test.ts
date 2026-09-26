import { expect, test } from "bun:test"
import { refuseFlex } from "akasha/agent/seat/name/modules/seat-flex/seat-flex.module.code.ts"

const TARGET = "01a0dead-0000-7000-8000-000000000001"

const OWN = "01a0dead-0000-7000-8000-000000000002"

test("a spawned seat takes a flex", () => {
  expect(refuseFlex("flex-1", TARGET, OWN, () => "spawned")).toEqual([])
})

test("a person's seat in a game takes a flex", () => {
  expect(refuseFlex("flex-1", TARGET, OWN, () => "opened", true)).toEqual([])
})

test("a person's seat outside a game is refused a flex", () => {
  expect(refuseFlex("flex-1", TARGET, OWN, () => "opened")).toHaveLength(1)
})

test("no seat gives itself a flex, in a game or out of one", () => {
  expect(refuseFlex("flex-1", OWN, OWN, () => "opened", true)).toHaveLength(1)
})

test("a flex spelled otherwise is refused", () => {
  expect(refuseFlex("continuity", TARGET, OWN, () => "opened", true)).toHaveLength(1)
})
