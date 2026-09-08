import { afterAll, expect, test } from "bun:test"
import { HELD_CODE, indexedRepo, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { stating } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { guardedBy } from "../../../modules/change-guarding/change-guarding.module.code.ts"
import { worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { bodyNotWrittenOver } from "./body-not-written-over.change-guard.code.ts"

afterAll(scratch.sweep)

const GUARDS = [bodyNotWrittenOver]

const FRESH = "akasha/one/fresh.module.code.ts"

const FRESH_BODY = "export const fresh = 1\n"

function judged(root: string, said: Answer): Answer {
  return guardedBy(worldAt(root, textIn(root)), said, GUARDS)
}

test("a body written at a path another body holds is refused", () => {
  const root = indexedRepo()
  const was = textIn(root)(HELD_CODE) ?? ""

  const said = judged(
    root,
    stating([{ kind: "replace", path: HELD_CODE, contentFrom: was, contentTo: FRESH_BODY }])
  )

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${HELD_CODE}\` already holds a body, so this change writes over it`)
})

test("a body written at a path holding nothing is not refused", () => {
  const root = indexedRepo()

  const said = judged(root, stating([{ kind: "add", path: FRESH, content: FRESH_BODY }]))

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(1)
})

test("a path taken away is not refused", () => {
  const root = indexedRepo()
  const was = textIn(root)(HELD_CODE) ?? ""

  const said = judged(root, stating([{ kind: "remove", path: HELD_CODE }]))

  expect(said.refused).toBe(null)
})

test("a file moved to a path holding nothing is not refused", () => {
  const root = indexedRepo()
  const was = textIn(root)(HELD_CODE) ?? ""

  const said = judged(root, stating([{ kind: "move", pathFrom: HELD_CODE, pathTo: FRESH }]))

  expect(said.refused).toBe(null)
})
