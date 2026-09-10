import { expect, test } from "bun:test"
import { NAMING_NONE } from "@akasha/code/code-specifier"
import type { Change } from "@akasha/pages/change"
import {
  edgesOf,
  foldersJudgedBy,
  foldersTouchedBy,
} from "./folder-matches-a-shape.code-check.code.ts"
import {
  grouping,
  HELD_IN_TESTS,
  holding,
} from "./folder-matches-a-shape.code-check.decision.test-fixtures.ts"
import {
  ancestorsOf,
  folderOf,
  reachedFolders,
} from "./modules/folder-grouping/folder-grouping.module.code.ts"

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

test("an import reaches the folders holding it, stopping where the importer is too", () => {
  expect(reachedFolders("akasha/c/two.ts", "akasha/a/one.ts")).toEqual(["akasha/c"])
})

test("an import inside a folder is no entrance to it, so that folder is not reached", () => {
  expect(reachedFolders("akasha/a/deep/two.ts", "akasha/a/one.ts")).toEqual(["akasha/a/deep"])
})

test("a relative specifier makes an edge and a package specifier makes none", () => {
  const body = 'import { one } from "./two.ts"\nimport ts from "typescript"\n'
  expect([...edgesOf(ROOT, "akasha/a/one.ts", encoder.encode(body))]).toEqual(["akasha/a/two.ts"])
})

test("a body that is nothing makes no edge", () => {
  expect([...edgesOf(ROOT, "akasha/a/one.ts", null)]).toEqual([])
})

test("a changed path carries every folder above it", () => {
  const said = foldersTouchedBy(change(["akasha/a/b/one.ts"], { "akasha/a/b/one.ts": "" }, {}))
  expect([...said].sort()).toEqual(["akasha", "akasha/a", "akasha/a/b"])
})

test("an import the change adds carries the folder it reaches", () => {
  const said = foldersTouchedBy(
    change(
      ["akasha/a/one.ts"],
      { "akasha/a/one.ts": 'import { two } from "../c/two.ts"\n' },
      { "akasha/a/one.ts": "" }
    )
  )
  expect(said.has("akasha/c")).toBe(true)
})

test("an import the change takes away carries the folder it used to reach", () => {
  const said = foldersTouchedBy(
    change(
      ["akasha/a/one.ts"],
      { "akasha/a/one.ts": "" },
      { "akasha/a/one.ts": 'import { two } from "../c/two.ts"\n' }
    )
  )
  expect(said.has("akasha/c")).toBe(true)
})

test("an import the change leaves unchanged carries no folder of its own", () => {
  const body = 'import { two } from "../c/two.ts"\n'
  const said = foldersTouchedBy(
    change(["akasha/a/one.ts"], { "akasha/a/one.ts": body }, { "akasha/a/one.ts": body })
  )
  expect(said.has("akasha/c")).toBe(false)
})

test("a path the change takes away still carries the folders above it", () => {
  const said = foldersTouchedBy(
    change(["akasha/a/one.ts"], { "akasha/a/one.ts": null }, { "akasha/a/one.ts": "" })
  )
  expect(said.has("akasha/a")).toBe(true)
})

test("a folder answering to a changed page is judged though no path inside it changed", () => {
  const holds = holding({ "akasha/foo": ["foo"] })
  const grouped = grouping({
    akasha: ["akasha/foo"],
    "akasha/foo": ["akasha/foo/foo-shapes", "akasha/foo/modules"],
    "akasha/foo/modules": ["akasha/foo/modules/deep"],
  })
  const said = foldersJudgedBy(
    change(["akasha/foo/foo.module.ts"], { "akasha/foo/foo.module.ts": "" }, {}),
    NAMING_NONE,
    grouped,
    holds,
    HELD_IN_TESTS
  )
  expect([...said].sort()).toEqual([
    "",
    "akasha",
    "akasha/foo",
    "akasha/foo/foo-shapes",
    "akasha/foo/modules",
    "akasha/foo/modules/deep",
  ])
})

test("the workspace root is judged, and no folder answers to it", () => {
  const holds = holding({})
  const grouped = grouping({ "": ["one", "two"] })
  const said = foldersJudgedBy(
    change(["one/one.module.ts"], { "one/one.module.ts": "" }, {}),
    NAMING_NONE,
    grouped,
    holds,
    HELD_IN_TESTS
  )
  expect([...said].sort()).toEqual(["", "one"])
})

test("a change carrying no path judges no folder at all", () => {
  const said = foldersJudgedBy(
    change([], {}, {}),
    NAMING_NONE,
    grouping({}),
    holding({}),
    HELD_IN_TESTS
  )
  expect([...said]).toEqual([])
})
