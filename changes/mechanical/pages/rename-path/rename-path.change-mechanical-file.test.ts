import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { gathered, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  type World,
  worldAt,
  worldOver,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange as changeImports } from "../change-imports/change-imports.change-mechanical-code.code.ts"
import { renamePath } from "./rename-path.change-mechanical-file.code.ts"

afterAll(scratch.sweep)

const KEPT = "akasha/one/kept.module.code.ts"

const CARRIED = "akasha/one/carried.module.code.ts"

function worldIn(root: string, textOf: (path: string) => string | null): World {
  return worldAt(root, textOf, (world, at, given) => {
    if (at === "change-mechanical-code/change-imports") {
      return Promise.resolve(changeImports(world, given as Parameters<typeof changeImports>[1]))
    }
    return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
  })
}

function pathsOf(said: Answer): readonly string[] {
  return said.edits.map((one) => one.path).sort()
}

function movesOf(said: Answer): readonly Edit[] {
  return said.edits.filter((one) => one.from !== undefined)
}

test("the path it already sits at is refused", async () => {
  const world = worldIn(scratch.rootFor("rename-path-"), () => null)
  const said = await renamePath(world, { from: KEPT, to: KEPT })
  expect(said.refused).toBe("`akasha/one/kept.module.code.ts` is the path it already sits at")
})

test("a body that could not be read is refused", async () => {
  const world = worldIn(scratch.rootFor("rename-path-"), () => null)
  const said = await renamePath(world, { from: HELD_CODE, to: KEPT })
  expect(said.refused).toBe(`\`${HELD_CODE}\` could not be read`)
})

test("a body already at the path it would move to is refused", async () => {
  const root = indexedRepo()
  const said = await renamePath(worldIn(root, textIn(root)), {
    from: HELD_CODE,
    to: NAMER_CODE,
  })
  expect(said.refused).toBe(`\`${NAMER_CODE}\` is a body already`)
})

test("an index that cannot answer refuses rather than narrowing the reach", async () => {
  const held = (path: string): string | null =>
    path === HELD_CODE ? "export const kept = 1\n" : null
  const world = worldIn(scratch.rootFor("rename-path-"), held)
  const said = await renamePath(world, { from: HELD_CODE, to: KEPT })
  expect(said.edits).toEqual([])
  expect(said.refused).toContain("so none were repointed")
})

test("a path that moves carries its importer with it", async () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = await renamePath(worldIn(root, text), { from: HELD_CODE, to: KEPT })
  expect(said.refused).toBe(null)
  expect(pathsOf(said)).toEqual([KEPT, NAMER_CODE].sort())
  expect(said.edits.find((one) => one.path === NAMER_CODE)?.body).toContain(
    "../one/kept.module.code.ts"
  )
})

test("the path taken away is answered as the move the body arrives by", async () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = await renamePath(worldIn(root, text), { from: HELD_CODE, to: KEPT })
  const moves = movesOf(said)
  expect(moves).toHaveLength(1)
  expect(moves[0]?.from).toBe(HELD_CODE)
  expect(moves[0]?.path).toBe(KEPT)
  expect(moves[0]?.was).toBe(text(HELD_CODE))
})

test("a move off a path the move before it made reads that path and its importers", async () => {
  const root = indexedRepo()
  const text = textIn(root)
  const world = worldIn(root, text)
  const first = await renamePath(world, { from: HELD_CODE, to: KEPT })
  expect(first.refused).toBe(null)
  const said = await renamePath(worldOver(world, gathered([first])), {
    from: KEPT,
    to: CARRIED,
  })
  expect(said.refused).toBe(null)
  expect(pathsOf(said)).toEqual([CARRIED, NAMER_CODE].sort())
  expect(said.edits.find((one) => one.path === NAMER_CODE)?.body).toContain(
    "../one/carried.module.code.ts"
  )
  expect(movesOf(said)[0]?.from).toBe(KEPT)
})

test("the body that moves is repointed by the change reached at its address", async () => {
  const reached: string[] = []
  const root = indexedRepo()
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await renamePath(world, { from: HELD_CODE, to: KEPT })

  expect(new Set(reached)).toEqual(new Set(["change-mechanical-code/change-imports"]))
})
