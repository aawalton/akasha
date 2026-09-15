import { expect, test } from "bun:test"
import { foldersJudgedBy } from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.check.code.ts"
import { ancestorsOf } from "akasha/check/code/pages/folder-matches-a-shape/modules/folder-grouping/folder-grouping.module.code.ts"
import { folderOf } from "akasha/code/path/modules/between/code-path-between.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const ROOT = "/repo"

const encoder = new TextEncoder()

function change(
  changed: readonly string[],
  now: Readonly<Record<string, string | null>>,
  before: Readonly<Record<string, string | null>>
): Change {
  const bodied = (held: Readonly<Record<string, string | null>>) => (path: string) => {
    const said = held[path]
    return said === undefined || said === null ? null : encoder.encode(said)
  }
  return { root: ROOT, changed, after: bodied(now), before: bodied(before) }
}

test("a folder is every part of a path but its last", () => {
  expect(folderOf("akasha/a/b/one.ts")).toBe("akasha/a/b")
  expect(folderOf("one.ts")).toBe("")
})

test("every folder above a path is an ancestor, nearest first", () => {
  expect(ancestorsOf("akasha/a/b/one.ts")).toEqual(["akasha/a/b", "akasha/a", "akasha"])
})

test("a changed path carries every folder above it", () => {
  const said = foldersJudgedBy(change(["akasha/a/b/one.ts"], { "akasha/a/b/one.ts": "" }, {}))
  expect([...said].sort()).toEqual(["", "akasha", "akasha/a", "akasha/a/b"])
})

test("an import the change adds carries no folder that import reaches", () => {
  const said = foldersJudgedBy(
    change(
      ["akasha/a/one.ts"],
      { "akasha/a/one.ts": 'import { two } from "../c/two.ts"\n' },
      { "akasha/a/one.ts": "" }
    )
  )
  expect(said.has("akasha/c")).toBe(false)
})

test("an import the change takes away carries no folder that import used to reach", () => {
  const said = foldersJudgedBy(
    change(
      ["akasha/a/one.ts"],
      { "akasha/a/one.ts": "" },
      { "akasha/a/one.ts": 'import { two } from "../c/two.ts"\n' }
    )
  )
  expect(said.has("akasha/c")).toBe(false)
})

test("a path the change takes away still carries the folders above it", () => {
  const said = foldersJudgedBy(
    change(["akasha/a/one.ts"], { "akasha/a/one.ts": null }, { "akasha/a/one.ts": "" })
  )
  expect(said.has("akasha/a")).toBe(true)
})

test("a folder under a changed folder holding no changed path is judged by nothing here", () => {
  const said = foldersJudgedBy(
    change(["akasha/foo/foo.module.ts"], { "akasha/foo/foo.module.ts": "" }, {})
  )
  expect([...said].sort()).toEqual(["", "akasha", "akasha/foo"])
})

test("the workspace root is judged by a change carrying a path", () => {
  const said = foldersJudgedBy(change(["one/one.module.ts"], { "one/one.module.ts": "" }, {}))
  expect([...said].sort()).toEqual(["", "one"])
})

test("a change carrying no path judges no folder at all", () => {
  const said = foldersJudgedBy(change([], {}, {}))
  expect([...said]).toEqual([])
})
