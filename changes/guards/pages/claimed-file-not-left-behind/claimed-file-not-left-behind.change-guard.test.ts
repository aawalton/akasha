import { afterAll, expect, test } from "bun:test"
import {
  bodyOf,
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
import { worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { guardedBy } from "../../../modules/guarding/change-guarding.module.code.ts"
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

const CARRIED_PAGE = "akasha/six/held.module.ts"

const CARRIED_CODE = "akasha/six/held.module.code.ts"

const LEFT = `\`${HELD_PAGE}\` is gone from that path, and \`${HELD_CODE}\` that page claims is left behind`

function judged(root: string, said: Answer): Answer {
  return guardedBy(worldAt(root, textIn(root)), said, GUARDS)
}

function tookAway(paths: readonly string[]): Answer {
  return stating(paths.map((one) => ({ kind: "remove", path: one })))
}

function carriedOff(moves: readonly (readonly [string, string])[]): Answer {
  return stating(moves.map(([pathFrom, pathTo]) => ({ kind: "move", pathFrom, pathTo })))
}

test("a page carried off leaving the file that page claims is refused", () => {
  const root = indexedRepo()

  const said = judged(root, carriedOff([[HELD_PAGE, CARRIED_PAGE]]))

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(LEFT)
})

test("a page carried off with the file that page claims is not refused", () => {
  const root = indexedRepo()

  const said = judged(
    root,
    carriedOff([
      [HELD_PAGE, CARRIED_PAGE],
      [HELD_CODE, CARRIED_CODE],
    ])
  )

  expect(said.refused).toBe(null)
  expect(pathsIn(said)).toContain(CARRIED_PAGE)
  expect(pathsIn(said)).toContain(CARRIED_CODE)
})

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

const NAMED_JSON = "akasha/seven/package.json"

const NAMED_PAGE = "akasha/seven/holder.kept.ts"

const NAMED_LANDED = "akasha/seven/other.kept.ts"

const NAMED: Readonly<Record<string, string>> = {
  "akasha/manifest.file-property.ts": bodyOf({
    id: "01a07c60-0004-7000-8000-000000000001",
    pageTypeSlug: "file-property",
    slug: "manifest",
    propertySlug: "manifest",
    fileName: "package.json",
  }),
  "akasha/kept.page-type.ts": bodyOf({
    id: "01a07c60-0004-7000-8000-000000000002",
    pageTypeSlug: "page-type",
    slug: "kept",
    extendsSlug: ["page-type/domain"],
    properties: [{ pagePropertySlug: "file-property/manifest", required: false, many: false }],
  }),
  [NAMED_PAGE]: pageOf({
    id: "01a07c60-0004-7000-8000-000000000003",
    pageTypeSlug: "kept",
    slug: "holder",
    definition: "a page claiming a file named outright",
    manifest: "json",
  }),
  [NAMED_JSON]: "{}\n",
}

test("a file a page after the answer claims is no file left behind", () => {
  const root = indexedRepo(NAMED)

  const said = judged(root, carriedOff([[NAMED_PAGE, NAMED_LANDED]]))

  expect(said.refused).toBe(null)
  expect(pathsIn(said)).toContain(NAMED_LANDED)
})

test("a file no page after the answer claims is left behind", () => {
  const root = indexedRepo(NAMED)

  const said = judged(root, tookAway([NAMED_PAGE]))

  expect(said.refused).toContain(NAMED_JSON)
})
