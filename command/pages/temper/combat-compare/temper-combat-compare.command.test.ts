import { expect, test } from "bun:test"
import { INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { temperCombatCompare } from "akasha/command/pages/temper/combat-compare/temper-combat-compare.command.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha temper combat-compare",
  from: ROOT,
  writer: null,
  agentId: null,
}

test("a character naming no page is refused", async () => {
  const said = await temperCombatCompare(["nobody-at-all"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`nobody-at-all` names no character page")
})

test("a call naming no character is refused", async () => {
  const said = await temperCombatCompare([], GIVEN)

  expect(said.code).toBe(INPUT)
})
