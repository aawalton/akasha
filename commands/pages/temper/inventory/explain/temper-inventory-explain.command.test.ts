import { expect, test } from "bun:test"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryExplain } from "akasha/commands/pages/temper/inventory/explain/temper-inventory-explain.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper inventory explain",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a call tracing no item is refused, and the refusal names the word it wanted", async () => {
  const said = await temperInventoryExplain([], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe(
    "`akasha temper inventory explain` takes `<item>`, and nothing said it"
  )
})

test("a second word is refused rather than read as the item, counting both", async () => {
  const said = await temperInventoryExplain(["12345", "67890"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe(
    "`akasha temper inventory explain` takes 1 word and this call says 2 words — nothing takes `67890`"
  )
})

test("a character said twice is refused rather than read as the last saying", async () => {
  const said = await temperInventoryExplain(["12345", "--char", "one", "--char", "two"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--char` is said twice")
})

test("a flag followed by another flag is refused rather than taking it as the value", async () => {
  const said = await temperInventoryExplain(["12345", "--char", "--json"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--char` takes a value, and none follows it")
})

test("a flag this command does not take is refused, naming what it takes", async () => {
  const said = await temperInventoryExplain(["12345", "--nonsense"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--nonsense` is no argument")
})
