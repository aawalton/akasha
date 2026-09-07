import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_EXPORT,
  indexedRepo,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { refusing } from "../../../../modules/change-answer/change-answer.module.code.ts"
import {
  type Reaching,
  type World,
  worldAt,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { changeFile } from "../../../pages/change-file/change-file.change-mechanical-file.code.ts"
import { runChange } from "./change-file-content-code.change-mechanical-file-content.code.ts"

const RUNS: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file/change-file") {
    return Promise.resolve(changeFile(world, given as { at: string; old: string; new: string }))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

afterAll(scratch.sweep)

const NOTES = "outside/notes.md"

const LOOSE = "outside/loose.tsx"

const BODY = "export const fresh = 1\n"

const AFTER = "export const fresh = 2\n"

function worldIn(root: string): World {
  return worldAt(root, textIn(root), RUNS)
}

test("a passage of a code body is worked by the change this change reaches", async () => {
  const root = indexedRepo()

  const said = await runChange(worldIn(root), { at: HELD_CODE, old: "1", new: "2" })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([
    {
      path: HELD_CODE,
      was: `export const ${HELD_EXPORT} = 1\n`,
      body: `export const ${HELD_EXPORT} = 2\n`,
    },
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
  expect(said.edits).toEqual([{ path: LOOSE, was: BODY, body: AFTER }])
})
