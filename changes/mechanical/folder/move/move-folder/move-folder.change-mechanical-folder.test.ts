import { afterAll, expect, test } from "bun:test"
import { runChange } from "akasha/changes/mechanical/folder/move/move-folder/move-folder.change-mechanical-folder.code.ts"
import { pathsIn } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type World,
  worldAt,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { treeUnentered } from "akasha/changes/modules/shadow-tree/change-shadow-tree.module.code.ts"
import {
  carriedPage,
  indexedRepo,
  put,
  scratch,
  textIn,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const FROM = "akasha/four"

const INTO = "akasha/six"

const ALPHA_CODE = `${FROM}/alpha.module.code.ts`

const BETA_CODE = `${FROM}/beta.module.code.ts`

const GAMMA_CODE = `${FROM}/deep/gamma.module.code.ts`

const OUTER_CODE = "akasha/five/outer.module.code.ts"

const CLAIMS = "01a04a4a-0002-7000-8000-000000000001"

const HELD: Readonly<Record<string, string>> = {
  [`${FROM}/alpha.module.ts`]: carriedPage("alpha", "01a04a4a-0002-7000-8000-000000000001"),
  [ALPHA_CODE]:
    'import { beta } from "./beta.module.code.ts"\n\nexport type Alpha = number\n\nexport const alpha = beta + 1\n',
  [`${FROM}/beta.module.ts`]: carriedPage("beta", "01a04a4a-0002-7000-8000-000000000002"),
  [BETA_CODE]:
    'import type { Alpha } from "./alpha.module.code.ts"\n\nexport const beta: Alpha = 1\n',
  [`${FROM}/deep/gamma.module.ts`]: carriedPage("gamma", "01a04a4a-0002-7000-8000-000000000003"),
  [GAMMA_CODE]: "export const gamma = 3\n",
  "akasha/five/outer.module.ts": carriedPage("outer", "01a04a4a-0002-7000-8000-000000000004"),
  [OUTER_CODE]:
    'import { gamma } from "../four/deep/gamma.module.code.ts"\n\nexport const outer = gamma + 1\n',
}

const UNDER: readonly string[] = Object.keys(HELD)
  .filter((one) => one.startsWith(`${FROM}/`))
  .sort()

const MANIFEST = "akasha/package.json"

const NOT_TEXT = "akasha/five/weights.onnx"

const MANIFEST_BODY = `{
  "name": "@akasha/four",
  "exports": {
    "./gamma": "./four/deep/gamma.module.code.ts"
  }
}
`

function worldOn(root: string, read: (path: string) => string | null): World {
  return worldAt(root, read)
}

function worldIn(root: string): World {
  return worldOn(root, textIn(root))
}

function worldUnreadable(root: string): World {
  const read = textIn(root)
  const world = worldOn(root, (path) => {
    if (path === NOT_TEXT) throw new Error(`\`${path}\` is not text`)
    return read(path)
  })
  return { ...world, index: { ...world.index, everyPath: () => [NOT_TEXT] } }
}

function worldNaming(root: string): World {
  const world = worldIn(root)
  return {
    ...world,
    index: {
      ...world.index,
      everyPath: () => [MANIFEST],
      fileKeysAt: () => new Map([["manifest", "package.json"]]),
    },
  }
}

test("every file under the folder lands beneath the folder it moved to", async () => {
  const said = await runChange(worldIn(indexedRepo(HELD)), { from: FROM, to: INTO })
  const paths = pathsIn(said)

  expect(said.refused).toBeNull()
  expect(paths).toContain(`${INTO}/alpha.module.ts`)
  expect(paths).toContain(`${INTO}/deep/gamma.module.code.ts`)
})

test("the paths that moved are the paths under the folder and no other", async () => {
  const said = await runChange(worldIn(indexedRepo(HELD)), { from: FROM, to: INTO })
  const came = said.edits.flatMap((one) => (one.kind === "move" ? [one.pathFrom] : []))

  expect([...came].sort()).toEqual([...UNDER])
})

test("a reach from one carried file to another is left as that reach is", async () => {
  const root = indexedRepo(HELD)
  const world = worldIn(root)
  const said = await runChange(world, { from: FROM, to: INTO })
  const bodies = bodiesIn(said, world.base)

  expect(bodies.get(`${INTO}/alpha.module.code.ts`)).toEqual(textIn(root)(ALPHA_CODE) ?? "")
  expect(bodies.get(`${INTO}/beta.module.code.ts`)).toEqual(textIn(root)(BETA_CODE) ?? "")
})

test("a body outside the folder naming a path that moved is repointed", async () => {
  const world = worldIn(indexedRepo(HELD))
  const said = await runChange(world, { from: FROM, to: INTO })

  expect(bodiesIn(said, world.base).get(OUTER_CODE) ?? "").toContain(
    "../six/deep/gamma.module.code.ts"
  )
})

test("a manifest naming a path that moved names the path that path landed at", async () => {
  const root = indexedRepo(HELD)
  put(root, MANIFEST, MANIFEST_BODY)
  const world = worldNaming(root)
  const said = await runChange(world, { from: FROM, to: INTO })

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(MANIFEST) ?? "").toContain(
    '"./gamma": "./six/deep/gamma.module.code.ts"'
  )
})

