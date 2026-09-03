import { afterAll, expect, test } from "bun:test"
import { symlinkSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { put } from "@akasha/testing-system/putting"
import { scratchWorld } from "../../../scratching/scratching.module.code.ts"
import { akashaUnder, countsIn, linesOf, shareOf } from "./repo-measuring.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repoAt(prefix: string): string {
  const root = scratch.rootFor(prefix)
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  return root
}

function repoWith(): string {
  const root = repoAt("repo-measuring-")
  put(root, ".gitignore", "dist/\nnode_modules/\nbuild/\n")
  put(root, "akasha/one.ts", "one\n")
  put(root, "akasha/deep/two.ts", "two\n")
  put(root, "tools/three.ts", "three\n")
  put(root, "node_modules/pkg/four.ts", "four\n")
  put(root, "akasha/node_modules/six.ts", "six\n")
  put(root, "tools/dist/eight.js", "eight\n")
  put(root, "akasha/dist/nine.js", "nine\n")
  put(root, "tools/build/twelve.js", "twelve\n")
  put(root, "akasha/build/thirteen.js", "thirteen\n")
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

test("a file the repository ignores is not counted, whatever its folder is named", () => {
  const counts = countsIn(repoWith())

  expect(counts.repo).toBe(4)
  expect(counts.akasha).toBe(2)
})

test("a file not yet committed is counted where the repository does not ignore it", () => {
  const root = repoWith()
  put(root, "tools/ten.ts", "ten\n")

  expect(countsIn(root).repo).toBe(5)
})

test("a file not yet committed the repository ignores is not counted", () => {
  const root = repoWith()
  put(root, "tools/dist/eleven.js", "eleven\n")

  expect(countsIn(root).repo).toBe(4)
})

test("the akasha folder is counted inside the repo as well as on its own", () => {
  const counts = countsIn(repoWith())

  expect(counts.akasha).toBe(2)
  expect(counts.repo).toBeGreaterThan(counts.akasha)
})

test("a symbolic link is the one path git holds rather than what it points at", () => {
  const root = repoWith()
  symlinkSync(join(root, "tools"), join(root, "akasha/linked"))
  git(root, ["add", "-A"])

  expect(countsIn(root).akasha).toBe(3)
})

test("a root git could not list throws rather than counting none", () => {
  const root = scratch.rootFor("repo-measuring-ungit-")
  put(root, "akasha/one.ts", "one\n")

  expect(() => countsIn(root)).toThrow()
})

test("the share is what has arrived over everything there is to arrive", () => {
  expect(shareOf({ repo: 3, akasha: 2 })).toBe("66.67")
  expect(shareOf({ repo: 1000, akasha: 15 })).toBe("1.50")
})

test("the numbers are set out in a column", () => {
  expect(linesOf({ repo: 95434, akasha: 1455 })).toEqual([
    "akasha  1455",
    "repo   95434",
    "share  1.52%",
  ])
})

test("a root holding no akasha folder is known to hold none", () => {
  const root = scratch.rootFor("repo-measuring-bare-")
  put(root, "tools/one.ts", "one\n")

  expect(akashaUnder(root)).toBe(false)
  expect(akashaUnder(repoWith())).toBe(true)
})
