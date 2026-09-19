import { expect, test } from "bun:test"
import { INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { temperInventorySnapshot } from "akasha/command/pages/temper/inventory/snapshot/temper-inventory-snapshot.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper inventory snapshot",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a word is refused, because the account read is the one the call runs as", async () => {
  const said = await temperInventorySnapshot(["one"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`one` is no argument")
})

test("the file written to with nothing after it is refused", async () => {
  const said = await temperInventorySnapshot(["--output"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--output` takes a value, and none follows it")
})

test("a flag this command does not take is refused, naming what it takes", async () => {
  const said = await temperInventorySnapshot(["--nonsense"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--nonsense` is no argument")
})