test("a manifest naming no path that moved is left as that manifest is", async () => {
  const root = indexedRepo(HELD)
  put(root, MANIFEST, MANIFEST_BODY)
  const world = worldNaming(root)
  const said = await runChange(world, { from: "akasha/five", to: "akasha/seven" })

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).has(MANIFEST)).toBe(false)
})

test("a body that is not text is searched for no name", async () => {
  const root = indexedRepo(HELD)
  put(root, NOT_TEXT, "gamma.module.code.ts")
  const said = await runChange(worldUnreadable(root), { from: FROM, to: INTO })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).not.toContain(NOT_TEXT)
})

test("a file the index names nowhere is carried with the rest", async () => {
  const root = indexedRepo(HELD)
  put(root, `${FROM}/deep/notes.txt`, "one\ntwo\n")
  const said = await runChange(worldIn(root), { from: FROM, to: INTO })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(`${INTO}/deep/notes.txt`)
})

test("a folder already holding a body at a path the move would write is refused", async () => {
  const root = indexedRepo(HELD)
  put(root, `${INTO}/deep/gamma.module.code.ts`, "export const gamma = 9\n")
  const said = await runChange(worldIn(root), { from: FROM, to: INTO })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/is a body already/)
})

test("a folder holding no file is refused", async () => {
  const said = await runChange(worldIn(indexedRepo(HELD)), { from: "akasha/nine", to: INTO })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no file/)
})

test("a folder the index claims under the folder that moves is refused rather than left behind", async () => {
  const root = indexedRepo(HELD)
  const claimed = `${FROM}/.react-router`
  put(root, `${claimed}/types/routes.ts`, "export const routes = 1\n")
  const world = worldIn(root)
  const face = {
    ...world.index,
    listedByPath: (path: string) =>
      path === claimed ? [{ path: `${FROM}/alpha.module.ts`, id: CLAIMS }] : [],
  }
  const said = await runChange(
    { ...world, unentered: (folder: string) => treeUnentered(root, folder, face) },
    { from: FROM, to: INTO }
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(claimed)
})

test("a folder the index claims nothing of is carried rather than refused", async () => {
  const root = indexedRepo(HELD)
  put(root, `${FROM}/.react-router/types/routes.ts`, "export const routes = 1\n")
  const said = await runChange(worldIn(root), { from: FROM, to: INTO })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(`${INTO}/.react-router/types/routes.ts`)
})

test("a listing short of a file git tracks is refused rather than carried short", async () => {
  const root = indexedRepo(HELD)
  const world = worldIn(root)
  const short = UNDER.filter((one) => one !== BETA_CODE)
  const said = await runChange(
    { ...world, under: (folder: string) => (folder === FROM ? short : world.under(folder)) },
    { from: FROM, to: INTO }
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(BETA_CODE)
})

test("a file git tracks nowhere is left out of that comparison", async () => {
  const root = indexedRepo(HELD)
  put(root, `${FROM}/deep/notes.txt`, "one\ntwo\n")
  const said = await runChange(worldIn(root), { from: FROM, to: INTO })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(`${INTO}/deep/notes.txt`)
})

test("the folder the files already sit under is refused", async () => {
  const said = await runChange(worldIn(indexedRepo(HELD)), { from: FROM, to: FROM })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/those files sit under/)
})

test("a folder inside the folder that moves is refused", async () => {
  const said = await runChange(worldIn(indexedRepo(HELD)), { from: FROM, to: `${FROM}/deep` })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/sits under/)
})

test("every file under the folder is answered for without reaching a rung", async () => {
  const reached: string[] = []
  const root = indexedRepo(HELD)
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  const said = await runChange(world, { from: FROM, to: INTO })

  expect(said.refused).toBeNull()
  expect(reached).toEqual([])
})
