import { expect, test } from "bun:test"
import type { Given } from "../../calling/calling.module.code.ts"
import { measure } from "./measure.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha measure", from: root, writer: null, agentId: null }
}

test("a call naming no subject is refused, saying the one it takes", () => {
  const said = measure([], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("claude-accounts")
})

test("a subject this does not measure is refused by name", () => {
  const said = measure(["seats"], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`seats`")
})

test("one call measures one subject", () => {
  const said = measure(["claude-accounts", "seats"], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("one subject")
})

test("the subject read is the first word", () => {
  const said = measure(["--claude-accounts"], given("/repo"))

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`--claude-accounts`")
})
