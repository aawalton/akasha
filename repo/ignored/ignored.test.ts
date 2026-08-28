import { expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { notIgnored } from "./ignored.ts"

const SCRATCH = "/var/tmp"

const PATHS = ["kept.domain.md", "node_modules/stray.domain.md"]

function scratchRepo(ignoring: string | null): string {
  const at = mkdtempSync(`${SCRATCH}/ignored-`)
  execFileSync("git", ["-C", at, "init", "-q"])
  execFileSync("git", ["-C", at, "config", "user.email", "a@b.c"])
  execFileSync("git", ["-C", at, "config", "user.name", "t"])
  if (ignoring !== null) writeFileSync(`${at}/.gitignore`, ignoring)
  writeFileSync(`${at}/kept.domain.md`, "# kept\n")
  mkdirSync(`${at}/node_modules`)
  writeFileSync(`${at}/node_modules/stray.domain.md`, "# stray\n")
  execFileSync("git", ["-C", at, "add", "-A"])
  execFileSync("git", ["-C", at, "commit", "-qm", "hold"])
  return at
}

function loseIndex(root: string): void {
  writeFileSync(`${root}/.git/index`, "not an index\n")
}

test("a repository that ignores nothing answers with every path", () => {
  expect(notIgnored(scratchRepo(null), PATHS)).toEqual(PATHS)
})

test("a repository that ignores one of them answers without it", () => {
  expect(notIgnored(scratchRepo("node_modules/\n"), PATHS)).toEqual(["kept.domain.md"])
})

test("a repository git could not be asked about answers null, not every path", () => {
  const at = scratchRepo("node_modules/\n")
  loseIndex(at)
  expect(notIgnored(at, PATHS)).toBe(null)
})

test("a directory standing in no git checkout answers with every path", () => {
  expect(notIgnored(mkdtempSync(`${SCRATCH}/ignored-bare-`), PATHS)).toEqual(PATHS)
})

test("a failure followed by a repair answers from the repair", () => {
  const at = scratchRepo("node_modules/\n")
  loseIndex(at)
  expect(notIgnored(at, PATHS)).toBe(null)
  rmSync(`${at}/.git/index`)
  execFileSync("git", ["-C", at, "read-tree", "HEAD"])
  expect(notIgnored(at, PATHS)).toEqual(["kept.domain.md"])
})
