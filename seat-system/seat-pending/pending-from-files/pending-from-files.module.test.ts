import { expect, test } from "bun:test"
import type { SubagentPage } from "../../subagent-census/subagent-census.module.code.ts"
import { seatsWithSubagentPage } from "./pending-from-files.module.code.ts"

const AMY = "01a087b5-1ca3-7000-bf5c-16aae1620c39"

const THEA = "01a06c31-1b01-7000-b602-fc1a3f96f3a4"

function pageFor(seatId: string, own: string): SubagentPage {
  return {
    path: `seat-system/subagents/pages/${own}.subagent.ts`,
    slug: own,
    seatName: "",
    agentId: seatId === "" ? own : `${seatId}--${own}`,
    seatId,
    own,
  }
}

test("a seat a subagent page names as its principal has a live subagent", () => {
  const found = seatsWithSubagentPage([pageFor(AMY, "a088"), pageFor(AMY, "ab8e")])

  expect(found.has(AMY)).toBe(true)
  expect(found.size).toBe(1)
})

test("a seat no subagent page names has no live subagent", () => {
  expect(seatsWithSubagentPage([pageFor(AMY, "a088")]).has(THEA)).toBe(false)
  expect(seatsWithSubagentPage([]).size).toBe(0)
})

test("a page stating an agent id with no seat before the mark names no seat", () => {
  expect(seatsWithSubagentPage([pageFor("", "a088")]).size).toBe(0)
})
