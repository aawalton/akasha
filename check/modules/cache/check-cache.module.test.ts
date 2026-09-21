import { expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { cacheAt, cachedIn, cacheKept } from "akasha/check/modules/cache/check-cache.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

const PAGE = "check/code/pages/a-check/a-check.check-code.ts"

const AT = "check/code/pages/a-check/a-check.check-code.cache.uncommitted.jsonl"

function rooted(): string {
  const root = scratch.rootFor("akasha-check-cache-")
  mkdirSync(join(root, "check/code/pages/a-check"), { recursive: true })
  return root
}

test("a cache sits beside the page of the check keeping it", () => {
  expect(cacheAt(PAGE)).toBe(AT)
})

test("a cache that is not there reads as nothing", () => {
  expect(cachedIn(rooted(), PAGE)).toBeNull()
})

test("a cache holding a line that is no JSON value reads as nothing", () => {
  const root = rooted()
  writeFileSync(join(root, AT), "not json\n")

  expect(cachedIn(root, PAGE)).toBeNull()
})

test("the rows kept are the rows read again", () => {
  const root = rooted()
  cacheKept(root, PAGE, ["one/two.ts", "three.ts"])

  expect(cachedIn(root, PAGE)).toEqual(["one/two.ts", "three.ts"])
})

test("a cache holding no row reads as no row", () => {
  const root = rooted()
  cacheKept(root, PAGE, [])

  expect(cachedIn(root, PAGE)).toEqual([])
})

test("a page no name parts reads as no cache", () => {
  expect(cacheAt("README")).toBeNull()
})
