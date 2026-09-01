import { afterAll, expect, test } from "bun:test"
import { symlinkSync } from "node:fs"
import { join } from "node:path"
import { put } from "../../../../testing-system/putting/putting.module.code.ts"
import { scratchWorld } from "../../../scratching/scratching.module.code.ts"
import { akashaStandsIn, countsIn, linesOf, shareOf } from "./repo-measuring.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repoWith(): string {
  const root = scratch.rootFor("repo-measuring-")
  put(root, "akasha/one.ts", "one\n")
  put(root, "akasha/deep/two.ts", "two\n")
  put(root, "tools/three.ts", "three\n")
  put(root, "node_modules/pkg/four.ts", "four\n")
  put(root, ".git/objects/five", "five\n")
  put(root, "akasha/node_modules/six.ts", "six\n")
  put(root, "tools/nested/.git/seven", "seven\n")
  put(root, "tools/dist/eight.js", "eight\n")
  put(root, "akasha/dist/nine.js", "nine\n")
  return root
}

test("`node_modules` and `.git` are skipped wherever they stand", () => {
  const counts = countsIn(repoWith())

  expect(counts.repo).toBe(3)
})

test("`dist` is skipped wherever it stands", () => {
  const counts = countsIn(repoWith())

  expect(counts.repo).toBe(3)
  expect(counts.akasha).toBe(2)
})

test("the akasha folder is counted inside the repo as well as on its own", () => {
  const counts = countsIn(repoWith())

  expect(counts.akasha).toBe(2)
  expect(counts.repo).toBeGreaterThan(counts.akasha)
})

test("a symbolic link is neither followed nor counted", () => {
  const root = repoWith()
  symlinkSync(join(root, "tools"), join(root, "akasha/linked"))

  expect(countsIn(root).akasha).toBe(2)
})

test("the share is what has arrived over everything there is to arrive", () => {
  expect(shareOf({ repo: 3, akasha: 2 })).toBe("66.67")
  expect(shareOf({ repo: 1000, akasha: 15 })).toBe("1.50")
})

test("the numbers stand in a column", () => {
  expect(linesOf({ repo: 95434, akasha: 1455 })).toEqual([
    "akasha  1455",
    "repo   95434",
    "share  1.52%",
  ])
})

test("a root holding no akasha folder is known to hold none", () => {
  const root = scratch.rootFor("repo-measuring-bare-")
  put(root, "tools/one.ts", "one\n")

  expect(akashaStandsIn(root)).toBe(false)
  expect(akashaStandsIn(repoWith())).toBe(true)
})
