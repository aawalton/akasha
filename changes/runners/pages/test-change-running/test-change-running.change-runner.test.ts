import { afterAll, expect, test } from "bun:test"
import { type World, worldAt } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  type Address,
  listing,
  running,
} from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  HELD_CODE,
  indexedRepo,
  scratch,
  textIn,
} from "akasha/pages/indexes/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const ADD_FILE: Address = "change-mechanical-file/add-file"

const MOVE_FILE_CODE: Address = "change-mechanical/move-file-code"

const MOVE_FILE: Address = "change-mechanical-file/move-file"

const REMOVE_FILE: Address = "change-mechanical-file/remove-file"

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
  const said = await running(scratchWorld(), "change-mechanical-file/nothing-at-all", {})
  expect(said.refused).toBe(
    "`change-mechanical-file/nothing-at-all` names no page here, so no code is there to load"
  )
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
