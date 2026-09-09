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
import { stating } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer, FileChange } from "../../../modules/answer/change-answer.module.types.ts"
import { guardedBy, NOT_READ } from "../../../modules/guarding/change-guarding.module.code.ts"
import { worldAt } from "../../../modules/shadow/change-shadow.module.code.ts"
import { pageTypeCarriesNoPages } from "./page-type-carries-no-pages.change-guard.code.ts"

afterAll(scratch.sweep)

const GUARDS = [pageTypeCarriesNoPages]

const KEPT_TYPE = "akasha/kept.page-type.ts"

const KEPT_PAGE = "akasha/kept/one.kept.ts"

const OTHER_PAGE = "akasha/kept/two.kept.ts"

const TYPE = bodyOf({
  id: idOf("e"),
  pageTypeSlug: "page-type",
  slug: "kept",
  extends: ["page-type/page"],
})

const PAGE = pageOf({ id: idOf("f"), pageTypeSlug: "kept", slug: "one" })

const OTHER = pageOf({ id: idOf("d"), pageTypeSlug: "kept", slug: "two" })

function takingAway(root: string, paths: readonly string[]): Answer {
  const text = textIn(root)
  const held = (one: string) =>
    paths.includes(one) ? (text(one) ?? "export const held = 1\n") : text(one)
  const edits = paths.map((path): FileChange => ({ kind: "remove", path }))
  return guardedBy(worldAt(root, held), stating(edits), GUARDS)
}

test("a page type a page is still filed under is refused", () => {
  const root = indexedRepo({ [KEPT_TYPE]: TYPE, [KEPT_PAGE]: PAGE })

  const said = takingAway(root, [KEPT_TYPE])

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`kept\` is the page type of 1 page, which goes first — ${KEPT_PAGE}`)
})

test("the refusal names every page filed under the page type", () => {
  const root = indexedRepo({ [KEPT_TYPE]: TYPE, [KEPT_PAGE]: PAGE, [OTHER_PAGE]: OTHER })

  const said = takingAway(root, [KEPT_TYPE])

  expect(said.refused).toBe(
    `\`kept\` is the page type of 2 pages, which go first — ${KEPT_PAGE}, ${OTHER_PAGE}`
  )
})

test("a page type taken away with every page of that page type is not refused", () => {
  const root = indexedRepo({ [KEPT_TYPE]: TYPE, [KEPT_PAGE]: PAGE })

  const said = takingAway(root, [KEPT_TYPE, KEPT_PAGE])

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(2)
})

test("a page type no page is filed under is not refused", () => {
  const root = indexedRepo({ [KEPT_TYPE]: TYPE })

  const said = takingAway(root, [KEPT_TYPE])

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(1)
})

test("a page that is no page type is not refused", () => {
  const root = indexedRepo({ [KEPT_TYPE]: TYPE, [KEPT_PAGE]: PAGE })

  const said = takingAway(root, [NAMER_PAGE])

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(1)
})

test("an index that will not read refuses rather than answering no page", () => {
  const root = scratch.rootFor("carries-no-index-")

  const said = takingAway(root, [KEPT_TYPE])

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(NOT_READ)
})
