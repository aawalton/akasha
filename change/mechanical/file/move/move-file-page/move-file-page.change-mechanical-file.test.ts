import { afterAll, expect, test } from "bun:test"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { moveFileCode } from "akasha/change/mechanical/file/move/move-file-code/move-file-code.change-mechanical.ts"
import {
  carriedIn,
  landingFor,
  runChange,
} from "akasha/change/mechanical/file/move/move-file-page/move-file-page.change-mechanical-file.code.ts"
import { changeMechanicalFolder } from "akasha/change/mechanical/folder/change-mechanical-folder.page-type.ts"
import { moveFolder } from "akasha/change/mechanical/folder/move-folder/move-folder.change-mechanical-folder.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type World,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  HELD_CODE,
  HELD_PAGE,
  idOf,
  indexedRepo,
  NAMER_CODE,
  pageOf,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

afterAll(scratch.sweep)

const INTO = "akasha/carried/held.module.ts"

const CARRIED_PAGE = "akasha/carried/held.module.ts"

const CARRIED_CODE = "akasha/carried/held.module.code.ts"

const BARE_PAGE = "akasha/five/bare.module.ts"

const BARE_INTO = "akasha/carried/bare.module.ts"

function worldIn(root: string, reached: string[] = []): World {
  return worldAt(root, textIn(root), (world, at, given) => {
    reached.push(at)
    return running(world, at, given)
  })
}

function movesOf(said: Answer): readonly (readonly [string, string])[] {
  return said.edits.flatMap((one) => (one.kind === "move" ? [[one.pathFrom, one.pathTo]] : []))
}

test("a file beside the page lands under its own name in the folder the page lands in", () => {
  expect(landingFor(HELD_CODE, INTO)).toBe(CARRIED_CODE)
})

test("the file naming what imports the page is carried after every other file", () => {
  const references = "akasha/one/held.module.referenced-by.jsonl"
  const fixtures = "akasha/one/held.module.test-fixtures.ts"

  expect(carriedIn([HELD_PAGE, fixtures, references, HELD_CODE], HELD_PAGE)).toEqual([
    fixtures,
    HELD_CODE,
    HELD_PAGE,
    references,
  ])
})

test("a landing naming the page anew is refused", async () => {
  const said = await runChange(worldIn(indexedRepo()), {
    from: HELD_PAGE,
    to: "akasha/carried/carried.module.ts",
  })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`akasha/carried/carried.module.ts` names the page anew, and a carry keeps the name a page has"
  )
})

test("a path naming no page is refused", async () => {
  const said = await runChange(worldIn(indexedRepo()), {
    from: "akasha/gone/gone.module.ts",
    to: "akasha/carried/gone.module.ts",
  })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`akasha/gone/gone.module.ts` names no page, so no page is carried")
})

test("the page and every file beside the page are carried together", async () => {
  const said = await runChange(worldIn(indexedRepo()), { from: HELD_PAGE, to: INTO })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [HELD_CODE, CARRIED_CODE],
    [HELD_PAGE, CARRIED_PAGE],
  ])
})

test("a body importing a file beside the page names the path that file landed at", async () => {
  const root = indexedRepo()
  const said = await runChange(worldIn(root), { from: HELD_PAGE, to: INTO })
  expect(said.refused).toBe(null)
  expect(bodiesIn(said, textIn(root)).get(NAMER_CODE) ?? "").toContain(
    "../carried/held.module.code.ts"
  )
})

test("each file is carried by the change for the kind of file that file is", async () => {
  const reached: string[] = []
  await runChange(worldIn(indexedRepo(), reached), { from: HELD_PAGE, to: INTO })
  const address = `${changeMechanical.slug}/${moveFileCode.slug}`

  expect(reached.filter((one) => one === address)).toHaveLength(2)
})

const MODULE = "module"

const ROUTES_AT = ".react-router"

const FOLDER_PAGE = "akasha/seven/foldered.module.ts"

const FOLDER_INTO = "akasha/carried/foldered.module.ts"

const FOLDER_HELD = `akasha/seven/${ROUTES_AT}/types/routes.ts`

const FOLDER_LANDED = `akasha/carried/${ROUTES_AT}/types/routes.ts`

function folderingPage(routes: boolean): Readonly<Record<string, string>> {
  return {
    [FOLDER_PAGE]: pageOf({
      id: idOf("e"),
      type: `${pageType.slug}/${MODULE}`,
      slug: "foldered",
      definition: "a page claiming a folder of its own",
      code: "ts",
      routes,
    }),
  }
}

function folderingWorld(root: string, reached: string[] = []): World {
  const world = worldIn(root, reached)
  return {
    ...world,
    index: {
      ...world.index,
      folderPropertiesAt: () => new Map([[MODULE, new Map([["routes", ROUTES_AT]])]]),
    },
  }
}

test("a folder the page claims is carried to the folder the page lands in", async () => {
  const root = indexedRepo({ ...folderingPage(true), [FOLDER_HELD]: "export const routes = 1\n" })
  const said = await runChange(folderingWorld(root), { from: FOLDER_PAGE, to: FOLDER_INTO })

  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [FOLDER_PAGE, FOLDER_INTO],
    [FOLDER_HELD, FOLDER_LANDED],
  ])
})

test("that carry is left to the change moving a folder", async () => {
  const reached: string[] = []
  const root = indexedRepo({ ...folderingPage(true), [FOLDER_HELD]: "export const routes = 1\n" })
  await runChange(folderingWorld(root, reached), { from: FOLDER_PAGE, to: FOLDER_INTO })
  const address = `${changeMechanicalFolder.slug}/${moveFolder.slug}`

  expect(reached.filter((one) => one === address)).toHaveLength(1)
})

test("a folder the world holds no file under is left out of that answer", async () => {
  const root = indexedRepo(folderingPage(true))
  const said = await runChange(folderingWorld(root), { from: FOLDER_PAGE, to: FOLDER_INTO })

  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([[FOLDER_PAGE, FOLDER_INTO]])
})

test("a file the page claims and no body sits at is passed over", async () => {
  const root = indexedRepo({
    [BARE_PAGE]: pageOf({
      id: idOf("d"),
      type: `${pageType.slug}/module`,
      slug: "bare",
      definition: "a page claiming a file no body sits at",
      code: "ts",
    }),
  })
  const said = await runChange(worldIn(root), { from: BARE_PAGE, to: BARE_INTO })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([[BARE_PAGE, BARE_INTO]])
})
