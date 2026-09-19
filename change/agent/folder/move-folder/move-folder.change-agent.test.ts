import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  moveFolder,
  runChange,
} from "akasha/change/agent/folder/move-folder/move-folder.change-agent.code.ts"
import { changeMechanicalFolder } from "akasha/change/mechanical/folder/change-mechanical-folder.page-type.ts"
import { moveFolder as moveFolderMechanical } from "akasha/change/mechanical/folder/move-folder/move-folder.change-mechanical-folder.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { bodyIn } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { type World, worldAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { landingFrom } from "akasha/command/modules/edits-landing/edits-landing.module.code.ts"
import { baseOf } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { movedOnto } from "akasha/command/modules/path-moving/path-moving.module.code.ts"
import {
  carriedPage,
  indexedRepo,
  scratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

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

const HELD: Readonly<Record<string, string>> = {
  [`${FROM}/alpha.module.ts`]: carriedPage("alpha", ALPHA_ID),
  [ALPHA_CODE]:
    'import { beta } from "./beta.module.code.ts"\n\nexport type Alpha = number\n\nexport const alpha = beta + 1\n',
  [`${FROM}/beta.module.ts`]: carriedPage("beta", BETA_ID),
  [BETA_CODE]:
    'import type { Alpha } from "./alpha.module.code.ts"\n\nexport const beta: Alpha = 1\n',
  [`${FROM}/deep/gamma.module.ts`]: carriedPage("gamma", GAMMA_ID),
  [GAMMA_CODE]: "export const gamma = 3\n",
  "akasha/five/outer.module.ts": carriedPage("outer", OUTER_ID),
  [OUTER_CODE]:
    'import { gamma } from "../four/deep/gamma.module.code.ts"\n\nexport const outer = gamma + 1\n',
}

const NOT_TEXT = `${FROM}/deep/held.png`

const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0xff, 0xfe, 0x00, 0x11])

const MOVE_FOLDER = `${changeMechanicalFolder.slug}/${moveFolderMechanical.slug}` as const

function worldIn(root: string): World {
  return worldAt(root, bodyIn(root), running)
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
  const held = landingFrom(root, baseOf(root), said)
  if ("why" in held) throw new Error(held.why)
  movedOnto(root, held.moves)

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(landed)
  expect(held.moves).toContainEqual({ from: NOT_TEXT, to: landed })
  expect(held.rows.some((one) => one.kind !== "move" && one.path === landed)).toBe(false)
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
