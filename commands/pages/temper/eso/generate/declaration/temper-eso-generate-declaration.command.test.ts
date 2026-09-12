import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperEsoGenerateDeclaration } from "akasha/commands/pages/temper/eso/generate/declaration/temper-eso-generate-declaration.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper eso generate declaration",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const STOPPED = new Error("the declarations landed and the stamp could not be read back")

test("a run that landed the declarations and then threw names that commit", async () => {
  const said = await temperEsoGenerateDeclaration([], GIVEN, throwingAfter(["abc123"], STOPPED))

  expect(said.report).toEqual(["abc123"])
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: abc123. Nothing after that ran."
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw with no declaration landed says the fault by itself", async () => {
  const said = await temperEsoGenerateDeclaration([], GIVEN, throwingAfter([], STOPPED))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the stamp could not be read back")
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote more than one thing names each of them in turn", async () => {
  const wrote = ["five declaration files were written", "abc123"]
  const said = await temperEsoGenerateDeclaration([], GIVEN, throwingAfter(wrote, STOPPED))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: " +
      "five declaration files were written; abc123. Nothing after that ran."
  )
})
