import { afterAll, expect, test } from "bun:test"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { moveFile } from "akasha/change/mechanical/file/move/move-file/move-file.change-mechanical-file.ts"
import { runChange } from "akasha/change/mechanical/file/move/move-file-code/move-file-code.change-mechanical.code.ts"
import {
  type Answer,
  type BodyOf,
  gathered,
  leftAt,
  type Moving,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type World,
  worldAt,
  worldOver,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  listing,
  running,
} from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  carriedPage,
  HELD_CODE,
  idOf,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const KEPT = "akasha/one/kept.module.code.ts"

const CARRIED = "akasha/one/carried.module.code.ts"

const PAGES: Readonly<Record<string, string>> = {
  "akasha/one/kept.module.ts": carriedPage("kept", idOf("d")),
  "akasha/one/carried.module.ts": carriedPage("carried", idOf("e")),
}

function worldIn(root: string, textOf: (path: string) => string | null): World {
  return worldAt(root, textOf, running)
}

function pathsOf(said: Answer): readonly string[] {
  return said.edits.map(leftAt).sort()
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

test("an index naming no importer moves the file and repoints nothing", async () => {
  const held = (path: string): string | null =>
    path === HELD_CODE ? "export const kept = 1\n" : null
  const world = worldIn(scratch.rootFor("move-file-code-"), held)
  const said = await runChange(world, { from: HELD_CODE, to: KEPT })
  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ kind: "move", pathFrom: HELD_CODE, pathTo: KEPT }])
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
  const root = indexedRepo(PAGES)
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

test("the file moves by a rung and the body is repointed by the module", async () => {
  const reached: string[] = []
  const root = indexedRepo()
  const world = worldAt(root, textIn(root), listing(reached))

  await runChange(world, { from: HELD_CODE, to: KEPT })

  expect(new Set(reached)).toEqual(new Set([`${changeMechanicalFile.slug}/${moveFile.slug}`]))
})
