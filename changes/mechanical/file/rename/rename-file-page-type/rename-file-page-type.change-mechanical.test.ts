import { afterAll, expect, test } from "bun:test"
import { idOf, indexedRepo, pageOf, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { pathsIn, refusing } from "../../../../modules/change-answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
  worldAt,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange as changeFileContent } from "../../../file-content/change/change-file-content/change-file-content.change-mechanical-file-content.code.ts"
import { runChange as changeManifestWays } from "../../../file-content/change/change-manifest-ways/change-manifest-ways.change-mechanical-file-content.code.ts"
import { runChange as changePageProperty } from "../../../file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.code.ts"
import { runChange as changeImports } from "../../../file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { runChange as renameExport } from "../../../file-content/rename/rename-export/rename-export.change-mechanical-file-content.code.ts"
import { runChange as renamePageAddress } from "../../../file-content/rename/rename-page-address/rename-page-address.change-mechanical-file-content.code.ts"
import { runChange as renamePageSlug } from "../../../file-content/rename/rename-page-slug/rename-page-slug.change-mechanical-file-content.code.ts"
import { runChange as moveFile } from "../../move/move-file/move-file.change-mechanical-file.code.ts"
import { runChange as moveFileCode } from "../../move/move-file-code/move-file-code.change-mechanical.code.ts"
import { runChange as renameFilePage } from "../rename-file-page/rename-file-page.change-mechanical.code.ts"
import { runChange } from "./rename-file-page-type.change-mechanical.code.ts"

afterAll(scratch.sweep)

const CARRIED = "carried"

const KEPT_TYPE = "akasha/kept.page-type.ts"

const TYPE_LANDS = "akasha/carried.page-type.ts"

const ONE_PAGE = "akasha/kept/one.kept.ts"

const ONE_LANDS = "akasha/kept/one.carried.ts"

const ONE_CODE = "akasha/kept/one.kept.code.ts"

const ONE_CODE_LANDS = "akasha/kept/one.carried.code.ts"

const SPELLER_PAGE = "akasha/speller.module.ts"

const SPELLER_CODE = "akasha/speller.module.code.ts"

const TYPE_BODY = `export type Kept = { readonly id: string }

${pageOf({
  id: idOf("d"),
  pageTypeSlug: "page-type",
  slug: "kept",
  pluralSlug: "kepts",
  extendsSlug: ["page-type/page"],
  properties: [{ pagePropertySlug: "file-property/code", required: false, many: false }],
})}`

const ONE_BODY = `import type { Kept } from "../kept.page-type.ts"

export const one = {
  id: "${idOf("e")}",
  pageTypeSlug: "kept",
  slug: "one",
  code: "ts",
} as const satisfies Kept
`

const ONE_CODE_BODY = `import { one } from "./one.kept.ts"

export const held = one.slug
`

const RUNS: Reaching = async (world, at, given) => {
  if (at === "change-mechanical/rename-file-page") {
    return await renameFilePage(world, given as Parameters<typeof renameFilePage>[1])
  }
  if (at === "change-mechanical/move-file-code") {
    return await moveFileCode(world, given as Parameters<typeof moveFileCode>[1])
  }
  if (at === "change-mechanical-file/move-file") {
    return moveFile(world, given as Parameters<typeof moveFile>[1])
  }
  if (at === "change-mechanical-file-content/rename-page-address") {
    return await renamePageAddress(world, given as Parameters<typeof renamePageAddress>[1])
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
  if (at === "change-mechanical-file-content/change-file-content") {
    return changeFileContent(world, given as Parameters<typeof changeFileContent>[1])
  }
  return refusing(`\`${at}\` is reached by nothing here`)
}

function repoIn(): string {
  return indexedRepo({
    [KEPT_TYPE]: TYPE_BODY,
    [ONE_PAGE]: ONE_BODY,
    [ONE_CODE]: ONE_CODE_BODY,
    [SPELLER_PAGE]: pageOf({
      id: idOf("f"),
      pageTypeSlug: "module",
      slug: "speller",
      code: "ts",
    }),
    [SPELLER_CODE]: `export const at = "kept/one"\n`,
  })
}

function worldIn(root: string): World {
  return worldAt(root, textIn(root), RUNS)
}

test("a path naming no page type is refused", async () => {
  const said = await runChange(worldIn(repoIn()), { at: ONE_PAGE, to: CARRIED })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no page type/)
})

const ASKED = { at: KEPT_TYPE, to: CARRIED, plural: "carrieds" }

test("the page type's own file is carried to the name its new slug spells", async () => {
  const said = await runChange(worldIn(repoIn()), ASKED)

  expect(said.refused).toBe(null)
  expect(pathsIn(said)).toContain(TYPE_LANDS)
})

test("every file a page of that page type claims carries the new slug in its name", async () => {
  const said = await runChange(worldIn(repoIn()), ASKED)
  const paths = pathsIn(said)

  expect(said.refused).toBe(null)
  expect(paths).toContain(ONE_LANDS)
  expect(paths).toContain(ONE_CODE_LANDS)
})

test("the page type a page states is restated at the path that page landed at", async () => {
  const world = worldIn(repoIn())
  const said = await runChange(world, ASKED)
  const body = bodiesIn(said, world.base).get(ONE_LANDS) ?? ""

  expect(said.refused).toBe(null)
  expect(body).toContain(`pageTypeSlug: "${CARRIED}"`)
  expect(body).toContain("satisfies Carried")
})

test("a body spelling a page's old address spells that page's new address", async () => {
  const world = worldIn(repoIn())
  const said = await runChange(world, ASKED)

  expect(said.refused).toBe(null)
  expect(bodiesIn(said, world.base).get(SPELLER_CODE) ?? "").toContain(`"${CARRIED}/one"`)
})
