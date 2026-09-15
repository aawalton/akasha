import { afterAll, expect, test } from "bun:test"
import { runChange } from "akasha/changes/mechanical/file-content/change/change-file-content-code/change-file-content-code.change-mechanical-file-content.code.ts"
import { type World, worldAt } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  HELD_CODE,
  indexedRepo,
  scratch,
  textIn,
} from "akasha/pages/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const NOTES = "outside/notes.md"

const LOOSE = "outside/loose.tsx"

const BODY = "export const fresh = 1\n"

function worldIn(root: string): World {
  return worldAt(root, textIn(root), running)
}

test("a passage of a code body is worked by the change this change reaches", async () => {
  const root = indexedRepo()

  const said = await runChange(worldIn(root), { at: HELD_CODE, old: "1", new: "2" })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([
    { kind: "replace", path: HELD_CODE, contentFrom: "1", contentTo: "2" },
  ])
})

test("a path under no TypeScript name is refused though that path holds the passage", async () => {
  const root = indexedRepo({ [NOTES]: BODY })

  const said = await runChange(worldIn(root), { at: NOTES, old: "1", new: "2" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${NOTES}\` is under no TypeScript name, so this change works no passage`
  )
})

test("a path named as TSX is worked", async () => {
  const root = indexedRepo({ [LOOSE]: BODY })

  const said = await runChange(worldIn(root), { at: LOOSE, old: "1", new: "2" })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ kind: "replace", path: LOOSE, contentFrom: "1", contentTo: "2" }])
})
