import { afterAll, expect, test } from "bun:test"
import { bodyOf, idOf, indexedRepo, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { runChange as changeFile } from "../../../mechanical/pages/change-file/change-file.change-mechanical.code.ts"
import { runChange as renameImports } from "../../../mechanical/pages/rename-imports/rename-imports.change-mechanical-code.code.ts"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import {
  type Reaching,
  type World,
  worldAt,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
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

const RUNS: Reaching = (world, at, given) => {
  if (at === "change-mechanical/change-file") {
    return Promise.resolve(changeFile(world, given as Parameters<typeof changeFile>[1]))
  }
  if (at === "change-mechanical-code/rename-imports") {
    return Promise.resolve(renameImports(world, given as Parameters<typeof renameImports>[1]))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

function worldIn(root: string): World {
  return worldAt(root, textIn(root), RUNS)
}

test("a page stated as another page type is carried to the name that type spells", async () => {
  const said = await changePagePageType(worldIn(repoIn()), { at: ONE_PAGE, to: SPARE_TYPE })

  expect(said.refused).toBeNull()
  expect(said.edits.map((one) => one.path)).toContain(ONE_MOVED)
})

test("the page type a page states is restated in the body", async () => {
  const said = await changePagePageType(worldIn(repoIn()), { at: ONE_PAGE, to: SPARE_TYPE })
  const one = said.edits.find((edit) => edit.path === ONE_MOVED)

  expect(one?.body ?? "").toContain(`pageTypeSlug: "spare"`)
  expect(one?.body ?? "").toContain("satisfies Spare")
  expect(one?.body ?? "").toContain(`from "../spare.page-type.ts"`)
})

test("a moved body naming another moved path is repointed in the same answer", async () => {
  const said = await changePagePageType(worldIn(repoIn()), { at: ONE_PAGE, to: SPARE_TYPE })
  const one = said.edits.find((edit) => edit.path === ONE_CODE_MOVED)

  expect(said.refused).toBeNull()
  expect(one?.body ?? "").toContain(`from "./one.spare.ts"`)
})

test("the page type a page already is refuses rather than carrying the page", async () => {
  const said = await changePagePageType(worldIn(repoIn()), { at: ONE_PAGE, to: KEPT_TYPE })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/the page already is/)
})

test("a path naming no page refuses and answers no edit", async () => {
  const said = await changePagePageType(worldIn(repoIn()), {
    at: "akasha/kept/nobody.kept.ts",
    to: SPARE_TYPE,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no page/)
})

test("a page type whose page holds no body refuses", async () => {
  const said = await changePagePageType(worldIn(repoIn()), {
    at: ONE_PAGE,
    to: "akasha/nowhere.page-type.ts",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no body/)
})

test("each part of the retype is reached at the address that part names", async () => {
  const reached: string[] = []
  const root = repoIn()
  const world = worldAt(root, textIn(root), (over, at, given) => {
    reached.push(at)
    return RUNS(over, at, given)
  })

  const said = await changePagePageType(world, { at: ONE_PAGE, to: SPARE_TYPE })

  expect(said.refused).toBeNull()
  expect(new Set(reached)).toEqual(
    new Set(["change-mechanical-code/rename-imports", "change-mechanical/change-file"])
  )
})
