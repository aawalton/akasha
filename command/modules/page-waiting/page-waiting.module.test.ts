import { afterAll, expect, test } from "bun:test"
import { agentPaged } from "akasha/agent/modules/read-record/read-record.module.test-fixtures.ts"
import { pagedFor } from "akasha/command/modules/page-waiting/page-waiting.module.code.ts"
import {
  AGENT,
  heldRoot,
  PAGELESS,
  scratch,
  WAITED,
} from "akasha/command/pages/read/read.command.test-fixtures.ts"

afterAll(scratch.sweep)

test("an agent with no page asks that page back before it waits, and goes once it lands", () => {
  const asked: string[] = []
  const paged = pagedFor(heldRoot(), PAGELESS, WAITED, (root, agentId) => {
    asked.push(agentId)
    agentPaged(root, agentId, "asked-back")
    return true
  })
  expect(paged).toBe(true)
  expect(asked).toEqual([PAGELESS])
})

test("an agent whose page is there asks for nothing", () => {
  let asked = 0
  const paged = pagedFor(heldRoot(), AGENT, 0, () => {
    asked += 1
    return false
  })
  expect(paged).toBe(true)
  expect(asked).toBe(0)
})

test("an agent whose page never lands asks for it once and waits the wait out", () => {
  const asked: string[] = []
  const paged = pagedFor(heldRoot(), PAGELESS, 0, (_root, agentId) => {
    asked.push(agentId)
    return false
  })
  expect(paged).toBe(false)
  expect(asked).toEqual([PAGELESS])
})
