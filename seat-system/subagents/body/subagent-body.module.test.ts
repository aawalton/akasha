import { expect, test } from "bun:test"
import { bodyOf } from "akasha/seat-system/subagents/body/subagent-body.module.code.ts"

const HELD_ID = "01a06d00-0000-7000-8000-000000000001"

const STATES = [
  "import type { Subagent } from",
  "export const akashaAbc = {",
  'type: "subagent"',
  'slug: "akasha-abc"',
  'principalSeatName: "akasha"',
  'assignmentSlug: "domain/akasha-system"',
  'dispatchedAs: "Explore"',
  'agentId: "seat--own"',
]

const NAMED = [
  "type:",
  "slug:",
  "principalSeatName:",
  "assignmentSlug:",
  "dispatchedAs:",
  "agentId:",
]

test("a body states the type and slug and seat and assignment and kind and agent id", () => {
  const body = bodyOf("akasha-abc", "akasha", "domain/akasha-system", "Explore", "seat--own")
  for (const said of STATES) expect(body).toContain(said)
  expect(body).not.toContain("pageTypeSlug:")
})

test("a body composed states no id, leaving the change to mint one", () => {
  expect(
    bodyOf("akasha-abc", "akasha", "domain/akasha-system", "Explore", "seat--own")
  ).not.toContain("id:")
})

test("a body carries the id it is handed, before everything else the body states", () => {
  const body = bodyOf("a-abc", "akasha", "domain/akasha-system", "Explore", "seat--own", HELD_ID)
  expect(body).toContain(`id: ${JSON.stringify(HELD_ID)}`)
  expect(body.indexOf("id:")).toBeLessThan(body.indexOf("type:"))
})

test("a body states its keys in the order this module names them", () => {
  const body = bodyOf("akasha-abc", "akasha", "domain/akasha-system", "Explore", "seat--own")
  const at = NAMED.map((one) => body.indexOf(one))
  expect(at.includes(-1)).toBe(false)
  expect(at).toEqual([...at].sort((one, next) => one - next))
})
