import { afterAll, expect, test } from "bun:test"
import { dirname, join } from "node:path"
import { REACHING } from "akasha/changes/mechanical/file/add/add-file/add-file.change-mechanical-file.test-fixtures.ts"
import { runChange } from "akasha/changes/mechanical/file/add/add-file-code/add-file-code.change-mechanical.code.ts"
import { type World, worldAt } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  HELD_CODE,
  indexedRepo,
  scratch,
  textIn,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const BODY = "export const fresh = 1\n"

function worldIn(root: string): World {
  return worldAt(root, textIn(root), REACHING)
}

test("a code path is written by the change this change reaches", async () => {
  const root = indexedRepo()
  const at = join(dirname(HELD_CODE), "fresh.module.code.ts")

  const said = await runChange(worldIn(root), { at, body: BODY })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ kind: "add", path: at, content: BODY }])
})

test("a path named as TSX is written", async () => {
  const root = indexedRepo()
  const at = join(dirname(HELD_CODE), "fresh.module.code.tsx")

  const said = await runChange(worldIn(root), { at, body: BODY })

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(1)
})
