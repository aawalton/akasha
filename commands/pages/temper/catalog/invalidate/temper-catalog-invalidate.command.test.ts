import { expect, test } from "bun:test"
import {
  INPUT,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Named } from "akasha/commands/pages/temper/catalog/invalidate/temper-catalog-invalidate.command.code.ts"
import {
  madeSaid,
  temperCatalogInvalidate,
  writtenBy,
} from "akasha/commands/pages/temper/catalog/invalidate/temper-catalog-invalidate.command.code.ts"

const GIVEN: Given = {
  root: ".",
  calledAs: "akasha temper catalog invalidate",
  from: ".",
  writer: null,
  agentId: null,
}

const NAMED: Named = { domain: [], all: true, json: false, sideFile: undefined }

test("a call naming no domain and saying no --all is refused", async () => {
  const said = await temperCatalogInvalidate([], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("takes `--all` or `--domain`, and nothing said either")
})

test("a call naming one domain beside --all is refused", async () => {
  const said = await temperCatalogInvalidate(["--all", "--domain", "item"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(
    "`--all` and `--domain` are never said together, and this call says both"
  )
})

test("a domain the addon's registry does not have is refused by name", async () => {
  const said = await temperCatalogInvalidate(["--domain", "nosuchdomain"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(
    "nosuchdomain is no domain the catalog addon registers"
  )
})

test("a flag this takes no argument for is refused rather than passed over", async () => {
  const said = await temperCatalogInvalidate(["--all", "--force"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--force` is no argument")
})

test("a write that threw names in its refusal the folder this made in the game", async () => {
  const made = "/where/the/game/reads/TemperCatalog"
  const said = await writtenBy(NAMED, (done) => {
    done.push(madeSaid(made))
    throw new Error("the request would not be written")
  })

  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals[0]).toContain("would not be written")
  expect(said.refusals.join("\n")).toContain(made)
})

test("a write that made no folder and threw says nothing about a folder", async () => {
  const said = await writtenBy(NAMED, () => {
    throw new Error("the request would not be written")
  })

  expect(said.refusals.join("\n")).not.toContain("stopped part way")
})

test("a folder in the game is named as one this made rather than one that was already there", () => {
  expect(madeSaid("/a/b/TemperCatalog")).toContain("was made by this")
})
