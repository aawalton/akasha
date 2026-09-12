import { expect, test } from "bun:test"
import { INPUT, OK } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  itemKeyIn,
  temperInventoryKnowledge,
} from "akasha/commands/pages/temper/inventory/knowledge/temper-inventory-knowledge.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper inventory knowledge",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a character said twice is refused rather than read as the last saying", async () => {
  const said = await temperInventoryKnowledge(["--char", "one", "--char", "two"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--char` is said twice")
})

test("a flag this takes no argument for is refused", async () => {
  const said = await temperInventoryKnowledge(["--nonsense"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--nonsense` is no argument")
})

test("a bare word is refused, this command taking none", async () => {
  const said = await temperInventoryKnowledge(["recipe:5"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`recipe:5` is no argument")
})

test("a flag taking a value with nothing after it is refused", async () => {
  const said = await temperInventoryKnowledge(["--item-key"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--item-key` takes a value, and none follows it")
})

test("an item key carrying no kind mark is refused, naming what it takes", async () => {
  const said = await temperInventoryKnowledge(["--item-key", "recipe"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe("`--item-key` takes `<kind>:<args>`, and `recipe` carries no `:`")
})

test("a recipe key is read as the result item it names", () => {
  expect(itemKeyIn("recipe:45332")).toEqual({ kind: "recipe", resultItemId: 45332 })
})

test("a motif key naming master is read as the whole book rather than a chapter", () => {
  expect(itemKeyIn("motif:7:master")).toEqual({ kind: "motif", styleId: 7, chapterId: null })
})

test("a key naming a kind this command has none of is refused, naming the three it has", () => {
  expect(itemKeyIn("furnishing:3")).toBe(
    "`--item-key` carries `recipe`, `motif` and `script`, and `furnishing` is none of them"
  )
})

test("a call saying nothing is no refusal over its arguments", async () => {
  const said = await temperInventoryKnowledge(["--characters-path", "nowhere.lua"], GIVEN)

  expect(said.code).not.toBe(INPUT)
  expect(said.code).not.toBe(OK)
})
