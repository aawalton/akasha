import { expect, test } from "bun:test"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { temperCatalogInvalidate } from "akasha/commands/pages/temper/catalog/invalidate/temper-catalog-invalidate.command.code.ts"

test("a call naming no domain and saying no --all is refused", () => {
  const said = temperCatalogInvalidate([])

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(
    "name a domain with --domain, or say --all to ask for every one of them"
  )
})

test("a call naming one domain beside --all is refused", () => {
  const said = temperCatalogInvalidate(["--all", "--domain", "item"])

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(
    "--all asks for every domain, so it takes no --domain, and item names 1"
  )
})

test("a domain the addon's registry does not have is refused by name", () => {
  const said = temperCatalogInvalidate(["--domain", "nosuchdomain"])

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(
    "nosuchdomain is no domain the catalog addon registers"
  )
})
