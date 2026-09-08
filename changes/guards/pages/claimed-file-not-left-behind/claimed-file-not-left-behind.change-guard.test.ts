import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_PAGE,
  idOf,
  indexedRepo,
  pageOf,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { pathsIn, stating } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { guardedBy } from "../../../modules/change-guarding/change-guarding.module.code.ts"
import { worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { claimedFileNotLeftBehind } from "./claimed-file-not-left-behind.change-guard.code.ts"

afterAll(scratch.sweep)

const GUARDS = [claimedFileNotLeftBehind]

const BARE_PAGE = "akasha/five/bare.module.ts"

const BARE = pageOf({
  id: idOf("d"),
  pageTypeSlug: "module",
  slug: "bare",
  definition: "a page claiming no file beside itself",
})

const LEFT = `\`${HELD_PAGE}\` is taken away, and \`${HELD_CODE}\` that page claims is left behind`

function judged(root: string, said: Answer): Answer {
  return guardedBy(worldAt(root, textIn(root)), said, GUARDS)
}

function tookAway(paths: readonly string[]): Answer {
  return stating(paths.map((one) => ({ kind: "remove", path: one })))
}

test("a page taken away leaving the file that page claims is refused", () => {
  const root = indexedRepo()

  const said = judged(root, tookAway([HELD_PAGE]))

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(LEFT)
})

test("a page taken away with the file that page claims is not refused", () => {
  const root = indexedRepo()

  const said = judged(root, tookAway([HELD_PAGE, HELD_CODE]))

  expect(said.refused).toBe(null)
  expect(pathsIn(said)).toEqual([HELD_PAGE, HELD_CODE])
  expect(judged(root, tookAway([HELD_PAGE])).refused).toBe(LEFT)
})

test("a path under no page name is judged by nothing here", () => {
  const root = indexedRepo()

  const said = judged(root, tookAway([HELD_CODE]))

  expect(said.refused).toBe(null)
  expect(judged(root, tookAway([HELD_PAGE])).refused).toBe(LEFT)
})

test("a page claiming no file beside itself is not refused", () => {
  const root = indexedRepo({ [BARE_PAGE]: BARE })

  const said = judged(root, tookAway([BARE_PAGE]))

  expect(said.refused).toBe(null)
  expect(judged(root, tookAway([HELD_PAGE])).refused).toBe(LEFT)
})
