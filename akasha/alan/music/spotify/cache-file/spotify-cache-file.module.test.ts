import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"
import {
  cachePathOf,
  defaultBaseDir,
  readCacheFile,
  removeCacheFile,
  writeCacheFile,
} from "./spotify-cache-file.module.code.ts"

const shape = z.object({ one: z.string() }).strict()

const ROOT = mkdtempSync("/var/tmp/spotify-cache-file-")

let next = 0

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

function scratch(): string {
  next += 1
  return join(ROOT, `at-${next}`)
}

test("the default folder is the one the old client already writes to", () => {
  expect(defaultBaseDir().endsWith("/.cache/collections-music-spotify")).toBe(true)
})

test("an override names the whole path", () => {
  expect(cachePathOf("token.json", "/somewhere/else.json")).toBe("/somewhere/else.json")
})

test("an empty override is no override", () => {
  expect(cachePathOf("token.json", "", "/base")).toBe("/base/token.json")
})

test("a file written is read back whole", () => {
  const path = join(scratch(), "one.json")
  writeCacheFile(path, { one: "two" })
  expect(readCacheFile(path, shape, "one")).toEqual({ one: "two" })
})

test("a file lands readable and writable by its owner alone", () => {
  const path = join(scratch(), "one.json")
  writeCacheFile(path, { one: "two" })
  expect(statSync(path).mode & 0o777).toBe(0o600)
})

test("a file written into a folder that is not there yet still lands", () => {
  const path = join(scratch(), "deeper", "one.json")
  writeCacheFile(path, { one: "two" })
  expect(readCacheFile(path, shape, "one")).toEqual({ one: "two" })
})

test("a missing file reads as nothing", () => {
  expect(readCacheFile(join(scratch(), "absent.json"), shape, "one")).toBe(null)
})

test("a file that will not parse reads as nothing", () => {
  const path = join(scratch(), "one.json")
  writeCacheFile(path, { one: "two" })
  writeFileSync(path, "{ not json")
  expect(readCacheFile(path, shape, "one")).toBe(null)
})

test("a file the shape refuses reads as nothing", () => {
  const path = join(scratch(), "one.json")
  writeCacheFile(path, { two: 3 })
  expect(readCacheFile(path, shape, "one")).toBe(null)
})

test("removing a file takes it away", () => {
  const path = join(scratch(), "one.json")
  writeCacheFile(path, { one: "two" })
  removeCacheFile(path)
  expect(readCacheFile(path, shape, "one")).toBe(null)
})

test("removing a file that is already gone is done", () => {
  expect(removeCacheFile(join(scratch(), "absent.json"))).toBe(undefined)
})
