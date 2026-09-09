import { afterAll, expect, test } from "bun:test"
import { HELD_CODE, indexedRepo, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import {
  type Reaching,
  type World,
  worldAt,
} from "../../../../modules/shadow/change-shadow.module.code.ts"
import { runChange as changeFile } from "../change-file-content/change-file-content.change-mechanical-file-content.code.ts"
import { runChange } from "./change-file-content-code.change-mechanical-file-content.code.ts"

const RUNS: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file-content/change-file-content") {
    return Promise.resolve(changeFile(world, given as { at: string; old: string; new: string }))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

afterAll(scratch.sweep)

const NOTES = "outside/notes.md"

const LOOSE = "outside/loose.tsx"

const BODY = "export const fresh = 1\n"

function worldIn(root: string): World {
  return worldAt(root, textIn(root), RUNS)
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
