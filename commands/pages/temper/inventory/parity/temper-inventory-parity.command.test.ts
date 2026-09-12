import { expect, test } from "bun:test"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  inputsSaid,
  temperInventoryParity,
  walkSaid,
} from "akasha/commands/pages/temper/inventory/parity/temper-inventory-parity.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper inventory parity",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a call saying neither the character nor the item is refused over both", async () => {
  const said = await temperInventoryParity([], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals).toEqual([
    "`akasha temper inventory parity` takes `--char`, and nothing said it",
    "`akasha temper inventory parity` takes `<item-id>`, and nothing said it",
  ])
})

test("an item that is no whole number is refused by the page rather than by the body", async () => {
  const said = await temperInventoryParity(["banana", "--char", "one"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe("`<item-id> banana` is no whole number of nought or more")
})

test("a second item is refused rather than read as the one compared", async () => {
  const said = await temperInventoryParity(["12345", "67890", "--char", "one"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe(
    "`akasha temper inventory parity` takes 1 word and this call says 2 words — nothing takes `67890`"
  )
})

test("a character said twice is refused rather than read as the last saying", async () => {
  const said = await temperInventoryParity(["12345", "--char", "one", "--char", "two"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--char` is said twice")
})

test("no diverging input is said as a row of its own rather than as an empty section", () => {
  expect(inputsSaid([])).toEqual(["INPUTS DIFF", "  (no divergence)"])
})

test("no diverging rule is said as a row of its own rather than as an empty section", () => {
  expect(walkSaid([])).toEqual(["WALK DIFF", "  (no divergence)"])
})
