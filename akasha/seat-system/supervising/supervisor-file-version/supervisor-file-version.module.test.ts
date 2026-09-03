import { expect, test } from "bun:test"
import {
  CEILING_MS,
  DEBOUNCE_MS,
  decideVersionDelivery,
  hashFileSet,
  importGraph,
  NOTHING_DELIVERED,
  readTextOrNull,
  type VersionWatch,
} from "./supervisor-file-version.module.code.ts"

const TREE: Readonly<Record<string, string>> = {
  "/a/entry.ts": 'import { x } from "./one.ts"\nimport { y } from "../b/two.ts"\n',
  "/a/one.ts": 'import { z } from "./entry.ts"\n',
  "/b/two.ts": 'import { w } from "@akasha/elsewhere"\n',
}

test("the file set is walked from the entry's relative imports", () => {
  expect(importGraph("/a/entry.ts", (path) => TREE[path] ?? null)).toEqual([
    "/a/entry.ts",
    "/a/one.ts",
    "/b/two.ts",
  ])
})

test("a cycle is walked once rather than forever", () => {
  const seen: string[] = []
  importGraph("/a/entry.ts", (path) => {
    seen.push(path)
    return TREE[path] ?? null
  })
  expect(new Set(seen).size).toBe(seen.length)
})

test("a file that cannot be read is left out of the set", () => {
  expect(
    importGraph("/a/entry.ts", (path) => (path === "/a/one.ts" ? null : (TREE[path] ?? null)))
  ).toEqual(["/a/entry.ts", "/b/two.ts"])
})

test("an entry that cannot be read reaches nothing", () => {
  expect(importGraph("/gone.ts", () => null)).toEqual([])
  expect(readTextOrNull("/nowhere/at/all")).toBeNull()
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
