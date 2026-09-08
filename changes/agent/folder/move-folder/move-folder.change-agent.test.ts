import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { bodiesFrom } from "@akasha/command-system/edits-landing"
import { carriedOnto } from "@akasha/command-system/path-carrying"
import { indexedRepo, pageOf, put, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { runChange as moveFile } from "../../../mechanical/file/move/move-file/move-file.change-mechanical-file.code.ts"
import { runChange as changeImports } from "../../../mechanical/file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { pathsIn } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  bodiesIn,
  type World,
  worldAt,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { moveFolder, runChange } from "./move-folder.change-agent.code.ts"

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

const UNNAMED = `${FROM}/deep/notes.txt`

const NOT_TEXT = `${FROM}/deep/held.png`

const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0xff, 0xfe, 0x00, 0x11])

const MOVE_FILE = "change-mechanical-file/move-file"

function worldIn(root: string): World {
  return worldAt(root, textIn(root), (world, at, given) => {
    if (at === MOVE_FILE) {
      return Promise.resolve(moveFile(world, given as Parameters<typeof moveFile>[1]))
    }
    return Promise.resolve(changeImports(world, given as Parameters<typeof changeImports>[1]))
  })
}

function unchanged(at: string, given: unknown): Answer {
  if (at !== MOVE_FILE) return { edits: [], refused: null }
  const asked = given as { readonly from: string; readonly to: string }
  return { edits: [{ kind: "move", pathFrom: asked.from, pathTo: asked.to }], refused: null }
}

test("every file under the folder lands beneath the folder it moved to", async () => {
  const said = await moveFolder(worldIn(indexedRepo(HELD)), { at: FROM, to: INTO })
  const paths = pathsIn(said)

  expect(said.refused).toBeNull()
  expect(paths).toContain(`${INTO}/alpha.module.ts`)
  expect(paths).toContain(`${INTO}/alpha.module.code.ts`)
  expect(paths).toContain(`${INTO}/deep/gamma.module.ts`)
  expect(paths).toContain(`${INTO}/deep/gamma.module.code.ts`)
})

test("the paths that moved are the paths under the folder and no other", async () => {
  const said = await moveFolder(worldIn(indexedRepo(HELD)), { at: FROM, to: INTO })
  const came = said.edits.flatMap((one) => (one.kind === "move" ? [one.pathFrom] : []))

  expect([...came].sort()).toEqual([...UNDER])
})

test("a file carried with its body unchanged is stated as a move holding no body", async () => {
  const said = await moveFolder(worldIn(indexedRepo(HELD)), { at: FROM, to: INTO })
  const moves = said.edits.filter((one) => one.kind === "move")

  expect(moves).toHaveLength(UNDER.length)
  expect(moves).toContainEqual({
    kind: "move",
    pathFrom: ALPHA_CODE,
    pathTo: `${INTO}/alpha.module.code.ts`,
  })
})

test("a reach from one carried file to another is left as that reach is", async () => {
  const root = indexedRepo(HELD)
  const world = worldIn(root)
  const said = await moveFolder(world, { at: FROM, to: INTO })
  const bodies = bodiesIn(said, world.base)

  expect(bodies.get(`${INTO}/alpha.module.code.ts`)).toEqual(textIn(root)(ALPHA_CODE) ?? "")
  expect(bodies.get(`${INTO}/beta.module.code.ts`)).toEqual(textIn(root)(BETA_CODE) ?? "")
})

test("a body outside the folder naming a path that moved is repointed", async () => {
  const world = worldIn(indexedRepo(HELD))
  const said = await moveFolder(world, { at: FROM, to: INTO })

  expect(bodiesIn(said, world.base).get(OUTER_CODE) ?? "").toContain(
    "../six/deep/gamma.module.code.ts"
  )
})

test("a file the index names nowhere is carried with the rest", async () => {
  const root = indexedRepo(HELD)
  put(root, UNNAMED, "one\ntwo\n")
  const said = await moveFolder(worldIn(root), { at: FROM, to: INTO })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(`${INTO}/deep/notes.txt`)
})

test("a body that is not text moves with its bytes unchanged", async () => {
  const root = indexedRepo(HELD)
  writeFileSync(join(root, NOT_TEXT), PNG)
  const said = await moveFolder(worldIn(root), { at: FROM, to: INTO })
  const landed = `${INTO}/deep/held.png`
  const held = bodiesFrom(root, said)
  if ("why" in held) throw new Error(held.why)
  carriedOnto(root, held.carries)

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(landed)
  expect(held.carries).toContainEqual({ from: NOT_TEXT, to: landed })
  expect(held.held.has(landed)).toBe(false)
  expect(new Uint8Array(readFileSync(join(root, landed)))).toEqual(PNG)
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

test("a body a reach leaves unchanged is stated as no edit beside the move", async () => {
  const root = indexedRepo(HELD)
  const world = worldAt(root, textIn(root), (_over, at, given) =>
    Promise.resolve(unchanged(at, given))
  )
  const said = await moveFolder(world, { at: FROM, to: INTO })

  expect(said.edits.filter((one) => one.kind !== "move")).toEqual([])
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

  expect(new Set(reached)).toEqual(
    new Set([MOVE_FILE, "change-mechanical-file-content/change-imports"])
  )
})
