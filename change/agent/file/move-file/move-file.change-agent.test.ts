import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  moveFile,
  runChange,
} from "akasha/change/agent/file/move-file/move-file.change-agent.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { moveFileOfAnyKind } from "akasha/change/mechanical/file/move/move-file-of-any-kind/move-file-of-any-kind.change-mechanical.ts"
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

const ALPHA_PAGE = `${FROM}/alpha.module.ts`

const ALPHA_ID = "01a04a4a-0002-7000-8000-000000000001"

const NOTES = `${FROM}/notes.txt`

const LANDED_NOTES = `${INTO}/notes.txt`

const HELD: Readonly<Record<string, string>> = {
  [ALPHA_PAGE]: carriedPage("alpha", ALPHA_ID),
  [`${FROM}/alpha.module.code.ts`]: "export const alpha = 1\n",
  [NOTES]: "one\ntwo\n",
}

const HELD_DDS = `${FROM}/held.dds`

const LANDED_DDS = `${INTO}/held.dds`

const DDS = new Uint8Array([0x44, 0x44, 0x53, 0x20, 0x7c, 0x00, 0xff, 0xfe, 0x00, 0x11])

const MOVE_FILE = `${changeMechanical.slug}/${moveFileOfAnyKind.slug}` as const

function worldIn(root: string): World {
  return worldAt(root, bodyIn(root), running)
}

test("a file that is no page lands at the path handed in", async () => {
  const said = await moveFile(worldIn(indexedRepo(HELD)), { at: NOTES, to: LANDED_NOTES })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(LANDED_NOTES)
})

test("a body that is not text moves with its bytes unchanged", async () => {
  const root = indexedRepo(HELD)
  writeFileSync(join(root, HELD_DDS), DDS)
  const said = await moveFile(worldIn(root), { at: HELD_DDS, to: LANDED_DDS })
  const held = landingFrom(root, baseOf(root), said)
  if ("why" in held) throw new Error(held.why)
  movedOnto(root, held.moves)

  expect(said.refused).toBeNull()
  expect(held.moves).toContainEqual({ from: HELD_DDS, to: LANDED_DDS })
  expect(held.rows.some((one) => one.kind !== "move" && one.path === LANDED_DDS)).toBe(false)
  expect(new Uint8Array(readFileSync(join(root, LANDED_DDS)))).toEqual(DDS)
})

test("a path naming a page is refused rather than moved", async () => {
  const world = worldIn(indexedRepo(HELD))
  const said = await moveFile(world, { at: ALPHA_PAGE, to: `${INTO}/alpha.module.ts` })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names a page")
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const world = worldIn(indexedRepo(HELD))
  const neither = await runChange(world, {})
  const noTo = await runChange(world, { at: NOTES })

  expect(neither.refused ?? "").toContain("`at`")
  expect(noTo.refused ?? "").toContain("`to`")
})

test("the move is left to the change reached at its address", async () => {
  const reached: string[] = []
  const root = indexedRepo(HELD)
  const world = worldAt(root, bodyIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await moveFile(world, { at: NOTES, to: LANDED_NOTES })

  expect(reached).toEqual([MOVE_FILE])
})
