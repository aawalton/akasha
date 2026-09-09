import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_PAGE,
  idOf,
  indexedRepo,
  NAMER_CODE,
  pageOf,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import {
  bodiesIn,
  type World,
  worldAt,
} from "../../../../modules/shadow/change-shadow.module.code.ts"
import { runChange as changeImports } from "../../../file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { runChange as moveFile } from "../move-file/move-file.change-mechanical-file.code.ts"
import { runChange as moveFileCode } from "../move-file-code/move-file-code.change-mechanical.code.ts"
import { landingFor, runChange } from "./move-file-page.change-mechanical-file.code.ts"

afterAll(scratch.sweep)

const INTO = "akasha/carried/held.module.ts"

const CARRIED_PAGE = "akasha/carried/held.module.ts"

const CARRIED_CODE = "akasha/carried/held.module.code.ts"

const BARE_PAGE = "akasha/five/bare.module.ts"

const BARE_INTO = "akasha/carried/bare.module.ts"

function worldIn(root: string, reached: string[] = []): World {
  return worldAt(root, textIn(root), async (world, at, given) => {
    reached.push(at)
    if (at === "change-mechanical-file/move-file") {
      return moveFile(world, given as Parameters<typeof moveFile>[1])
    }
    if (at === "change-mechanical/move-file-code") {
      return await moveFileCode(world, given as Parameters<typeof moveFileCode>[1])
    }
    if (at === "change-mechanical-file-content/change-imports") {
      return changeImports(world, given as Parameters<typeof changeImports>[1])
    }
    return refusing(`\`${at}\` is reached by nothing here`)
  })
}

function movesOf(said: Answer): readonly (readonly [string, string])[] {
  return said.edits.flatMap((one) => (one.kind === "move" ? [[one.pathFrom, one.pathTo]] : []))
}

test("a file beside the page lands under its own name in the folder the page lands in", () => {
  expect(landingFor(HELD_CODE, INTO)).toBe(CARRIED_CODE)
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
    [HELD_PAGE, CARRIED_PAGE],
    [HELD_CODE, CARRIED_CODE],
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
  expect(reached.filter((one) => one === "change-mechanical/move-file-code")).toHaveLength(2)
})

test("a file the page claims and no body sits at is passed over", async () => {
  const root = indexedRepo({
    [BARE_PAGE]: pageOf({
      id: idOf("d"),
      pageTypeSlug: "module",
      slug: "bare",
      definition: "a page claiming a file no body sits at",
      code: "ts",
    }),
  })
  const said = await runChange(worldIn(root), { from: BARE_PAGE, to: BARE_INTO })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([[BARE_PAGE, BARE_INTO]])
})
