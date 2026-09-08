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
import { stating } from "../../../modules/change-answer/change-answer.module.code.ts"
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

function tookAway(root: string, paths: readonly string[]): Answer {
  const was = textIn(root)
  return stating(paths.map((one) => ({ kind: "remove", path: one })))
}

test("a page taken away leaving the file that page claims is refused", () => {
  const root = indexedRepo()

  const said = judged(root, tookAway(root, [HELD_PAGE]))

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(LEFT)
})

test("a page taken away with the file that page claims is not refused", () => {
  const root = indexedRepo()

  const said = judged(root, tookAway(root, [HELD_PAGE, HELD_CODE]))

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path)).toEqual([HELD_PAGE, HELD_CODE])
  expect(judged(root, tookAway(root, [HELD_PAGE])).refused).toBe(LEFT)
})

test("a path under no page name is judged by nothing here", () => {
  const root = indexedRepo()

  const said = judged(root, tookAway(root, [HELD_CODE]))

  expect(said.refused).toBe(null)
  expect(judged(root, tookAway(root, [HELD_PAGE])).refused).toBe(LEFT)
})

test("a page claiming no file beside itself is not refused", () => {
  const root = indexedRepo({ [BARE_PAGE]: BARE })

  const said = judged(root, tookAway(root, [BARE_PAGE]))

  expect(said.refused).toBe(null)
  expect(judged(root, tookAway(root, [HELD_PAGE])).refused).toBe(LEFT)
})
