import { expect, test } from "bun:test"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperCatalogInvalidate } from "akasha/commands/pages/temper/catalog/invalidate/temper-catalog-invalidate.command.code.ts"

const GIVEN: Given = {
  root: ".",
  calledAs: "akasha temper catalog invalidate",
  from: ".",
  writer: null,
  agentId: null,
}

test("a call naming no domain and saying no --all is refused", () => {
  const said = temperCatalogInvalidate([], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("takes `--all` or `--domain`, and nothing said either")
})

test("a call naming one domain beside --all is refused", () => {
  const said = temperCatalogInvalidate(["--all", "--domain", "item"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(
    "`--all` and `--domain` are never said together, and this call says both"
  )
})

test("a domain the addon's registry does not have is refused by name", () => {
  const said = temperCatalogInvalidate(["--domain", "nosuchdomain"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(
    "nosuchdomain is no domain the catalog addon registers"
  )
})

test("a flag this takes no argument for is refused rather than passed over", () => {
  const said = temperCatalogInvalidate(["--all", "--force"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--force` is no argument")
})
