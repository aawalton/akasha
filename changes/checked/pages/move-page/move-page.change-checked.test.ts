import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_PAGE,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { type World, worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { movePage } from "./move-page.change-checked.code.ts"

afterAll(scratch.sweep)

const INTO = "akasha/three"

const MOVED_PAGE = "akasha/three/held.module.ts"

const MOVED_CODE = "akasha/three/held.module.code.ts"

function worldIn(root: string): World {
  return worldAt(root, textIn(root))
}

test("a page carried into another folder carries the files beside that page", () => {
  const said = movePage(worldIn(indexedRepo()), { at: HELD_PAGE, to: INTO })
  const paths = said.edits.map((one) => one.path)

  expect(said.refused).toBeNull()
  expect(paths).toContain(MOVED_PAGE)
  expect(paths).toContain(MOVED_CODE)
})

test("every path that moved says the path the move came from", () => {
  const said = movePage(worldIn(indexedRepo()), { at: HELD_PAGE, to: INTO })
  const came = said.edits.map((one) => one.from).filter((one) => one !== undefined)

  expect([...came].sort()).toEqual([HELD_CODE, HELD_PAGE])
})

test("a body naming a path that moved is repointed in the same answer", () => {
  const said = movePage(worldIn(indexedRepo()), { at: HELD_PAGE, to: INTO })
  const one = said.edits.find((edit) => edit.path === NAMER_CODE)

  expect(one?.body ?? "").toContain("../three/held.module.code.ts")
})

test("the folder a page already sits in is refused rather than carried", () => {
  const said = movePage(worldIn(indexedRepo()), { at: HELD_PAGE, to: "akasha/one" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/already sits in/)
})

test("a path naming no page is refused and answers no edit", () => {
  const said = movePage(worldIn(indexedRepo()), { at: "akasha/one/nobody.module.ts", to: INTO })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no page/)
})
