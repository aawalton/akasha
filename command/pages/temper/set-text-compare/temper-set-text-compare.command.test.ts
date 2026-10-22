import { expect, test } from "bun:test"
import { INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { temperSetTextCompare } from "akasha/command/pages/temper/set-text-compare/temper-set-text-compare.command.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha temper set-text-compare",
  from: ROOT,
  writer: null,
  agentId: null,
}

test("a word the command takes no argument for is refused", async () => {
  const said = await temperSetTextCompare(["stray-word"], GIVEN)

  expect(said.code).toBe(INPUT)
})
