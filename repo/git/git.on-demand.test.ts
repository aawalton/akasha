import { afterEach, beforeEach, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { commitPaths, git } from "./git.ts"

const NAMED = 1400

const AUTHOR = "Test <test@example.com>"

let root: string

function plant(count: number): readonly string[] {
  const paths: string[] = []
  for (let at = 0; at < count; at += 1) {
    const relPath = `pages/thing/${String(at).padStart(5, "0")}-a-name-long-enough-to-fill-the-argument-list.thing.md`
    writeFileSync(`${root}/${relPath}`, `${at}\n`)
    paths.push(relPath)
  }
  return paths
}

function commitCount(): number {
  return Number(git(root, ["rev-list", "--count", "HEAD"]).stdout)
}

beforeEach(() => {
  root = mkdtempSync("/var/tmp/ryn-git-pathspec-")
  git(root, ["init", "-q", "."])
  git(root, ["config", "user.email", "test@example.com"])
  git(root, ["config", "user.name", "Test"])
  mkdirSync(`${root}/pages/thing`, { recursive: true })
  writeFileSync(`${root}/seed.md`, "seed\n")
  commitPaths(root, ["seed.md"], "seed", AUTHOR)
})

afterEach(() => {
  rmSync(root, { recursive: true, force: true })
})

test("a pathspec list longer than the argument list holds still commits", () => {
  const paths = plant(NAMED)
  const bytes = paths.reduce((held, one) => held + one.length + 1, 0)
  expect(bytes).toBeGreaterThan(100_000)

  const before = commitCount()
  const outcome = commitPaths(root, paths, "many", AUTHOR)
  expect(outcome.ok).toBe(true)
  expect(commitCount()).toBe(before + 1)
})

test("every path named is tracked afterwards, none dropped by a batch boundary", () => {
  const paths = plant(NAMED)
  expect(commitPaths(root, paths, "many", AUTHOR).ok).toBe(true)
  const tracked = git(root, ["ls-files"]).stdout.split("\n").filter((one) => one !== "")
  expect(tracked.length).toBe(NAMED + 1)
})

test("a short pathspec list commits the same way, the ceiling changing nothing", () => {
  const paths = plant(3)
  const before = commitCount()
  expect(commitPaths(root, paths, "few", AUTHOR).ok).toBe(true)
  expect(commitCount()).toBe(before + 1)
  expect(git(root, ["ls-files"]).stdout.split("\n").filter((one) => one !== "").length).toBe(4)
})

test("naming a path that stands in no repo commits the rest and says which stood outside", () => {
  const paths = plant(4)
  const outcome = commitPaths(root, [...paths, "pages/thing/never-written.thing.md"], "some", AUTHOR)
  expect(outcome.ok).toBe(true)
  expect(outcome.nothing).toEqual(["pages/thing/never-written.thing.md"])
})
