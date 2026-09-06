import { afterAll, expect, test } from "bun:test"
import {
  bodyOf,
  idOf,
  indexedRepo,
  NAMER_PAGE,
  pageOf,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { type World, worldAt } from "../../modules/change-shadow/change-shadow.module.code.ts"
import { carryingIn, removePageType } from "./remove-page-type.change-mechanical.code.ts"

afterAll(scratch.sweep)

const KEPT_TYPE = "akasha/kept.page-type.ts"

const KEPT_PAGE = "akasha/kept/one.kept.ts"

const HOLDER_PAGE = "akasha/four/holder.module.ts"

const NOWHERE = "akasha/one/missing.page-type.ts"

const TYPE = bodyOf({
  id: idOf("e"),
  pageTypeSlug: "page-type",
  slug: "kept",
  extendsSlug: ["page-type/page"],
})

const PAGE = pageOf({ id: idOf("f"), pageTypeSlug: "kept", slug: "one" })

function worldIn(root: string): World {
  return worldAt(root, textIn(root))
}

function naming(named: string): string {
  return pageOf({
    id: idOf("0"),
    pageTypeSlug: "module",
    slug: "holder",
    definition: "a page naming the page type in part-slugs",
    partSlugs: [named],
  })
}

function bodyIn(
  said: { readonly edits: readonly { readonly path: string; readonly body: string | null }[] },
  at: string
): string {
  return said.edits.find((one) => one.path === at)?.body ?? ""
}

test("a page type the index files pages under is refused, and the refusal names those pages", () => {
  const root = indexedRepo({ [KEPT_TYPE]: TYPE, [KEPT_PAGE]: PAGE })

  const said = removePageType(worldIn(root), { at: KEPT_TYPE })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(KEPT_PAGE)
})

test("a page type no page is filed under goes with the files beside that page type", () => {
  const root = indexedRepo({ [KEPT_TYPE]: TYPE })

  const said = removePageType(worldIn(root), { at: KEPT_TYPE })

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path)).toEqual([KEPT_TYPE])
  expect(said.edits[0]?.body).toBe(null)
})

test("which pages a page type is the page type of is read from the values the index files", () => {
  const root = indexedRepo({ [KEPT_TYPE]: TYPE, [KEPT_PAGE]: PAGE })

  expect(carryingIn(worldIn(root), "kept")).toEqual([KEPT_PAGE])
  expect(carryingIn(worldIn(root), "bare")).toEqual([])
})

test("a path the world names no page type at is refused", () => {
  const root = indexedRepo()

  const said = removePageType(worldIn(root), { at: NOWHERE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${NOWHERE}\` names no page type, so no page type is taken away`)
})

test("a page that is no page type is refused rather than taken away", () => {
  const root = indexedRepo()

  const said = removePageType(worldIn(root), { at: NAMER_PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${NAMER_PAGE}\` names no page type, so no page type is taken away`)
})

test("the page type and the parent's entry for that page type go in one answer", () => {
  const root = indexedRepo({ [KEPT_TYPE]: TYPE, [HOLDER_PAGE]: naming("page-type/kept") })

  const said = removePageType(worldIn(root), { at: KEPT_TYPE })

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([HOLDER_PAGE, KEPT_TYPE])
  expect(bodyIn(said, HOLDER_PAGE)).toContain('"partSlugs": []')
})

test("a parent naming the page type bare rather than qualified loses that entry too", () => {
  const root = indexedRepo({ [KEPT_TYPE]: TYPE, [HOLDER_PAGE]: naming("kept") })

  const said = removePageType(worldIn(root), { at: KEPT_TYPE })

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([HOLDER_PAGE, KEPT_TYPE])
  expect(bodyIn(said, HOLDER_PAGE)).toContain('"partSlugs": []')
})
