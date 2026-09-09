import { afterAll, expect, test } from "bun:test"
import { idOf, indexedRepo, pageOf, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { pathsIn, refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
  worldAt,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange as changeManifestWays } from "../../../file-content/change/change-manifest-ways/change-manifest-ways.change-mechanical-file-content.code.ts"
import { runChange as changePageProperty } from "../../../file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.code.ts"
import { runChange as changeImports } from "../../../file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { runChange as renameExport } from "../../../file-content/rename/rename-export/rename-export.change-mechanical-file-content.code.ts"
import { runChange as renamePageAddress } from "../../../file-content/rename/rename-page-address/rename-page-address.change-mechanical-file-content.code.ts"
import { runChange as renamePageAddresses } from "../../../file-content/rename/rename-page-addresses/rename-page-addresses.change-mechanical-file-content.code.ts"
import { runChange as renamePageSlug } from "../../../file-content/rename/rename-page-slug/rename-page-slug.change-mechanical-file-content.code.ts"
import { runChange as moveFile } from "../../move/move-file/move-file.change-mechanical-file.code.ts"
import { runChange as moveFileCode } from "../../move/move-file-code/move-file-code.change-mechanical.code.ts"
import { runChange as renameFilePage } from "../rename-file-page/rename-file-page.change-mechanical.code.ts"
import { addressesIn, runChange } from "./rename-file-pages.change-mechanical.code.ts"

afterAll(scratch.sweep)

const KEPT_TYPE = "akasha/kept.page-type.ts"

const ONE_PAGE = "akasha/kept/one.kept.ts"

const TWO_PAGE = "akasha/kept/two.kept.ts"

const ONE_LANDS = "akasha/kept/first.kept.ts"

const TWO_LANDS = "akasha/kept/second.kept.ts"

const SPELLER_PAGE = "akasha/speller.module.ts"

const SPELLER_CODE = "akasha/speller.module.code.ts"

const RESTATES = "change-mechanical-file-content/rename-page-addresses"

const ONE_ADDRESS = "change-mechanical-file-content/rename-page-address"

const RENAME_FILE_PAGE = "change-mechanical/rename-file-page"

const TYPE_BODY = `export type Kept = { readonly id: string }

${pageOf({
  id: idOf("d"),
  pageTypeSlug: "page-type",
  slug: "kept",
  pluralSlug: "kepts",
  extendsSlug: ["page-type/page"],
})}`

const RUNS: Reaching = async (world, at, given) => {
  if (at === RENAME_FILE_PAGE) {
    return await renameFilePage(world, given as Parameters<typeof renameFilePage>[1])
  }
  if (at === "change-mechanical/move-file-code") {
    return await moveFileCode(world, given as Parameters<typeof moveFileCode>[1])
  }
  if (at === "change-mechanical-file/move-file") {
    return moveFile(world, given as Parameters<typeof moveFile>[1])
  }
  if (at === ONE_ADDRESS) {
    return await renamePageAddress(world, given as Parameters<typeof renamePageAddress>[1])
  }
  if (at === RESTATES) {
    return await renamePageAddresses(world, given as Parameters<typeof renamePageAddresses>[1])
  }
  if (at === "change-mechanical-file-content/rename-page-slug") {
    return await renamePageSlug(world, given as Parameters<typeof renamePageSlug>[1])
  }
  if (at === "change-mechanical-file-content/rename-export") {
    return renameExport(world, given as Parameters<typeof renameExport>[1])
  }
  if (at === "change-mechanical-file-content/change-imports") {
    return changeImports(world, given as Parameters<typeof changeImports>[1])
  }
  if (at === "change-mechanical-file-content/change-manifest-ways") {
    return changeManifestWays(world, given as Parameters<typeof changeManifestWays>[1])
  }
  if (at === "change-mechanical-file-content/change-page-page-property") {
    return changePageProperty(world, given as Parameters<typeof changePageProperty>[1])
  }
  return refusing(`\`${at}\` is reached by nothing here`)
}

function repoIn(): string {
  return indexedRepo({
    [KEPT_TYPE]: TYPE_BODY,
    [ONE_PAGE]: pageOf({ id: idOf("e"), pageTypeSlug: "kept", slug: "one" }),
    [TWO_PAGE]: pageOf({ id: idOf("f"), pageTypeSlug: "kept", slug: "two" }),
    [SPELLER_PAGE]: pageOf({
      id: idOf("c"),
      pageTypeSlug: "module",
      slug: "speller",
      code: "ts",
    }),
    [SPELLER_CODE]: `export const at = ["kept/one", "kept/two"]\n`,
  })
}

function worldIn(root: string, reaching: Reaching = RUNS): World {
  return worldAt(root, textIn(root), reaching)
}

type Traced = { readonly at: string; readonly given: unknown }

function tracing(): { readonly runs: Reaching; readonly reached: readonly Traced[] } {
  const reached: Traced[] = []
  return {
    runs: async (world, at, given) => {
      reached.push({ at, given })
      return await RUNS(world, at, given)
    },
    reached,
  }
}

const KEPT_ROOT = repoIn()

const ASKED = { moved: { [ONE_PAGE]: "first", [TWO_PAGE]: "second" } }

test("every page handed in is renamed and every address it carried is restated", async () => {
  const root = KEPT_ROOT
  const said = await runChange(worldIn(root), ASKED)
  const paths = pathsIn(said)

  expect(said.refused).toBe(null)
  expect(paths).toContain(ONE_LANDS)
  expect(paths).toContain(TWO_LANDS)
  expect(bodiesIn(said, textIn(root)).get(SPELLER_CODE) ?? "").toBe(
    `export const at = ["kept/first", "kept/second"]\n`
  )
})

test("every address is restated over one reading of the bodies before any page is renamed", async () => {
  const traced = tracing()
  const said = await runChange(worldIn(KEPT_ROOT, traced.runs), ASKED)
  const restating = traced.reached.filter((one) => one.at === RESTATES)
  const renaming = traced.reached.filter((one) => one.at === RENAME_FILE_PAGE)

  expect(said.refused).toBe(null)
  expect(restating.length).toBe(1)
  expect(traced.reached[0]?.at).toBe(RESTATES)
  expect(traced.reached.some((one) => one.at === ONE_ADDRESS)).toBe(false)
  expect(renaming.length).toBe(2)
})

test("each page's rename is told the addresses are restated already", async () => {
  const traced = tracing()
  await runChange(worldIn(KEPT_ROOT, traced.runs), ASKED)
  const renaming = traced.reached.filter((one) => one.at === RENAME_FILE_PAGE)

  expect(renaming.map((one) => one.given)).toEqual([
    { at: ONE_PAGE, to: "first", addressesRestated: true },
    { at: TWO_PAGE, to: "second", addressesRestated: true },
  ])
})

test("a page whose body cannot be read refuses the whole answer", async () => {
  const traced = tracing()
  const said = await runChange(worldIn(KEPT_ROOT, traced.runs), {
    moved: { [ONE_PAGE]: "first", "akasha/kept/three.kept.ts": "third" },
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`akasha/kept/three.kept.ts` could not be read, so no page is renamed")
  expect(traced.reached).toEqual([])
})

test("a call handing in no page is refused", async () => {
  const traced = tracing()
  const said = await runChange(worldIn(KEPT_ROOT, traced.runs), { moved: {} })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no page was handed in, so no page is renamed")
  expect(traced.reached).toEqual([])
})

test("a page handed in under the slug that page carries has no address restated", () => {
  const found = addressesIn([
    { at: ONE_PAGE, was: "one", to: "one", pageTypeSlug: "kept" },
    { at: TWO_PAGE, was: "two", to: "second", pageTypeSlug: "kept" },
  ])

  expect(found).toEqual({ "kept/two": "kept/second" })
})
