import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_PAGE,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { runChange as moveFile } from "../../../mechanical/file/move/move-file/move-file.change-mechanical-file.code.ts"
import { runChange as moveFileCode } from "../../../mechanical/file/move/move-file-code/move-file-code.change-mechanical.code.ts"
import { runChange as moveFileOfAnyKind } from "../../../mechanical/file/move/move-file-of-any-kind/move-file-of-any-kind.change-mechanical.code.ts"
import { runChange as moveFilePage } from "../../../mechanical/file/move/move-file-page/move-file-page.change-mechanical-file.code.ts"
import { runChange as changeImports } from "../../../mechanical/file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { pathsIn, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import { bodiesIn, type World, worldAt } from "../../../modules/shadow/change-shadow.module.code.ts"
import { movePage } from "./move-page.change-agent.code.ts"

afterAll(scratch.sweep)

const INTO = "akasha/three"

const MOVED_PAGE = "akasha/three/held.module.ts"

const MOVED_CODE = "akasha/three/held.module.code.ts"

function worldIn(root: string): World {
  return worldAt(root, textIn(root), async (world, at, given) => {
    if (at === "change-mechanical/move-file-of-any-kind") {
      return await moveFileOfAnyKind(world, given as Parameters<typeof moveFileOfAnyKind>[1])
    }
    if (at === "change-mechanical-file/move-file-page") {
      return await moveFilePage(world, given as Parameters<typeof moveFilePage>[1])
    }
    if (at === "change-mechanical/move-file-code") {
      return await moveFileCode(world, given as Parameters<typeof moveFileCode>[1])
    }
    if (at === "change-mechanical-file/move-file") {
      return moveFile(world, given as Parameters<typeof moveFile>[1])
    }
    if (at === "change-mechanical-file-content/change-imports") {
      return changeImports(world, given as Parameters<typeof changeImports>[1])
    }
    return refusing(`\`${at}\` is reached by nothing here`)
  })
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
