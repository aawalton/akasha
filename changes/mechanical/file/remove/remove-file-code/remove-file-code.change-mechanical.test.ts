import { afterAll, expect, test } from "bun:test"
import { runChange } from "akasha/changes/mechanical/file/remove/remove-file-code/remove-file-code.change-mechanical.code.ts"
import { type World, worldAt } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  HELD_CODE,
  indexedRepo,
  scratch,
  textIn,
} from "akasha/pages/indexes/modules/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const LOOSE = "outside/loose.tsx"

const BODY = "export const fresh = 1\n"

function worldIn(root: string): World {
  return worldAt(root, textIn(root), running)
}

test("a code path is taken away by the change this change reaches", async () => {
  const root = indexedRepo()

  const said = await runChange(worldIn(root), { at: HELD_CODE })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ kind: "remove", path: HELD_CODE }])
})

test("a path named as TSX is taken away", async () => {
  const root = indexedRepo({ [LOOSE]: BODY })

  const said = await runChange(worldIn(root), { at: LOOSE })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ kind: "remove", path: LOOSE }])
})
