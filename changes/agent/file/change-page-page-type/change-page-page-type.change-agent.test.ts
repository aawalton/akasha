import { afterAll, expect, test } from "bun:test"
import { bodyOf, idOf, indexedRepo, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { runChange as moveFile } from "../../../mechanical/file/move/move-file/move-file.change-mechanical-file.code.ts"
import { runChange as changeFile } from "../../../mechanical/file-content/change/change-file-content/change-file-content.change-mechanical-file-content.code.ts"
import { runChange as restatePageType } from "../../../mechanical/file-content/change/change-page-page-type/change-page-page-type.change-mechanical-file-content.code.ts"
import { runChange as changeImports } from "../../../mechanical/file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { runChange as renamePageAddress } from "../../../mechanical/file-content/rename/rename-page-address/rename-page-address.change-mechanical-file-content.code.ts"
import { pathsIn, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
  worldAt,
} from "../../../modules/shadow/change-shadow.module.code.ts"
import { changePagePageType } from "./change-page-page-type.change-agent.code.ts"

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
  if (at === "change-mechanical-file/move-file") {
    return Promise.resolve(moveFile(world, given as Parameters<typeof moveFile>[1]))
  }
  if (at === "change-mechanical-file-content/change-file-content") {
    return Promise.resolve(changeFile(world, given as Parameters<typeof changeFile>[1]))
  }
  if (at === "change-mechanical-file-content/change-page-page-type") {
    return restatePageType(world, given as Parameters<typeof restatePageType>[1])
  }
  if (at === "change-mechanical-file-content/change-imports") {
    return Promise.resolve(changeImports(world, given as Parameters<typeof changeImports>[1]))
  }
  if (at === "change-mechanical-file-content/rename-page-address") {
    return Promise.resolve(
      renamePageAddress(world, given as Parameters<typeof renamePageAddress>[1])
    )
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

function worldIn(root: string): World {
  return worldAt(root, textIn(root), RUNS)
}

test("a page stated as another page type is carried to the name that type spells", async () => {
  const said = await changePagePageType(worldIn(repoIn()), { at: ONE_PAGE, to: SPARE_TYPE })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(ONE_MOVED)
})

test("the page type a page states is restated in the body", async () => {
  const world = worldIn(repoIn())
  const said = await changePagePageType(world, { at: ONE_PAGE, to: SPARE_TYPE })
  const body = bodiesIn(said, world.base).get(ONE_MOVED) ?? ""

  expect(body).toContain(`pageTypeSlug: "spare"`)
  expect(body).toContain("satisfies Spare")
  expect(body).toContain(`from "../spare.page-type.ts"`)
})

test("a moved body naming another moved path is repointed in the same answer", async () => {
  const world = worldIn(repoIn())
  const said = await changePagePageType(world, { at: ONE_PAGE, to: SPARE_TYPE })

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_CODE_MOVED) ?? "").toContain(`from "./one.spare.ts"`)
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
    new Set([
      "change-mechanical-file/move-file",
      "change-mechanical-file-content/change-imports",
      "change-mechanical-file-content/rename-page-address",
      "change-mechanical-file-content/change-page-page-type",
      "change-mechanical-file-content/change-file-content",
    ])
  )
})
