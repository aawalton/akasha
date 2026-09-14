import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { supervisorRel } from "akasha/agent/seat/launching/modules/seat-entry-paths/seat-entry-paths.module.code.ts"
import {
  CEILING_MS,
  DEBOUNCE_MS,
  decideVersionDelivery,
  hashFileSet,
  landsAt,
  NOTHING_DELIVERED,
  pollSupervisorFileVersion,
  reachesNothing,
  reachesNothingLine,
  reachingFrom,
  repoRootOf,
  type VersionWatch,
  workspaceNaming,
} from "akasha/agent/seat/self-healing/modules/supervisor-file-version/supervisor-file-version.module.code.ts"
import { akashaRoot } from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/modules/scratching/scratching.module.code.ts"
import { textThere } from "akasha/utils/fs/modules/text-there/text-there.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

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

const ROOTED: Readonly<Record<string, string>> = {
  "/r/entry.ts": 'import { a } from "akasha/one.ts"\nimport { b } from "akasha/two.ts"\n',
  "/r/one.ts": "",
  "/r/two.ts": "",
}

function rootedAt(path: string): string | null {
  return ROOTED[path] ?? null
}

const REACHED_WHEN_MEASURED = 681

test("the file set is walked from the entry's relative imports", () => {
  expect(reachingFrom("/a/entry.ts", bodyAt, NONE).reached).toEqual([
    "/a/entry.ts",
    "/a/one.ts",
    "/b/two.ts",
  ])
})

test("a specifier naming a package is walked to where the naming lands it", () => {
  expect(landsAt("/a/entry.ts", "@akasha/pkg/deep", NAMING)).toBe("/pkg/deep/deep.ts")
  expect(reachingFrom("/a/entry.ts", bodyAt, NAMING).reached).toEqual([
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
  expect(reachingFrom("/b/two.ts", bodyAt, NAMING).reached).toEqual(["/b/two.ts"])
})

test("a cycle through a package edge is walked once rather than forever", () => {
  const seen: string[] = []
  reachingFrom(
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
    reachingFrom("/a/entry.ts", (path) => (path === "/a/one.ts" ? null : bodyAt(path)), NONE)
      .reached
  ).toEqual(["/a/entry.ts", "/b/two.ts"])
})

test("an entry that cannot be read reaches nothing", () => {
  expect(reachingFrom("/gone.ts", () => null, NONE).reached).toEqual([])
})

test("the root is the nearest folder above the entry whose manifest names workspaces", () => {
  const rooted: Readonly<Record<string, string>> = {
    "/r/package.json": '{"name":"root","workspaces":["**"]}',
    "/r/one/package.json": '{"name":"@akasha/one","exports":{"./deep":"./deep/deep.ts"}}',
    "/r/broken/package.json": "{not json",
  }
  const read = (path: string): string | null => rooted[path] ?? null
  expect(repoRootOf("/r/one/deep/deep.ts", read)).toBe("/r")
  expect(repoRootOf("/r/broken/deep.ts", read)).toBe("/r")
  expect(repoRootOf("/r/one/deep/deep.ts", () => null)).toBeNull()
})

test("a root that is not there names no package rather than throwing", () => {
  const root = join(scratch.rootFor("supervisor-file-version-"), "no-such-root-at-all")
  expect(workspaceNaming(root).size).toBe(0)
})

test("the one package is named by the exports the root manifest states", () => {
  const root = scratch.rootFor("supervisor-file-version-")
  writeFileSync(
    join(root, "package.json"),
    '{"name":"akasha","workspaces":["**"],"exports":{".":"./one.ts","./*":"./*"}}'
  )
  const naming = workspaceNaming(root)
  expect(naming.get("akasha")).toBe(join(root, "one.ts"))
  expect(naming.get("akasha/*")).toBe(join(root, "*"))
  expect(naming.get("akasha/deep")).toBeUndefined()
})

test("a specifier the root package answers by a star lands under the root", () => {
  const naming: ReadonlyMap<string, string> = new Map([["akasha/*", "/r/*"]])
  expect(landsAt("/a/entry.ts", "akasha/deep/deep.ts", naming)).toBe("/r/deep/deep.ts")
})

test("the one wildcard the root names reaches the files the entry imports", () => {
  const naming: ReadonlyMap<string, string> = new Map([["akasha/*", "/r/*"]])
  const reaching = reachingFrom("/r/entry.ts", rootedAt, naming)
  expect(reaching.reached).toEqual(["/r/entry.ts", "/r/one.ts", "/r/two.ts"])
  expect(reaching.saidAtEntry).toBe(2)
  expect(reaching.reachedFromEntry).toBe(2)
  expect(reachesNothing(reaching)).toBe(false)
})

test("one wildcard landing where no file is leaves the entry alone, and that is noticed", () => {
  const naming: ReadonlyMap<string, string> = new Map([["akasha/*", "/gone/*"]])
  const reaching = reachingFrom("/r/entry.ts", rootedAt, naming)
  expect(reaching.reached).toEqual(["/r/entry.ts"])
  expect(reaching.saidAtEntry).toBe(2)
  expect(reaching.reachedFromEntry).toBe(0)
  expect(reachesNothing(reaching)).toBe(true)
})

test("a naming holding nothing leaves the entry alone, and that is noticed", () => {
  const reaching = reachingFrom("/r/entry.ts", rootedAt, NONE)
  expect(reaching.reached).toEqual(["/r/entry.ts"])
  expect(reachesNothing(reaching)).toBe(true)
})

test("an entry naming no import at all is not taken for a resolution that failed", () => {
  const reaching = reachingFrom("/r/one.ts", rootedAt, NONE)
  expect(reaching.saidAtEntry).toBe(0)
  expect(reachesNothing(reaching)).toBe(false)
})

test("the supervisor entry reaches its own tree, so nothing is noticed against it", () => {
  const reaching = reachingFrom(join(akashaRoot(), supervisorRel()), textThere)
  expect(reaching.reached.length).toBeGreaterThan(REACHED_WHEN_MEASURED / 2)
  expect(reaching.saidAtEntry).toBeGreaterThan(0)
  expect(reaching.reachedFromEntry).toBe(reaching.saidAtEntry)
  expect(reachesNothing(reaching)).toBe(false)
})

test("an entry reaching none of its imports is said every poll", async () => {
  const entry = join(scratch.rootFor("supervisor-file-version-"), "entry.ts")
  writeFileSync(entry, 'import { gone } from "akasha/nowhere/nowhere.module.code.ts"\n')
  const said: string[] = []
  const delivered: string[] = []
  const say = (spoken: string): undefined => {
    said.push(spoken)
  }
  const deliver = (version: { liveVersion: string; deployedAt: number }): undefined => {
    delivered.push(version.liveVersion)
  }
  await pollSupervisorFileVersion(entry, deliver, 0, say)
  await pollSupervisorFileVersion(entry, deliver, DEBOUNCE_MS, say)
  const line = reachesNothingLine(entry, reachingFrom(entry, textThere))
  expect(delivered).toEqual([])
  expect(said).toEqual([line, line])
  expect(line).toContain(entry)
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
