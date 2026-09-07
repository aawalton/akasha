import { afterAll, expect, test } from "bun:test"
import { dirname, join } from "node:path"
import {
  HELD_CODE,
  HELD_EXPORT,
  indexedRepo,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import {
  type Reaching,
  type World,
  worldAt,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { removeFile } from "../remove-file/remove-file.change-mechanical-file.code.ts"
import { runChange } from "./remove-code-file.change-mechanical.code.ts"

const RUNS: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file/remove-file") {
    return Promise.resolve(removeFile(given as { at: string }, world.textOf))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

afterAll(scratch.sweep)

const LOOSE = "outside/loose.tsx"

const BODY = "export const fresh = 1\n"

function worldIn(root: string): World {
  return worldAt(root, textIn(root), RUNS)
}

test("a code path is taken away by the change this change reaches", async () => {
  const root = indexedRepo()

  const said = await runChange(worldIn(root), { at: HELD_CODE })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([
    { path: HELD_CODE, was: `export const ${HELD_EXPORT} = 1\n`, body: null },
  ])
})

test("a path under no TypeScript name is refused", async () => {
  const root = indexedRepo()
  const at = join(dirname(HELD_CODE), "notes.md")

  const said = await runChange(worldIn(root), { at })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${at}\` is under no TypeScript name, so this change takes nothing away`
  )
})

test("a path named as TSX is taken away", async () => {
  const root = indexedRepo({ [LOOSE]: BODY })

  const said = await runChange(worldIn(root), { at: LOOSE })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ path: LOOSE, was: BODY, body: null }])
})
