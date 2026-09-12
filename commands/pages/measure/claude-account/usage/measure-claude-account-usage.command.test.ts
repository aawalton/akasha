import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { measureClaudeAccountUsage } from "akasha/commands/pages/measure/claude-account/usage/measure-claude-account-usage.command.code.ts"

const NOWHERE = "/nowhere"

const GIVEN: Given = {
  root: NOWHERE,
  calledAs: "akasha measure claude-account usage",
  from: NOWHERE,
  writer: null,
  agentId: null,
}

test("a flag is refused, and the refusal says this takes no argument at all", async () => {
  const said = await measureClaudeAccountUsage(["--json"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--json` is no argument")
  expect(said.refusals[0]).toContain("it takes none")
})

test("a word is refused the way a flag is", async () => {
  const said = await measureClaudeAccountUsage(["athena"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("it takes none")
})

test("a refused call refreshes nothing, so no token is ever spent", async () => {
  const said = await measureClaudeAccountUsage(["--json"], GIVEN)
  expect(said.report).toEqual([])
})
