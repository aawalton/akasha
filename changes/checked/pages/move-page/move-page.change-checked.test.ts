import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_PAGE,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { runChange as renameImports } from "../../../mechanical/pages/rename-imports/rename-imports.change-mechanical.code.ts"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import { type World, worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { movePage } from "./move-page.change-checked.code.ts"

afterAll(scratch.sweep)

const INTO = "akasha/three"

const MOVED_PAGE = "akasha/three/held.module.ts"

const MOVED_CODE = "akasha/three/held.module.code.ts"

function worldIn(root: string): World {
  return worldAt(root, textIn(root), (world, at, given) => {
    if (at === "change-mechanical/rename-imports") {
      return Promise.resolve(renameImports(world, given as Parameters<typeof renameImports>[1]))
    }
    return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
  })
}

test("a page carried into another folder carries the files beside that page", async () => {
  const said = await movePage(worldIn(indexedRepo()), { at: HELD_PAGE, to: INTO })
  const paths = said.edits.map((one) => one.path)

  expect(said.refused).toBeNull()
  expect(paths).toContain(MOVED_PAGE)
  expect(paths).toContain(MOVED_CODE)
})

test("every path that moved says the path the move came from", async () => {
  const said = await movePage(worldIn(indexedRepo()), { at: HELD_PAGE, to: INTO })
  const came = said.edits.map((one) => one.from).filter((one) => one !== undefined)

  expect([...came].sort()).toEqual([HELD_CODE, HELD_PAGE])
})

test("a body naming a path that moved is repointed in the same answer", async () => {
  const said = await movePage(worldIn(indexedRepo()), { at: HELD_PAGE, to: INTO })
  const one = said.edits.find((edit) => edit.path === NAMER_CODE)

  expect(one?.body ?? "").toContain("../three/held.module.code.ts")
})

test("the folder a page already sits in is refused rather than carried", async () => {
  const said = await movePage(worldIn(indexedRepo()), { at: HELD_PAGE, to: "akasha/one" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/already sits in/)
})

test("a path naming no page is refused and answers no edit", async () => {
  const said = await movePage(worldIn(indexedRepo()), {
    at: "akasha/one/nobody.module.ts",
    to: INTO,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no page/)
})

test("each body that moves is repointed by the change reached at its address", async () => {
  const reached: string[] = []
  const root = indexedRepo()
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await movePage(world, { at: HELD_PAGE, to: INTO })

  expect(new Set(reached)).toEqual(new Set(["change-mechanical/rename-imports"]))
})
