import { afterAll, expect, test } from "bun:test"
import { dirname, join } from "node:path"
import { HELD_CODE, indexedRepo, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import {
  type Reaching,
  type World,
  worldAt,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { addFile } from "../add-file/add-file.change-mechanical.code.ts"
import { runChange } from "./add-code-file.change-mechanical.code.ts"

const RUNS: Reaching = (world, at, given) => {
  if (at === "change-mechanical/add-file") {
    return Promise.resolve(addFile(world, given as { at: string; body: string }))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

afterAll(scratch.sweep)

const BODY = "export const fresh = 1\n"

function worldIn(root: string): World {
  return worldAt(root, textIn(root), RUNS)
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
