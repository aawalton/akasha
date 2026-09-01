import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { digestOf, dirsOf, followFiles, movedBetween } from "./file-following.module.code.ts"

const ROOT = mkdtempSync("/var/tmp/file-following-")

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

function fileAt(name: string, text: string): string {
  const at = join(ROOT, name)
  writeFileSync(at, text)
  return at
}

test("a file that is not there is weighed as gone rather than throwing", () => {
  expect(digestOf([join(ROOT, "never.ts")]).get(join(ROOT, "never.ts"))).toBe("gone")
})

test("two files of the same bytes weigh the same and different bytes do not", () => {
  const a = fileAt("a.txt", "same")
  const b = fileAt("b.txt", "same")
  const c = fileAt("c.txt", "other")
  const held = digestOf([a, b, c])
  expect(held.get(a)).toBe(held.get(b) as string)
  expect(held.get(a)).not.toBe(held.get(c) as string)
})

test("what changed between two weighings is what is answered", () => {
  const a = fileAt("m.txt", "before")
  const before = digestOf([a])
  writeFileSync(a, "after")
  expect(movedBetween(before, digestOf([a]))).toEqual([a])
  expect(movedBetween(before, before)).toEqual([])
})

test("a file that goes counts as a file that changed", () => {
  const a = join(ROOT, "gone.txt")
  writeFileSync(a, "here")
  const before = digestOf([a])
  rmSync(a)
  expect(movedBetween(before, digestOf([a]))).toEqual([a])
})

test("a file dropped from the set counts as a file that changed", () => {
  const a = fileAt("dropped.txt", "here")
  expect(movedBetween(digestOf([a]), digestOf([]))).toEqual([a])
})

test("the folders watched are the ones holding the files", () => {
  expect([...dirsOf([join(ROOT, "x.ts"), join(ROOT, "y.ts")])]).toEqual([ROOT])
})

test("a file changing after the watch is set up is answered once", async () => {
  const a = fileAt("watched.txt", "one")
  const moved: string[][] = []
  const following = followFiles(
    new Set([a]),
    (what) => {
      moved.push([...what])
    },
    20
  )
  await Bun.sleep(60)
  writeFileSync(a, "two")
  await Bun.sleep(200)
  following.stop()
  expect(moved.length).toBeGreaterThan(0)
  expect(moved[0]).toEqual([a])
})

test("a file changing before the watch is set up is still caught", async () => {
  const a = fileAt("early.txt", "one")
  const before = digestOf([a])
  writeFileSync(a, "two")
  const moved: string[][] = []
  const following = followFiles(
    new Set([a]),
    (what) => {
      moved.push([...what])
    },
    20,
    before
  )
  await Bun.sleep(200)
  following.stop()
  expect(moved[0]).toEqual([a])
})
