import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_PAGE,
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
import { runChange as removeCodeFile } from "../remove-code-file/remove-code-file.change-mechanical-file.code.ts"
import { removeFile } from "../remove-file/remove-file.change-mechanical-file.code.ts"
import { runChange } from "./remove-page-file.change-mechanical.code.ts"

const REMOVE_CODE_FILE = "change-mechanical-file/remove-code-file"

const REMOVE_FILE = "change-mechanical-file/remove-file"

const RUNS: Reaching = (world, at, given) => {
  if (at === REMOVE_CODE_FILE) return removeCodeFile(world, given as { at: string })
  if (at === REMOVE_FILE) return Promise.resolve(removeFile(given as { at: string }, world.textOf))
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

afterAll(scratch.sweep)

function worldIn(root: string): World {
  return worldAt(root, textIn(root), RUNS)
}

test("a page path is taken away by the change this change reaches", async () => {
  const root = indexedRepo()
  const was = textIn(root)

  const said = await runChange(worldIn(root), { at: HELD_PAGE })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ path: HELD_PAGE, was: was(HELD_PAGE) ?? "", body: null }])
})

test("a path beside a page is refused", async () => {
  const root = indexedRepo()

  const said = await runChange(worldIn(root), { at: HELD_CODE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${HELD_CODE}\` is under no page name, so this change takes nothing away`
  )
})

test("a path under no page type is refused", async () => {
  const root = indexedRepo()
  const at = "akasha/one/fresh.notatype.ts"

  const said = await runChange(worldIn(root), { at })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${at}\` is under no page name, so this change takes nothing away`)
})

test("a refusal from the change this change reaches comes back", async () => {
  const root = indexedRepo()
  const was = textIn(root)
  const reading = (path: string): string | null => (path === HELD_PAGE ? null : was(path))

  const said = await runChange(worldAt(root, reading, RUNS), { at: HELD_PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${HELD_PAGE}\` holds no body, so a removal takes nothing away`)
})
