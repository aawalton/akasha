import { afterAll, expect, test } from "bun:test"
import { dirname, join } from "node:path"
import { HELD_CODE, indexedRepo, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { type World, worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { REACHING } from "../add-file/add-file.change-mechanical-file.test-fixtures.ts"
import { runChange } from "./add-file-code.change-mechanical-file.code.ts"

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
  expect(said.edits).toEqual([{ path: at, was: null, body: BODY }])
})

test("a path under no TypeScript name is refused", async () => {
  const root = indexedRepo()
  const at = join(dirname(HELD_CODE), "notes.md")

  const said = await runChange(worldIn(root), { at, body: BODY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${at}\` is under no TypeScript name, so this change writes nothing`)
})

test("a path named as TSX is written", async () => {
  const root = indexedRepo()
  const at = join(dirname(HELD_CODE), "fresh.module.code.tsx")

  const said = await runChange(worldIn(root), { at, body: BODY })

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(1)
})
