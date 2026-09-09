import { afterAll, expect, test } from "bun:test"
import { HELD_CODE, indexedRepo, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import {
  type Reaching,
  type World,
  worldAt,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange as removeFile } from "../remove-file/remove-file.change-mechanical-file.code.ts"
import { runChange } from "./remove-file-code.change-mechanical.code.ts"

const RUNS: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file/remove-file") {
    return Promise.resolve(removeFile(world, given as { at: string }))
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
  expect(said.edits).toEqual([{ kind: "remove", path: HELD_CODE }])
})

test("a path named as TSX is taken away", async () => {
  const root = indexedRepo({ [LOOSE]: BODY })

  const said = await runChange(worldIn(root), { at: LOOSE })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ kind: "remove", path: LOOSE }])
})
