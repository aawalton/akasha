import { expect, test } from "bun:test"
import { INPUT, OK } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperCatalogList } from "akasha/commands/pages/temper/catalog/list/temper-catalog-list.command.code.ts"

const GIVEN: Given = {
  root: ".",
  calledAs: "akasha temper catalog list",
  from: ".",
  writer: null,
  agentId: null,
}

test("a domain is named once", () => {
  const said = temperCatalogList([], GIVEN)

  expect(said.code).toBe(OK)
  const named = said.report.slice(1)
  expect(new Set(named).size).toBe(named.length)
})

test("the json answer carries every domain the heading answer names", () => {
  const asJson = temperCatalogList(["--json"], GIVEN)
  const asLines = temperCatalogList([], GIVEN)

  expect(asJson.code).toBe(OK)
  const parsed = JSON.parse(asJson.report.join("\n")) as { domains: readonly string[] }
  expect(parsed.domains).toEqual(asLines.report.slice(1))
})

test("a flag this takes no argument for is refused rather than passed over", () => {
  const said = temperCatalogList(["--nonsense"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--nonsense` is no argument")
})

test("a word this takes no argument for is refused rather than passed over", () => {
  const said = temperCatalogList(["item"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`item` is no argument")
})
