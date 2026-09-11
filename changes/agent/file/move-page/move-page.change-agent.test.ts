import { afterAll, expect, test } from "bun:test"
import { movePage } from "akasha/changes/agent/file/move-page/move-page.change-agent.code.ts"
import { MOVING } from "akasha/changes/mechanical/file/move/move-file-of-any-kind/move-file-of-any-kind.change-mechanical.test-fixtures.ts"
import { pathsIn } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type World,
  worldAt,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  HELD_CODE,
  HELD_PAGE,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const INTO = "akasha/three"

const MOVED_PAGE = "akasha/three/held.module.ts"

const MOVED_CODE = "akasha/three/held.module.code.ts"

function worldIn(root: string): World {
  return worldAt(root, textIn(root), MOVING)
}

test("a page carried into another folder carries the files beside that page", async () => {
  const said = await movePage(worldIn(indexedRepo()), { at: HELD_PAGE, to: INTO })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(MOVED_PAGE)
  expect(pathsIn(said)).toContain(MOVED_CODE)
})

test("every path that moved says the path the move came from", async () => {
  const said = await movePage(worldIn(indexedRepo()), { at: HELD_PAGE, to: INTO })
  const came = said.edits.flatMap((one) => (one.kind === "move" ? [one.pathFrom] : []))

  expect([...came].sort()).toEqual([HELD_CODE, HELD_PAGE])
})

test("a file carried with its body unchanged is stated as a move holding no body", async () => {
  const said = await movePage(worldIn(indexedRepo()), { at: HELD_PAGE, to: INTO })

  expect(said.edits.filter((one) => one.kind === "move")).toEqual([
    { kind: "move", pathFrom: HELD_PAGE, pathTo: MOVED_PAGE },
    { kind: "move", pathFrom: HELD_CODE, pathTo: MOVED_CODE },
  ])
})

test("a body naming a path that moved is repointed in the same answer", async () => {
  const world = worldIn(indexedRepo())
  const said = await movePage(world, { at: HELD_PAGE, to: INTO })

  expect(bodiesIn(said, world.base).get(NAMER_CODE) ?? "").toContain("../three/held.module.code.ts")
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

test("the whole carry is left to the change reached at its address", async () => {
  const reached: string[] = []
  const root = indexedRepo()
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await movePage(world, { at: HELD_PAGE, to: INTO })

  expect(reached).toEqual(["change-mechanical/move-file-of-any-kind"])
})
