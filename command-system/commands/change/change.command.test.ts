import { afterAll, expect, test } from "bun:test"
import {
  idOf,
  indexedRepo,
  NAMER_CODE,
  NAMER_PAGE,
  pageOf,
  scratch,
} from "@akasha/indexes/indexing/testing"
import { editsIn } from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { changing } from "./change.command.code.ts"

afterAll(scratch.sweep)

const PAGE = "akasha/seat-system/seats/pages/tester.seat.ts"

const MISSING = "akasha/one/missing.module.ts"

const LONE_PAGE = "akasha/three/lone.module.ts"

const LONE_CODE = "akasha/three/lone.module.code.ts"

const LONE: Readonly<Record<string, string>> = {
  [LONE_PAGE]: pageOf({
    id: idOf("d"),
    pageTypeSlug: "module",
    slug: "lone",
    definition: "a page no other page names",
    code: "ts",
  }),
  [LONE_CODE]: "export const lone = 1\n",
}

function pathsIn(root: string): readonly string[] {
  const said = editsIn(root, PAGE)
  return "why" in said ? [] : said.rows.map((one) => one.path)
}

test("a change answers its edits and appends the edits beside the calling agent's page", () => {
  const root = indexedRepo()

  const said = changing(root, PAGE, ["remove-page", "--file-path", NAMER_PAGE])

  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect([...pathsIn(root)].sort()).toEqual([NAMER_CODE, NAMER_PAGE])
})

test("nothing is landed and nothing is written onto the tree", () => {
  const root = indexedRepo()

  changing(root, PAGE, ["remove-page", "--file-path", NAMER_PAGE])

  expect(editsIn(root, NAMER_PAGE)).toEqual({ rows: [] })
  expect(pathsIn(root).length).toBe(2)
})

test("a change reads the world as every edit appended before that change had landed", () => {
  const root = indexedRepo()
  changing(root, PAGE, ["remove-page", "--file-path", NAMER_PAGE])

  const said = changing(root, PAGE, ["remove-page", "--file-path", NAMER_PAGE])

  expect(said.refusals).toEqual([`\`${NAMER_PAGE}\` names no page, so no page is taken away`])
  expect([...pathsIn(root)].sort()).toEqual([NAMER_CODE, NAMER_PAGE])
})

test("two runs leave two sets of edits in the order the runs were made", () => {
  const root = indexedRepo(LONE)

  changing(root, PAGE, ["remove-page", "--file-path", NAMER_PAGE])
  changing(root, PAGE, ["remove-page", "--file-path", LONE_PAGE])

  const said = pathsIn(root)
  expect(said.length).toBe(4)
  expect([...said.slice(0, 2)].sort()).toEqual([NAMER_CODE, NAMER_PAGE])
  expect([...said.slice(2)].sort()).toEqual([LONE_CODE, LONE_PAGE])
})

test("a change that refuses appends nothing and says why that change refused", () => {
  const root = indexedRepo()

  const said = changing(root, PAGE, ["remove-page", "--file-path", MISSING])

  expect(said.refusals).toEqual([`\`${MISSING}\` names no page, so no page is taken away`])
  expect(pathsIn(root)).toEqual([])
})

test("a word naming no change is refused with the changes this command runs", () => {
  const said = changing(indexedRepo(), PAGE, ["remove-file", "--file-path", NAMER_PAGE])

  expect(said.refusals).toEqual(["`remove-file` is no change this runs, which takes `remove-page`"])
})

test("a call naming no change is refused with the changes this command runs", () => {
  const said = changing(indexedRepo(), PAGE, [])

  expect(said.refusals).toEqual(["no change is named, and this runs one of `remove-page`"])
})

test("a flag the change named does not take is refused", () => {
  const said = changing(indexedRepo(), PAGE, ["remove-page", "--message", "why"])

  expect(said.refusals).toEqual(["`--message` is no flag this takes"])
})

test("a call naming no path is refused", () => {
  const said = changing(indexedRepo(), PAGE, ["remove-page"])

  expect(said.refusals).toEqual([
    "--file-path names the path the change acts on, and none is given",
  ])
})

test("a path outside the repository is refused", () => {
  const said = changing(indexedRepo(), PAGE, ["remove-page", "--file-path", "/etc/hosts"])

  expect(said.refusals.length).toBe(1)
  expect(said.refusals[0] ?? "").toContain("is no path inside the repository")
})

test("a path that is no page keeps no edits", () => {
  const said = changing(indexedRepo(), "akasha/notes.md", [
    "remove-page",
    "--file-path",
    NAMER_PAGE,
  ])

  expect(said.refusals).toEqual(["a path that is no page keeps no edits"])
})
