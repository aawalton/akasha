import { afterAll, expect, test } from "bun:test"
import { indexedRepo, pageOf, put, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { runChange as moveFile } from "../../../mechanical/file/move/move-file/move-file.change-mechanical-file.code.ts"
import { pathsIn } from "../../../modules/change-answer/change-answer.module.code.ts"
import { type World, worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { moveFolderBatch, runChange } from "./move-folder-batch.change-agent.code.ts"

afterAll(scratch.sweep)

const FROM = "akasha/four"

const INTO = "akasha/six"

const ALPHA_ID = "01a04a4a-0004-7000-8000-000000000001"

const BETA_ID = "01a04a4a-0004-7000-8000-000000000002"

const GAMMA_ID = "01a04a4a-0004-7000-8000-000000000003"

const pageBody = (slug: string, id: string): string =>
  pageOf({
    id,
    pageTypeSlug: "module",
    slug,
    definition: "a page a carried child holds",
    code: "ts",
  })

const HELD: Readonly<Record<string, string>> = {
  [`${FROM}/alpha/alpha.module.ts`]: pageBody("alpha", ALPHA_ID),
  [`${FROM}/alpha/alpha.module.code.ts`]: "export const alpha = 1\n",
  [`${FROM}/beta/beta.module.ts`]: pageBody("beta", BETA_ID),
  [`${FROM}/beta/beta.module.code.ts`]:
    'import { alpha } from "../alpha/alpha.module.code.ts"\n\nexport const beta = alpha + 1\n',
  [`${FROM}/gamma/gamma.module.ts`]: pageBody("gamma", GAMMA_ID),
  [`${FROM}/gamma/gamma.module.code.ts`]: "export const gamma = 3\n",
}

const MOVE_FILE = "change-mechanical-file/move-file"

function worldIn(root: string): World {
  return worldAt(root, textIn(root), (world, _at, given) =>
    Promise.resolve(moveFile(world, given as Parameters<typeof moveFile>[1]))
  )
}

test("the count says how many of the children are carried", async () => {
  const said = await moveFolderBatch(worldIn(indexedRepo(HELD)), { at: FROM, to: INTO, count: 2 })
  const came = said.edits.flatMap((one) => (one.kind === "move" ? [one.pathFrom] : []))

  expect(said.refused).toBeNull()
  expect([...came].sort()).toEqual([
    `${FROM}/alpha/alpha.module.code.ts`,
    `${FROM}/alpha/alpha.module.ts`,
    `${FROM}/beta/beta.module.code.ts`,
    `${FROM}/beta/beta.module.ts`,
  ])
})

test("the children carried are the first the names sort to", async () => {
  const said = await moveFolderBatch(worldIn(indexedRepo(HELD)), { at: FROM, to: INTO, count: 1 })

  expect(pathsIn(said)).toContain(`${INTO}/alpha/alpha.module.ts`)
  expect(pathsIn(said)).not.toContain(`${INTO}/beta/beta.module.ts`)
})

test("a child is carried with every file beneath that child", async () => {
  const said = await moveFolderBatch(worldIn(indexedRepo(HELD)), { at: FROM, to: INTO, count: 3 })

  expect(pathsIn(said)).toContain(`${INTO}/gamma/gamma.module.ts`)
  expect(pathsIn(said)).toContain(`${INTO}/gamma/gamma.module.code.ts`)
})

test("a count above the children there are carries every child", async () => {
  const said = await moveFolderBatch(worldIn(indexedRepo(HELD)), { at: FROM, to: INTO, count: 90 })

  expect(said.edits).toHaveLength(Object.keys(HELD).length)
})

test("no body is rewritten, so every edit is a move", async () => {
  const said = await moveFolderBatch(worldIn(indexedRepo(HELD)), { at: FROM, to: INTO, count: 3 })

  expect(said.edits.filter((one) => one.kind !== "move")).toEqual([])
})

test("a count that is no whole number above nothing is refused", async () => {
  const world = worldIn(indexedRepo(HELD))
  const none = await moveFolderBatch(world, { at: FROM, to: INTO, count: 0 })
  const part = await moveFolderBatch(world, { at: FROM, to: INTO, count: 1.5 })

  expect(none.refused ?? "").toMatch(/no count of children/)
  expect(part.refused ?? "").toMatch(/no count of children/)
})

test("a folder holding no file is refused", async () => {
  const said = await moveFolderBatch(worldIn(indexedRepo(HELD)), {
    at: "akasha/nine",
    to: INTO,
    count: 1,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no file/)
})

test("the folder the files already sit under is refused", async () => {
  const said = await moveFolderBatch(worldIn(indexedRepo(HELD)), { at: FROM, to: FROM, count: 1 })

  expect(said.refused ?? "").toMatch(/those files sit under/)
})

test("a folder inside the folder that moves is refused", async () => {
  const said = await moveFolderBatch(worldIn(indexedRepo(HELD)), {
    at: FROM,
    to: `${FROM}/alpha`,
    count: 1,
  })

  expect(said.refused ?? "").toMatch(/sits under/)
})

test("a path the move would write a second body at is refused", async () => {
  const root = indexedRepo(HELD)
  put(root, `${INTO}/alpha/alpha.module.code.ts`, "export const alpha = 9\n")
  const said = await moveFolderBatch(worldIn(root), { at: FROM, to: INTO, count: 1 })

  expect(said.refused ?? "").toMatch(/holds a body already/)
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const world = worldIn(indexedRepo(HELD))
  const neither = await runChange(world, {})
  const noTo = await runChange(world, { at: FROM })
  const noCount = await runChange(world, { at: FROM, to: INTO })

  expect(neither.refused ?? "").toContain("`at`")
  expect(noTo.refused ?? "").toContain("`to`")
  expect(noCount.refused ?? "").toContain("`count`")
})

test("each file that moves is carried by the change reached at its address", async () => {
  const reached: string[] = []
  const root = indexedRepo(HELD)
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await moveFolderBatch(world, { at: FROM, to: INTO, count: 3 })

  expect(new Set(reached)).toEqual(new Set([MOVE_FILE]))
})
