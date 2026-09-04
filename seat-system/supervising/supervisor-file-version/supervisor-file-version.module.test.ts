import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import {
  CEILING_MS,
  DEBOUNCE_MS,
  decideVersionDelivery,
  hashFileSet,
  importGraph,
  landsAt,
  NOTHING_DELIVERED,
  readTextOrNull,
  repoRootOf,
  type VersionWatch,
  workspaceNaming,
} from "./supervisor-file-version.module.code.ts"

const TREE: Readonly<Record<string, string>> = {
  "/a/entry.ts":
    'import { x } from "./one.ts"\nimport { y } from "../b/two.ts"\nimport { p } from "@akasha/pkg/deep"\n',
  "/a/one.ts": 'import { z } from "./entry.ts"\n',
  "/b/two.ts": 'import { w } from "@akasha/elsewhere"\n',
  "/pkg/deep/deep.ts": 'import { back } from "@akasha/pkg/entry"\n',
  "/pkg/entry/entry.ts": 'import { round } from "@akasha/pkg/deep"\n',
}

const NAMING: ReadonlyMap<string, string> = new Map([
  ["@akasha/pkg/deep", "/pkg/deep/deep.ts"],
  ["@akasha/pkg/entry", "/pkg/entry/entry.ts"],
])

const NONE: ReadonlyMap<string, string> = new Map()

function bodyAt(path: string): string | null {
  return TREE[path] ?? null
}

test("the file set is walked from the entry's relative imports", () => {
  expect(importGraph("/a/entry.ts", bodyAt, NONE)).toEqual([
    "/a/entry.ts",
    "/a/one.ts",
    "/b/two.ts",
  ])
})

test("a specifier naming a package is walked to where the naming lands it", () => {
  expect(landsAt("/a/entry.ts", "@akasha/pkg/deep", NAMING)).toBe("/pkg/deep/deep.ts")
  expect(importGraph("/a/entry.ts", bodyAt, NAMING)).toEqual([
    "/a/entry.ts",
    "/a/one.ts",
    "/b/two.ts",
    "/pkg/deep/deep.ts",
    "/pkg/entry/entry.ts",
  ])
})

test("a specifier the naming does not hold is passed over rather than thrown on", () => {
  expect(landsAt("/b/two.ts", "@akasha/elsewhere", NAMING)).toBeNull()
  expect(landsAt("/b/two.ts", "node:fs", NAMING)).toBeNull()
  expect(importGraph("/b/two.ts", bodyAt, NAMING)).toEqual(["/b/two.ts"])
})

test("a cycle through a package edge is walked once rather than forever", () => {
  const seen: string[] = []
  importGraph(
    "/a/entry.ts",
    (path) => {
      seen.push(path)
      return TREE[path] ?? null
    },
    NAMING
  )
  expect(new Set(seen).size).toBe(seen.length)
})

test("a file that cannot be read is left out of the set", () => {
  expect(
    importGraph("/a/entry.ts", (path) => (path === "/a/one.ts" ? null : bodyAt(path)), NONE)
  ).toEqual(["/a/entry.ts", "/b/two.ts"])
})

test("an entry that cannot be read reaches nothing", () => {
  expect(importGraph("/gone.ts", () => null, NONE)).toEqual([])
  expect(readTextOrNull("/nowhere/at/all")).toBeNull()
})

test("the root is the nearest folder above the entry whose manifest names workspaces", () => {
  const ROOTED: Readonly<Record<string, string>> = {
    "/r/package.json": '{"name":"root","workspaces":["**"]}',
    "/r/one/package.json": '{"name":"@akasha/one","exports":{"./deep":"./deep/deep.ts"}}',
    "/r/broken/package.json": "{not json",
  }
  const read = (path: string): string | null => ROOTED[path] ?? null
  expect(repoRootOf("/r/one/deep/deep.ts", read)).toBe("/r")
  expect(repoRootOf("/r/broken/deep.ts", read)).toBe("/r")
  expect(repoRootOf("/r/one/deep/deep.ts", () => null)).toBeNull()
})

test("a root that is not there names no package rather than throwing", () => {
  expect(workspaceNaming(join(tmpdir(), "no-such-root-at-all")).size).toBe(0)
})

test("a package is named by the exports its manifest states", () => {
  const root = mkdtempSync(join(tmpdir(), "supervisor-file-version-"))
  try {
    writeFileSync(join(root, "package.json"), '{"name":"root","workspaces":["**"]}')
    mkdirSync(join(root, "one", "deep"), { recursive: true })
    writeFileSync(
      join(root, "one", "package.json"),
      '{"name":"@akasha/one","exports":{".":"./one.ts","./deep":"./deep/deep.ts"}}'
    )
    const naming = workspaceNaming(root)
    expect(naming.get("@akasha/one")).toBe(join(root, "one", "one.ts"))
    expect(naming.get("@akasha/one/deep")).toBe(join(root, "one", "deep", "deep.ts"))
    expect(naming.get("@akasha/one/absent")).toBeUndefined()
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a file that cannot be read still changes the hash", async () => {
  const absent = await hashFileSet(["/nowhere/one"])
  const other = await hashFileSet(["/nowhere/two"])
  expect(absent).not.toBe(other)
})

test("the first version seen is delivered at once", () => {
  const held = decideVersionDelivery(NOTHING_DELIVERED, "v1", 0)
  expect(held.deliver).toBe(true)
  expect(held.next.delivered).toBe("v1")
})

test("the version already delivered is not delivered again", () => {
  const held = decideVersionDelivery(
    { delivered: "v1", steady: null, changedSinceMs: null },
    "v1",
    10
  )
  expect(held.deliver).toBe(false)
})

test("a fresh version waits for its debounce before it is delivered", () => {
  const first = decideVersionDelivery(
    { delivered: "v1", steady: null, changedSinceMs: null },
    "v2",
    0
  )
  expect(first.deliver).toBe(false)
  const held = decideVersionDelivery(first.next, "v2", DEBOUNCE_MS)
  expect(held.deliver).toBe(true)
  expect(held.next.delivered).toBe("v2")
})

test("a version that keeps changing is delivered once it is overdue", () => {
  let watch: VersionWatch = { delivered: "v1", steady: null, changedSinceMs: null }
  let at = 0
  let held = decideVersionDelivery(watch, "v2", at)
  expect(held.deliver).toBe(false)
  watch = held.next
  for (let n = 3; at < CEILING_MS; n++) {
    at += DEBOUNCE_MS - 1
    held = decideVersionDelivery(watch, `v${n}`, at)
    watch = held.next
    if (held.deliver) break
  }
  expect(held.deliver).toBe(true)
})
