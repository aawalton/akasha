import { expect, test } from "bun:test"
import {
  livenessOf,
  namedAmong,
  readOf,
} from "akasha/seat-system/subagents/liveness/subagent-liveness.module.code.ts"

const OWN = "a38f63805f9b94edf"

const ANOTHER = "01a05844-6e60-7000-b54c-4b14559df70c"

const NOWHERE = "seat-system/subagents/pages/nowhere/nowhere.subagent.ts"

test("a subagent the transcript names below another is named as one at the top is", () => {
  const deep = { key: "c", label: "c", agentId: OWN, children: [] }
  const under = { key: "b", label: "b", agentId: ANOTHER, children: [deep] }
  expect(namedAmong([{ key: "a", label: "a", agentId: null, children: [under] }], OWN)).toBe(true)
})

test("a subagent the transcript names nowhere is named by nothing", () => {
  expect(namedAmong([{ key: "a", label: "a", agentId: ANOTHER, children: [] }], OWN)).toBe(false)
  expect(namedAmong([], OWN)).toBe(false)
})

test("a page whose own agent id will not be read reads as unread", async () => {
  expect(await livenessOf("/var/tmp/subagent-liveness-nowhere", NOWHERE)).toBe("unread")
})

test("a reading says which of its steps settled the answer", async () => {
  const held = await readOf("/var/tmp/subagent-liveness-nowhere", NOWHERE)

  expect(held.liveness).toBe("unread")
  expect(held.why).toContain("states no agent id")
})
