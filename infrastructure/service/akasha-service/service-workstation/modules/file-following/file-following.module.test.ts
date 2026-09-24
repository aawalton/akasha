import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  digestOf,
  dirsOf,
  filesWithin,
  followFolders,
  followWithin,
  movedBetween,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/file-following/file-following.module.code.ts"

const ROOT = mkdtempSync("/var/tmp/file-following-")

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

function fileAt(name: string, text: string): string {
  const at = join(ROOT, name)
  writeFileSync(at, text)
  return at
}

test("a folder followed for its events names itself and is never read", async () => {
  const dir = mkdtempSync("/var/tmp/file-events-")
  const moved: string[][] = []
  const following = followFolders(
    new Set([dir]),
    (what) => {
      moved.push([...what])
    },
    20
  )
  await Bun.sleep(60)
  writeFileSync(join(dir, "anything.at.all"), "here")
  await Bun.sleep(200)
  following.stop()
  rmSync(dir, { recursive: true, force: true })
  expect(moved.every((one) => one.length === 1 && one[0] === dir)).toBe(true)
  expect(moved.length).toBeGreaterThan(1)
})

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

test("what a folder holds is what the test admits of it", () => {
  const kept = fileAt("kept.seat.ts", "one")
  fileAt("skipped.other", "two")
  const found = filesWithin([ROOT], (at) => at.endsWith(".seat.ts"))
  expect(found.has(kept)).toBe(true)
  expect([...found].some((at) => at.endsWith(".other"))).toBe(false)
})

test("a folder read with a reach holds what the test admits that many folders down", () => {
  const dir = mkdtempSync("/var/tmp/file-reach-")
  mkdirSync(join(dir, "one", "two"), { recursive: true })
  const near = join(dir, "near.seat.ts")
  const below = join(dir, "one", "below.seat.ts")
  const deeper = join(dir, "one", "two", "deeper.seat.ts")
  for (const at of [near, below, deeper]) writeFileSync(at, "here")
  const admits = (at: string): boolean => at.endsWith(".seat.ts")
  const flat = filesWithin([dir], admits)
  const reached = filesWithin([dir], admits, 1)
  rmSync(dir, { recursive: true, force: true })
  expect([...flat]).toEqual([near])
  expect([...reached].sort()).toEqual([near, below])
})

test("a file in a folder made below a folder followed with a reach is answered", async () => {
  const dir = mkdtempSync("/var/tmp/file-reach-follow-")
  const moved: string[][] = []
  const following = followWithin(
    new Set([dir]),
    (at) => at.endsWith(".seat.ts"),
    (what) => {
      moved.push([...what])
    },
    20,
    undefined,
    1
  )
  await Bun.sleep(60)
  mkdirSync(join(dir, "fresh"))
  const fresh = join(dir, "fresh", "fresh.seat.ts")
  writeFileSync(fresh, "new")
  await Bun.sleep(200)
  writeFileSync(fresh, "changed")
  await Bun.sleep(200)
  following.stop()
  rmSync(dir, { recursive: true, force: true })
  expect(moved.flat()).toEqual([fresh, fresh])
})

test("a folder that is not there holds nothing rather than throwing", () => {
  expect(filesWithin([join(ROOT, "never")], () => true).size).toBe(0)
})

test("a file appearing in a followed folder is answered", async () => {
  const dir = mkdtempSync("/var/tmp/file-appearing-")
  const moved: string[][] = []
  const following = followWithin(
    new Set([dir]),
    (at) => at.endsWith(".seat.ts"),
    (what) => {
      moved.push([...what])
    },
    20
  )
  await Bun.sleep(60)
  const fresh = join(dir, "fresh.seat.ts")
  writeFileSync(fresh, "new")
  await Bun.sleep(200)
  following.stop()
  rmSync(dir, { recursive: true, force: true })
  expect(moved.flat()).toEqual([fresh])
})

test("a file the test does not admit is answered from no folder", async () => {
  const dir = mkdtempSync("/var/tmp/file-unadmitted-")
  const moved: string[][] = []
  const following = followWithin(
    new Set([dir]),
    (at) => at.endsWith(".seat.ts"),
    (what) => {
      moved.push([...what])
    },
    20
  )
  await Bun.sleep(60)
  writeFileSync(join(dir, "fresh.other"), "new")
  await Bun.sleep(200)
  following.stop()
  rmSync(dir, { recursive: true, force: true })
  expect(moved.flat()).toEqual([])
})

test("a file going from a followed folder is answered", async () => {
  const dir = mkdtempSync("/var/tmp/file-going-")
  const doomed = join(dir, "doomed.seat.ts")
  writeFileSync(doomed, "here")
  const moved: string[][] = []
  const following = followWithin(
    new Set([dir]),
    (at) => at.endsWith(".seat.ts"),
    (what) => {
      moved.push([...what])
    },
    20
  )
  await Bun.sleep(60)
  rmSync(doomed)
  await Bun.sleep(200)
  following.stop()
  rmSync(dir, { recursive: true, force: true })
  expect(moved.flat()).toEqual([doomed])
})
