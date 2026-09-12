import { expect, test } from "bun:test"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventorySnapshot } from "akasha/commands/pages/temper/inventory/snapshot/temper-inventory-snapshot.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper inventory snapshot",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a call naming no snapshot and asking for no newest is refused over the pair", async () => {
  const said = await temperInventorySnapshot([], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals).toEqual([
    "`akasha temper inventory snapshot` takes `--latest` or `<snapshot>`, and nothing said either",
  ])
})

test("a call naming a snapshot and asking for the newest at once is refused", async () => {
  const said = await temperInventorySnapshot(["one", "--latest"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals).toEqual([
    "`<snapshot>` and `--latest` are never said together, and this call says both",
  ])
})

test("a second snapshot is refused rather than read as the one asked for", async () => {
  const said = await temperInventorySnapshot(["one", "two"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe(
    "`akasha temper inventory snapshot` takes 1 word and this call says 2 words — nothing takes `two`"
  )
})

test("the file written to with nothing after it is refused", async () => {
  const said = await temperInventorySnapshot(["--latest", "--output"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--output` takes a value, and none follows it")
})

test("a flag this command does not take is refused, naming what it takes", async () => {
  const said = await temperInventorySnapshot(["--latest", "--nonsense"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--nonsense` is no argument")
})
