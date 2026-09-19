import { afterAll, expect, test } from "bun:test"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFile } from "akasha/change/mechanical/file/add/add-file/add-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { moveFile } from "akasha/change/mechanical/file/move/move-file/move-file.change-mechanical-file.ts"
import { moveFileCode } from "akasha/change/mechanical/file/move/move-file-code/move-file-code.change-mechanical.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import { type World, worldAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Address,
  listing,
  running,
} from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  HELD_CODE,
  indexedRepo,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const ADD_FILE: Address = `${changeMechanicalFile.slug}/${addFile.slug}` as const

const MOVE_FILE_CODE: Address = `${changeMechanical.slug}/${moveFileCode.slug}` as const

const MOVE_FILE: Address = `${changeMechanicalFile.slug}/${moveFile.slug}` as const

const REMOVE_FILE: Address = `${changeMechanicalFile.slug}/${removeFile.slug}` as const

const NOTHING_FILED = `${changeMechanicalFile.slug}/nothing-at-all` as const

const FRESH = "akasha/one/fresh.md"

const KEPT = "akasha/one/kept.module.code.ts"

function scratchWorld(): World {
  return worldAt(scratch.rootFor("test-change-running-"), () => null)
}

test("the change filed at an address is run over the world handed in", async () => {
  const root = indexedRepo()
  const said = await running(worldAt(root, textIn(root)), ADD_FILE, { at: FRESH, body: "one\n" })
  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "add", path: FRESH, content: "one\n" }])
})

test("an address no page is filed under is refused", async () => {
  const said = await running(scratchWorld(), NOTHING_FILED, {})
  expect(said.refused).toBe(`\`${NOTHING_FILED}\` names no page here, so no code is there to load`)
})

test("a change reaching another change reaches it over the world handed in", async () => {
  const seen: string[] = []
  const root = indexedRepo()
  const said = await running(worldAt(root, textIn(root), listing(seen)), MOVE_FILE_CODE, {
    from: HELD_CODE,
    to: KEPT,
  })
  expect(said.refused).toBeNull()
  expect(new Set(seen)).toEqual(new Set([MOVE_FILE]))
})

test("a listing world records each address reached in order and states no edit", async () => {
  const seen: string[] = []
  const reaching = listing(seen)
  const world = scratchWorld()
  const said = await reaching(world, MOVE_FILE, {})
  await reaching(world, REMOVE_FILE, {})
  expect(seen).toEqual([MOVE_FILE, REMOVE_FILE])
  expect(said).toEqual({ edits: [], refused: null })
})
