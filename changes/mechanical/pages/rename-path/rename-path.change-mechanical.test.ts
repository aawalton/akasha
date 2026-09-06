import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { gathered } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../../../modules/change-answer/change-answer.module.types.ts"
import { worldAt, worldOver } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { renamePath } from "./rename-path.change-mechanical.code.ts"

afterAll(scratch.sweep)

const KEPT = "akasha/one/kept.module.code.ts"

const CARRIED = "akasha/one/carried.module.code.ts"

const NOTHING = (): null => null

function pathsOf(said: Answer): readonly string[] {
  return said.edits.map((one) => one.path).sort()
}

function bodyIn(said: Answer, path: string): string | null | undefined {
  return said.edits.find((one) => one.path === path)?.body
}

function movesOf(said: Answer): readonly Edit[] {
  return said.edits.filter((one) => one.from !== undefined)
}

test("the path it already sits at is refused", () => {
  const world = worldAt(scratch.rootFor("rename-path-"), NOTHING)
  const said = renamePath(world, { from: KEPT, to: KEPT })
  expect(said.refused).toBe("`akasha/one/kept.module.code.ts` is the path it already sits at")
})

test("a body that could not be read is refused", () => {
  const world = worldAt(scratch.rootFor("rename-path-"), NOTHING)
  const said = renamePath(world, { from: HELD_CODE, to: KEPT })
  expect(said.refused).toBe(`\`${HELD_CODE}\` could not be read`)
})

test("a body already at the path it would move to is refused", () => {
  const root = indexedRepo()
  const said = renamePath(worldAt(root, textIn(root)), { from: HELD_CODE, to: NAMER_CODE })
  expect(said.refused).toBe(`\`${NAMER_CODE}\` is a body already`)
})

test("an index that cannot answer refuses rather than narrowing the reach", () => {
  const held = (path: string): string | null =>
    path === HELD_CODE ? "export const kept = 1\n" : null
  const world = worldAt(scratch.rootFor("rename-path-"), held)
  const said = renamePath(world, { from: HELD_CODE, to: KEPT })
  expect(said.edits).toEqual([])
  expect(said.refused).toContain("so none were repointed")
})

test("a path that moves carries its importer with it", () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = renamePath(worldAt(root, text), { from: HELD_CODE, to: KEPT })
  expect(said.refused).toBe(null)
  expect(pathsOf(said)).toEqual([KEPT, NAMER_CODE].sort())
  expect(bodyIn(said, NAMER_CODE)).toContain("../one/kept.module.code.ts")
})

test("the path taken away is answered as the move the body arrives by", () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = renamePath(worldAt(root, text), { from: HELD_CODE, to: KEPT })
  const moves = movesOf(said)
  expect(moves).toHaveLength(1)
  expect(moves[0]?.from).toBe(HELD_CODE)
  expect(moves[0]?.path).toBe(KEPT)
  expect(moves[0]?.was).toBe(text(HELD_CODE))
})

test("a move off a path the move before it made reads that path and its importers", () => {
  const root = indexedRepo()
  const text = textIn(root)
  const world = worldAt(root, text)
  const first = renamePath(world, { from: HELD_CODE, to: KEPT })
  expect(first.refused).toBe(null)
  const said = renamePath(worldOver(world, gathered([first])), { from: KEPT, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(pathsOf(said)).toEqual([CARRIED, NAMER_CODE].sort())
  expect(bodyIn(said, NAMER_CODE)).toContain("../one/carried.module.code.ts")
  expect(movesOf(said)[0]?.from).toBe(KEPT)
})
