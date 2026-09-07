import { afterAll, expect, test } from "bun:test"
import { indexedRepo, pageOf, put, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { runChange as changeImports } from "../../../mechanical/file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { type World, worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { moveFolder, runChange } from "./move-folder.change-checked.code.ts"

afterAll(scratch.sweep)

const FROM = "akasha/four"

const INTO = "akasha/six"

const ALPHA_CODE = `${FROM}/alpha.module.code.ts`

const BETA_CODE = `${FROM}/beta.module.code.ts`

const GAMMA_CODE = `${FROM}/deep/gamma.module.code.ts`

const OUTER_CODE = "akasha/five/outer.module.code.ts"

const ALPHA_ID = "01a04a4a-0002-7000-8000-000000000001"

const BETA_ID = "01a04a4a-0002-7000-8000-000000000002"

const GAMMA_ID = "01a04a4a-0002-7000-8000-000000000003"

const OUTER_ID = "01a04a4a-0002-7000-8000-000000000004"

const pageBody = (slug: string, id: string): string =>
  pageOf({
    id,
    pageTypeSlug: "module",
    slug,
    definition: "a page a carried folder holds",
    code: "ts",
  })

const HELD: Readonly<Record<string, string>> = {
  [`${FROM}/alpha.module.ts`]: pageBody("alpha", ALPHA_ID),
  [ALPHA_CODE]:
    'import { beta } from "./beta.module.code.ts"\n\nexport type Alpha = number\n\nexport const alpha = beta + 1\n',
  [`${FROM}/beta.module.ts`]: pageBody("beta", BETA_ID),
  [BETA_CODE]:
    'import type { Alpha } from "./alpha.module.code.ts"\n\nexport const beta: Alpha = 1\n',
  [`${FROM}/deep/gamma.module.ts`]: pageBody("gamma", GAMMA_ID),
  [GAMMA_CODE]: "export const gamma = 3\n",
  "akasha/five/outer.module.ts": pageBody("outer", OUTER_ID),
  [OUTER_CODE]:
    'import { gamma } from "../four/deep/gamma.module.code.ts"\n\nexport const outer = gamma + 1\n',
}

const UNDER: readonly string[] = Object.keys(HELD)
  .filter((one) => one.startsWith(`${FROM}/`))
  .sort()

function worldIn(root: string): World {
  return worldAt(root, textIn(root), (world, _at, given) =>
    Promise.resolve(changeImports(world, given as Parameters<typeof changeImports>[1]))
  )
}

test("every file under the folder lands beneath the folder it moved to", async () => {
  const said = await moveFolder(worldIn(indexedRepo(HELD)), { at: FROM, to: INTO })
  const paths = said.edits.map((one) => one.path)

  expect(said.refused).toBeNull()
  expect(paths).toContain(`${INTO}/alpha.module.ts`)
  expect(paths).toContain(`${INTO}/alpha.module.code.ts`)
  expect(paths).toContain(`${INTO}/deep/gamma.module.ts`)
  expect(paths).toContain(`${INTO}/deep/gamma.module.code.ts`)
})

test("the paths that moved are the paths under the folder and no other", async () => {
  const said = await moveFolder(worldIn(indexedRepo(HELD)), { at: FROM, to: INTO })
  const came = said.edits.map((one) => one.from).filter((one) => one !== undefined)

  expect([...came].sort()).toEqual([...UNDER])
})

test("a reach from one carried file to another is left as that reach is", async () => {
  const root = indexedRepo(HELD)
  const said = await moveFolder(worldIn(root), { at: FROM, to: INTO })
  const alpha = said.edits.filter((one) => one.path === `${INTO}/alpha.module.code.ts`)
  const beta = said.edits.filter((one) => one.path === `${INTO}/beta.module.code.ts`)

  expect(alpha).toHaveLength(1)
  expect(beta).toHaveLength(1)
  expect(alpha[0]?.body).toEqual(textIn(root)(ALPHA_CODE) ?? "")
  expect(beta[0]?.body).toEqual(textIn(root)(BETA_CODE) ?? "")
})

test("a body outside the folder naming a path that moved is repointed", async () => {
  const said = await moveFolder(worldIn(indexedRepo(HELD)), { at: FROM, to: INTO })
  const one = said.edits.find((edit) => edit.path === OUTER_CODE)

  expect(one?.body ?? "").toContain("../six/deep/gamma.module.code.ts")
})

test("a folder already holding a body at a path the move would write is refused", async () => {
  const root = indexedRepo(HELD)
  put(root, `${INTO}/deep/gamma.module.code.ts`, "export const gamma = 9\n")
  const said = await moveFolder(worldIn(root), { at: FROM, to: INTO })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/is a body already/)
})

test("a folder holding no file is refused", async () => {
  const said = await moveFolder(worldIn(indexedRepo(HELD)), { at: "akasha/nine", to: INTO })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no file/)
})

test("the folder the files already sit under is refused", async () => {
  const said = await moveFolder(worldIn(indexedRepo(HELD)), { at: FROM, to: FROM })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/those files sit under/)
})

test("a folder inside the folder that moves is refused", async () => {
  const said = await moveFolder(worldIn(indexedRepo(HELD)), { at: FROM, to: `${FROM}/deep` })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/sits under/)
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const world = worldIn(indexedRepo(HELD))
  const neither = await runChange(world, {})
  const noTo = await runChange(world, { at: FROM })

  expect(neither.refused ?? "").toContain("`at`")
  expect(noTo.refused ?? "").toContain("`to`")
})

test("each body that moves is repointed by the change reached at its address", async () => {
  const reached: string[] = []
  const root = indexedRepo(HELD)
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await moveFolder(world, { at: FROM, to: INTO })

  expect(new Set(reached)).toEqual(new Set(["change-mechanical-file-content/change-imports"]))
})
