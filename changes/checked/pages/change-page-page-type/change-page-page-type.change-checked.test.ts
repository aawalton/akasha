import { afterAll, expect, test } from "bun:test"
import { bodyOf, idOf, indexedRepo, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { type World, worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { changePagePageType } from "./change-page-page-type.change-checked.code.ts"

afterAll(scratch.sweep)

const KEPT_TYPE = "akasha/kept.page-type.ts"

const SPARE_TYPE = "akasha/spare.page-type.ts"

const ONE_PAGE = "akasha/kept/one.kept.ts"

const ONE_MOVED = "akasha/kept/one.spare.ts"

const ONE_CODE = "akasha/kept/one.kept.code.ts"

const ONE_CODE_MOVED = "akasha/kept/one.spare.code.ts"

const ONE_CODE_BODY = `import { one } from "./one.kept.ts"

export const held = one.slug
`

const ONE_BODY = `import type { Kept } from "../kept.page-type.ts"

export const one = {
  id: "${idOf("1")}",
  pageTypeSlug: "kept",
  slug: "one",
  code: "ts",
  definition: "a page stated as another page type",
} as const satisfies Kept
`

function typeBody(slug: string, at: string): string {
  return bodyOf({
    id: idOf(at),
    pageTypeSlug: "page-type",
    slug,
    pluralSlug: `${slug}s`,
    extendsSlug: ["page-type/page"],
    properties: [{ pagePropertySlug: "file-property/code", required: false, many: false }],
  })
}

function repoIn(): string {
  return indexedRepo({
    [KEPT_TYPE]: typeBody("kept", "e"),
    [SPARE_TYPE]: typeBody("spare", "f"),
    [ONE_PAGE]: ONE_BODY,
    [ONE_CODE]: ONE_CODE_BODY,
  })
}

function worldIn(root: string): World {
  return worldAt(root, textIn(root))
}

test("a page stated as another page type is carried to the name that type spells", () => {
  const said = changePagePageType(worldIn(repoIn()), { at: ONE_PAGE, to: SPARE_TYPE })

  expect(said.refused).toBeNull()
  expect(said.edits.map((one) => one.path)).toContain(ONE_MOVED)
})

test("the page type a page states is restated in the body", () => {
  const said = changePagePageType(worldIn(repoIn()), { at: ONE_PAGE, to: SPARE_TYPE })
  const one = said.edits.find((edit) => edit.path === ONE_MOVED)

  expect(one?.body ?? "").toContain(`pageTypeSlug: "spare"`)
  expect(one?.body ?? "").toContain("satisfies Spare")
  expect(one?.body ?? "").toContain(`from "../spare.page-type.ts"`)
})

test("a moved body naming another moved path is repointed in the same answer", () => {
  const said = changePagePageType(worldIn(repoIn()), { at: ONE_PAGE, to: SPARE_TYPE })
  const one = said.edits.find((edit) => edit.path === ONE_CODE_MOVED)

  expect(said.refused).toBeNull()
  expect(one?.body ?? "").toContain(`from "./one.spare.ts"`)
})

test("the page type a page already is refuses rather than carrying the page", () => {
  const said = changePagePageType(worldIn(repoIn()), { at: ONE_PAGE, to: KEPT_TYPE })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/the page already is/)
})

test("a path naming no page refuses and answers no edit", () => {
  const said = changePagePageType(worldIn(repoIn()), {
    at: "akasha/kept/nobody.kept.ts",
    to: SPARE_TYPE,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no page/)
})

test("a page type whose page holds no body refuses", () => {
  const said = changePagePageType(worldIn(repoIn()), {
    at: ONE_PAGE,
    to: "akasha/nowhere.page-type.ts",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no body/)
})
