import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { bodiesFrom } from "@akasha/command-system/edits-landing"
import { indexedRepo, pageOf, scratch } from "@akasha/indexes/indexing/testing"
import { movedOnto } from "../../../../commands/modules/path-moving/path-moving.module.code.ts"
import { runChange as moveFile } from "../../../mechanical/file/move/move-file/move-file.change-mechanical-file.code.ts"
import { runChange as changeImports } from "../../../mechanical/file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { runChange as moveFolderMechanical } from "../../../mechanical/folder/move/move-folder/move-folder.change-mechanical-folder.code.ts"
import { pathsIn } from "../../../modules/change-answer/change-answer.module.code.ts"
import { type World, worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { bodyIn } from "../../../modules/edits-keeping/edits-keeping.module.code.ts"
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

const NOT_TEXT = `${FROM}/deep/held.png`

const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0xff, 0xfe, 0x00, 0x11])

const MOVE_FILE = "change-mechanical-file/move-file"

const MOVE_FOLDER = "change-mechanical-folder/move-folder"

function worldIn(root: string): World {
  return worldAt(root, bodyIn(root), async (world, at, given) => {
    if (at === MOVE_FOLDER) {
      return await moveFolderMechanical(world, given as Parameters<typeof moveFolderMechanical>[1])
    }
    if (at === MOVE_FILE) {
      return moveFile(world, given as Parameters<typeof moveFile>[1])
    }
    return changeImports(world, given as Parameters<typeof changeImports>[1])
  })
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

test("a body that is not text moves with its bytes unchanged", async () => {
  const root = indexedRepo(HELD)
  writeFileSync(join(root, NOT_TEXT), PNG)
  const said = await moveFolder(worldIn(root), { at: FROM, to: INTO })
  const landed = `${INTO}/deep/held.png`
  const held = bodiesFrom(root, said)
  if ("why" in held) throw new Error(held.why)
  movedOnto(root, held.moves)

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(landed)
  expect(held.moves).toContainEqual({ from: NOT_TEXT, to: landed })
  expect(held.held.has(landed)).toBe(false)
  expect(new Uint8Array(readFileSync(join(root, landed)))).toEqual(PNG)
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const world = worldIn(indexedRepo(HELD))
  const neither = await runChange(world, {})
  const noTo = await runChange(world, { at: FROM })

  expect(neither.refused ?? "").toContain("`at`")
  expect(noTo.refused ?? "").toContain("`to`")
})

test("the whole carry is left to the change reached at its address", async () => {
  const reached: string[] = []
  const root = indexedRepo(HELD)
  const world = worldAt(root, bodyIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await moveFolder(world, { at: FROM, to: INTO })

  expect(reached).toEqual([MOVE_FOLDER])
})
