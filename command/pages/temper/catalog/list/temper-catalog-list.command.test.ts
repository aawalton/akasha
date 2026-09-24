import { expect, test } from "bun:test"
import { INPUT, OK } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { temperCatalogList } from "akasha/command/pages/temper/catalog/list/temper-catalog-list.command.code.ts"
import { z } from "zod"

const CATALOG_SAID = z.looseObject({ domains: z.array(z.string()) })

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
  const parsed = CATALOG_SAID.parse(JSON.parse(asJson.report.join("\n")))
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
