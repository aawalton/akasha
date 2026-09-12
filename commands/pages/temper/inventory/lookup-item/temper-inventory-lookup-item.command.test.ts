import { expect, test } from "bun:test"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryLookupItem } from "akasha/commands/pages/temper/inventory/lookup-item/temper-inventory-lookup-item.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper inventory lookup-item",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a call naming no item is refused, and the refusal names the word it wanted", async () => {
  const said = await temperInventoryLookupItem([], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe(
    "`akasha temper inventory lookup-item` takes `<item>`, and nothing said it"
  )
})

test("a second word is refused rather than read as the item, counting both", async () => {
  const said = await temperInventoryLookupItem(["12345", "67890"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe(
    "`akasha temper inventory lookup-item` takes 1 word and this call says 2 words — nothing takes `67890`"
  )
})

test("a path said twice is refused rather than read as the last saying", async () => {
  const said = await temperInventoryLookupItem(
    ["12345", "--inventory-path", "one.lua", "--inventory-path", "two.lua"],
    GIVEN
  )

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--inventory-path` is said twice")
})

test("a flag this command does not take is refused, naming what it takes", async () => {
  const said = await temperInventoryLookupItem(["12345", "--nonsense"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--nonsense` is no argument")
})

test("a word that is neither an item id nor an item link is refused", async () => {
  const said = await temperInventoryLookupItem(["banana"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe("`banana` reads as neither an item id nor an item link")
})

test("the item is read from the word rather than from a flag said before it", async () => {
  const said = await temperInventoryLookupItem(["--json", "12345"], GIVEN)

  expect(said.refusals.join("\n")).not.toContain("is no argument")
  expect(said.code).not.toBe(INPUT)
})
