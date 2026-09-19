import { afterAll, expect, test } from "bun:test"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { runChange } from "akasha/change/mechanical/file/change-page-page-type/change-page-page-type.change-mechanical.code.ts"
import { moveFile } from "akasha/change/mechanical/file/move/move-file/move-file.change-mechanical-file.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type World,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  bodyOf,
  idOf,
  indexedRepo,
  pageOf,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

afterAll(scratch.sweep)

const PAGE_AT = `${pageType.slug}/${page.slug}` as const

const KEPT_TYPE = "akasha/kept.page-type.ts"

const SPARE_TYPE = "akasha/spare.page-type.ts"

const ONE_PAGE = "akasha/kept/one.kept.ts"

const ONE_MOVED = "akasha/kept/one.spare.ts"

const ONE_CODE = "akasha/kept/one.kept.code.ts"

const ONE_CODE_MOVED = "akasha/kept/one.spare.code.ts"

const ROUTES_TYPE = "akasha/routes.file-property.ts"

const ROUTES_AT = "akasha/kept/routes.ts"

const ROUTES_BODY = `export const routes = []\n`

const ONE_CODE_BODY = `import { one } from "./one.kept.ts"

export const held = one.slug
`

const ONE_BODY = `import type { Kept } from "../kept.page-type.ts"

export const one = {
  id: "${idOf("1")}",
  pageTypeSlug: "kept",
  slug: "one",
  code: "ts",
  routes: "ts",
  definition: "a page stated as another page type",
} as const satisfies Kept
`

function typeBody(slug: string, at: string): string {
  return bodyOf({
    id: idOf(at),
    pageTypeSlug: "page-type",
    slug,
    pluralSlug: `${slug}s`,
    extendsSlug: [PAGE_AT],
    properties: [
      { pagePropertySlug: "file-property/code", required: false, many: false },
      { pagePropertySlug: "file-property/routes", required: false, many: false },
    ],
  })
}

function repoIn(): string {
  return indexedRepo({
    [KEPT_TYPE]: typeBody("kept", "e"),
    [SPARE_TYPE]: typeBody("spare", "f"),
    [ROUTES_TYPE]: pageOf({
      id: idOf("g"),
      pageTypeSlug: "file-property",
      slug: "routes",
      propertySlug: "routes",
      fileName: "routes.ts",
    }),
    [ONE_PAGE]: ONE_BODY,
    [ONE_CODE]: ONE_CODE_BODY,
    [ROUTES_AT]: ROUTES_BODY,
  })
}

function worldIn(root: string): World {
  return worldAt(root, textIn(root), running)
}

test("a page stated as another page type is carried to the name that type spells", async () => {
  const said = await runChange(worldIn(repoIn()), { at: ONE_PAGE, to: SPARE_TYPE })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(ONE_MOVED)
})

test("the page type a page states is restated in the body", async () => {
  const world = worldIn(repoIn())
  const said = await runChange(world, { at: ONE_PAGE, to: SPARE_TYPE })
  const body = bodiesIn(said, world.base).get(ONE_MOVED) ?? ""

  expect(body).toContain(`pageTypeSlug: "page-type/spare"`)
  expect(body).toContain("satisfies Spare")
  expect(body).toContain(`from "akasha/${SPARE_TYPE}"`)
})

test("a moved body naming another moved path is repointed in the same answer", async () => {
  const world = worldIn(repoIn())
  const said = await runChange(world, { at: ONE_PAGE, to: SPARE_TYPE })

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_CODE_MOVED) ?? "").toContain(`from "./one.spare.ts"`)
})

test("a file whose name a property fixes is left where that file is", async () => {
  const said = await runChange(worldIn(repoIn()), { at: ONE_PAGE, to: SPARE_TYPE })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).not.toContain(ROUTES_AT)
})

test("the page type a page already is refuses rather than carrying the page", async () => {
  const said = await runChange(worldIn(repoIn()), { at: ONE_PAGE, to: KEPT_TYPE })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/the page already is/)
})

test("a path naming no page refuses and answers no edit", async () => {
  const said = await runChange(worldIn(repoIn()), {
    at: "akasha/kept/nobody.kept.ts",
    to: SPARE_TYPE,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no page/)
})

test("a page type whose page holds no body refuses", async () => {
  const said = await runChange(worldIn(repoIn()), {
    at: ONE_PAGE,
    to: "akasha/nowhere.page-type.ts",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no body/)
})

test("the file moved is moved by the rung this change reaches", async () => {
  const reached: string[] = []
  const root = repoIn()
  const world = worldAt(root, textIn(root), (over, at, given) => {
    reached.push(at)
    return running(over, at, given)
  })

  const said = await runChange(world, { at: ONE_PAGE, to: SPARE_TYPE })

  expect(said.refused).toBeNull()
  expect(new Set(reached)).toEqual(new Set([`${changeMechanicalFile.slug}/${moveFile.slug}`]))
})
