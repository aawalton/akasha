import { afterAll, expect, test } from "bun:test"
import { idOf, indexedRepo, pageOf, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { pathsIn, refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
  worldAt,
} from "../../../../modules/shadow/change-shadow.module.code.ts"
import { runChange as changeFileContent } from "../../../file-content/change/change-file-content/change-file-content.change-mechanical-file-content.code.ts"
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

const RESTATES = "change-mechanical-file-content/rename-page-addresses"

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

function worldIn(root: string, reaching: Reaching = RUNS): World {
  return worldAt(root, textIn(root), reaching)
}

function counting(): { readonly runs: Reaching; readonly called: () => number } {
  let called = 0
  return {
    runs: async (world, at, given) => {
      if (at === RESTATES) called += 1
      return await RUNS(world, at, given)
    },
    called: () => called,
  }
}

const KEPT_ROOT = repoIn()

const KEPT_WORLD = worldIn(KEPT_ROOT)

const ASKED = { at: KEPT_TYPE, to: CARRIED, plural: "carrieds" }

let kept: Promise<Answer> | null = null

function keptSaid(): Promise<Answer> {
  kept ??= runChange(KEPT_WORLD, ASKED)
  return kept
}

test("a path naming no page type is refused", async () => {
  const said = await runChange(KEPT_WORLD, { at: ONE_PAGE, to: CARRIED })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no page type/)
})

test("the page type's own file and each file its pages claim carry the new slug", async () => {
  const said = await keptSaid()
  const paths = pathsIn(said)

  expect(said.refused).toBe(null)
  expect(paths).toContain(TYPE_LANDS)
  expect(paths).toContain(ONE_LANDS)
  expect(paths).toContain(ONE_CODE_LANDS)
})

test("the page type a page states is restated at the path that page landed at", async () => {
  const said = await keptSaid()
  const body = bodiesIn(said, KEPT_WORLD.base).get(ONE_LANDS) ?? ""

  expect(said.refused).toBe(null)
  expect(body).toContain(`pageTypeSlug: "${CARRIED}"`)
  expect(body).toContain("satisfies Carried")
})

test("a body spelling a page's old address spells that page's new address", async () => {
  const said = await keptSaid()

  expect(said.refused).toBe(null)
  expect(bodiesIn(said, KEPT_WORLD.base).get(SPELLER_CODE) ?? "").toContain(`"${CARRIED}/one"`)
})

const OWNED_TYPE = "akasha/days/long-day.page-type.ts"

const OWNED_WORKED = "akasha/days/long-day.page-type.worked.ts"

const OWNED_LANDS = "akasha/days/day.page-type.ts"

const OWNED_PAGE = "akasha/days/pages/one/long-day-one.long-day.ts"

const OWNED_PAGE_LANDS = "akasha/days/pages/one/long-day-one.day.ts"

const OWNED_TYPE_BODY = `export type LongDay = { readonly id: string }

${pageOf({
  id: idOf("a"),
  pageTypeSlug: "page-type",
  slug: "long-day",
  pluralSlug: "long-days",
  extendsSlug: ["page-type/page"],
  worked: "ts",
})}`

const OWNED_PAGE_BODY = `import type { LongDay } from "../../long-day.page-type.ts"

export const longDayOne = {
  id: "${idOf("b")}",
  pageTypeSlug: "long-day",
  slug: "long-day-one",
} as const satisfies LongDay
`

function ownedRepo(): string {
  return indexedRepo({
    [OWNED_TYPE]: OWNED_TYPE_BODY,
    [OWNED_WORKED]: "export type WorkedLongDay = { readonly id: string }\n",
    [OWNED_PAGE]: OWNED_PAGE_BODY,
  })
}

const OWNED_ASKED = { at: OWNED_TYPE, to: "day", plural: "days" }

test("a page type whose folder already names its new plural keeps that folder", async () => {
  const said = await runChange(worldIn(ownedRepo()), OWNED_ASKED)
  const paths = pathsIn(said)

  expect(said.refused).toBe(null)
  expect(paths).toContain(OWNED_LANDS)
  expect(paths).toContain(OWNED_PAGE_LANDS)
})

const HELD_TYPE = "akasha/held.page-type.ts"

const HELD_WORKED = "akasha/held.page-type.worked.ts"

const HELD_WORKED_LANDS = "akasha/borne.page-type.worked.ts"

const HELD_READER_PAGE = "akasha/reader.module.ts"

const HELD_READER_CODE = "akasha/reader.module.code.ts"

const HELD_TYPE_BODY = `export type Held = { readonly id: string }

${pageOf({
  id: idOf("g"),
  pageTypeSlug: "page-type",
  slug: "held",
  pluralSlug: "helds",
  extendsSlug: ["page-type/page"],
  worked: "ts",
})}`

const HELD_READER_BODY = `import type { WorkedHeld } from "./held.page-type.worked.ts"

export function idIn(one: WorkedHeld): string {
  return one.id
}
`

const WORKED_PROPERTY = "akasha/worked.file-property.ts"

function heldRepo(): string {
  return indexedRepo({
    [WORKED_PROPERTY]: pageOf({
      id: idOf("9"),
      pageTypeSlug: "file-property",
      slug: "worked",
      propertySlug: "worked",
    }),
    [HELD_TYPE]: HELD_TYPE_BODY,
    [HELD_WORKED]: "export type WorkedHeld = { readonly id: string }\n",
    [HELD_READER_PAGE]: pageOf({
      id: idOf("h"),
      pageTypeSlug: "module",
      slug: "reader",
      code: "ts",
    }),
    [HELD_READER_CODE]: HELD_READER_BODY,
  })
}

const HELD_ASKED = { at: HELD_TYPE, to: "borne", plural: "bornes" }

test("the type a page type's worked file exports is spelled from the new slug", async () => {
  const world = worldIn(heldRepo())
  const said = await runChange(world, HELD_ASKED)
  const bodies = bodiesIn(said, world.base)

  expect(said.refused).toBe(null)
  expect(bodies.get(HELD_WORKED_LANDS) ?? "").toContain("export type WorkedBorne")
  expect(bodies.get(HELD_READER_CODE) ?? "").toContain("WorkedBorne")
  expect(bodies.get(HELD_READER_CODE) ?? "").not.toContain("WorkedHeld")
})

const BARE_TYPE = "akasha/bare.page-type.ts"

const BARE_BODY = `export type Bare = { readonly id: string }

${pageOf({
  id: idOf("c"),
  pageTypeSlug: "page-type",
  slug: "bare",
  pluralSlug: "bares",
  extendsSlug: ["page-type/page"],
})}`

const BARE_ASKED = { at: BARE_TYPE, to: CARRIED, plural: "carrieds" }

test("every page's address is restated over one reading of the bodies", async () => {
  const counted = counting()
  const said = await runChange(worldIn(KEPT_ROOT, counted.runs), ASKED)

  expect(said.refused).toBe(null)
  expect(counted.called()).toBe(1)
})

test("a page type carrying no page has no address restated", async () => {
  const counted = counting()
  const root = indexedRepo({ [BARE_TYPE]: BARE_BODY })
  const said = await runChange(worldIn(root, counted.runs), BARE_ASKED)

  expect(said.refused).toBe(null)
  expect(counted.called()).toBe(0)
})
