import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { NOT_WORKED_OUT } from "@akasha/pages/shadow"
import { answered, taking } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { guardedBy } from "../../../modules/change-guarding/change-guarding.module.code.ts"
import { importNotLeftHanging } from "./import-not-left-hanging.change-guard.code.ts"

afterAll(scratch.sweep)

const GUARDS = [importNotLeftHanging]

function takingAway(root: string, path: string): Answer {
  const was = textIn(root)(path) ?? ""
  return guardedBy(root, answered([taking(path, was)]), GUARDS)
}

test("a shadow that will not build refuses rather than answering no hanging import", () => {
  const root = scratch.rootFor("import-no-index-")
  const said = guardedBy(root, answered([taking(HELD_CODE, "export const kept = 1\n")]), GUARDS)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(NOT_WORKED_OUT)
})

test("a file another file still imports is refused", () => {
  const root = indexedRepo()

  const said = takingAway(root, HELD_CODE)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${NAMER_CODE}\` imports \`${HELD_CODE}\`, and \`${HELD_CODE}\` is taken away`
  )
})

test("a file nothing imports is not refused", () => {
  const root = indexedRepo()

  const said = takingAway(root, NAMER_CODE)

  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(1)
})
