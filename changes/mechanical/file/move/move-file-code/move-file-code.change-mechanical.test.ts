import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import {
  type BodyOf,
  gathered,
  refusing,
} from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer, Moving } from "../../../../modules/answer/change-answer.module.types.ts"
import {
  bodiesIn,
  type World,
  worldAt,
  worldOver,
} from "../../../../modules/shadow/change-shadow.module.code.ts"
import { runChange as changeImports } from "../../../file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { runChange as moveFile } from "../move-file/move-file.change-mechanical-file.code.ts"
import { runChange } from "./move-file-code.change-mechanical.code.ts"

afterAll(scratch.sweep)

const KEPT = "akasha/one/kept.module.code.ts"

const CARRIED = "akasha/one/carried.module.code.ts"

function worldIn(root: string, textOf: (path: string) => string | null): World {
  return worldAt(root, textOf, (world, at, given) => {
    if (at === "change-mechanical-file/move-file") {
      return Promise.resolve(moveFile(world, given as Parameters<typeof moveFile>[1]))
    }
    if (at === "change-mechanical-file-content/change-imports") {
      return Promise.resolve(changeImports(world, given as Parameters<typeof changeImports>[1]))
    }
    return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
  })
}

function pathsOf(said: Answer): readonly string[] {
  return said.edits.map((one) => (one.kind === "move" ? one.pathTo : one.path)).sort()
}

function movesOf(said: Answer): readonly Moving[] {
  return said.edits.flatMap((one) => (one.kind === "move" ? [one] : []))
}

function bodyIn(said: Answer, textOf: BodyOf, path: string): string {
  return bodiesIn(said, textOf).get(path) ?? ""
}

test("a path under no TypeScript name to land at is refused", async () => {
  const world = worldIn(scratch.rootFor("move-file-code-"), () => null)
  const said = await runChange(world, { from: HELD_CODE, to: "akasha/one/kept.md" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`akasha/one/kept.md` is under no TypeScript name, so this change lands nothing"
  )
})

test("the path it already sits at is refused", async () => {
  const world = worldIn(scratch.rootFor("move-file-code-"), () => null)
  const said = await runChange(world, { from: KEPT, to: KEPT })
  expect(said.refused).toBe("`akasha/one/kept.module.code.ts` is the path it already sits at")
})

test("a body that could not be read is refused", async () => {
  const world = worldIn(scratch.rootFor("move-file-code-"), () => null)
  const said = await runChange(world, { from: HELD_CODE, to: KEPT })
  expect(said.refused).toBe(`\`${HELD_CODE}\` could not be read`)
})

test("a body already at the path it would move to is refused", async () => {
  const root = indexedRepo()
  const said = await runChange(worldIn(root, textIn(root)), {
    from: HELD_CODE,
    to: NAMER_CODE,
  })
  expect(said.refused).toBe(`\`${NAMER_CODE}\` is a body already`)
})

test("an index that cannot answer refuses rather than narrowing the reach", async () => {
  const held = (path: string): string | null =>
    path === HELD_CODE ? "export const kept = 1\n" : null
  const world = worldIn(scratch.rootFor("move-file-code-"), held)
  const said = await runChange(world, { from: HELD_CODE, to: KEPT })
  expect(said.edits).toEqual([])
  expect(said.refused).toContain("so none were repointed")
})

test("a path that moves carries its importer with it", async () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = await runChange(worldIn(root, text), { from: HELD_CODE, to: KEPT })
  expect(said.refused).toBe(null)
  expect(pathsOf(said)).toEqual([KEPT, NAMER_CODE].sort())
  expect(bodyIn(said, text, NAMER_CODE)).toContain("../one/kept.module.code.ts")
})

test("the path taken away is answered as the move the body arrives by", async () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = await runChange(worldIn(root, text), { from: HELD_CODE, to: KEPT })
  const moves = movesOf(said)
  expect(moves).toHaveLength(1)
  expect(moves[0]?.pathFrom).toBe(HELD_CODE)
  expect(moves[0]?.pathTo).toBe(KEPT)
  expect(bodyIn(said, text, KEPT)).toBe(text(HELD_CODE) ?? "")
})

test("a move off a path the move before it made reads that path and its importers", async () => {
  const root = indexedRepo()
  const text = textIn(root)
  const world = worldIn(root, text)
  const first = await runChange(world, { from: HELD_CODE, to: KEPT })
  expect(first.refused).toBe(null)
  const over = worldOver(world, gathered([first]))
  const said = await runChange(over, { from: KEPT, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(pathsOf(said)).toEqual([CARRIED, NAMER_CODE].sort())
  expect(bodyIn(said, over.textOf, NAMER_CODE)).toContain("../one/carried.module.code.ts")
  expect(movesOf(said)[0]?.pathFrom).toBe(KEPT)
})

test("the body that moves is repointed by the change reached at its address", async () => {
  const reached: string[] = []
  const root = indexedRepo()
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await runChange(world, { from: HELD_CODE, to: KEPT })

  expect(new Set(reached)).toEqual(
    new Set(["change-mechanical-file/move-file", "change-mechanical-file-content/change-imports"])
  )
})
