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

// A git call that could not answer, failed for a real reason rather than stubbed: `ls-files
// --others --ignored` reads the index, and an index it cannot parse is a shape a damaged repository
// takes. `rev-parse --git-dir` reads no index, so the checkout is still found — which is what tells
// this apart from a directory standing in no repository at all.
function loseIndex(root: string): void {
  writeFileSync(`${root}/.git/index`, "not an index\n")
}

test("a repository that ignores nothing answers with every path", () => {
  expect(notIgnored(scratchRepo(null), PATHS)).toEqual(PATHS)
})

test("a repository that ignores one of them answers without it", () => {
  expect(notIgnored(scratchRepo("node_modules/\n"), PATHS)).toEqual(["kept.domain.md"])
})

// A TRUE EMPTY AND A FAILED CALL MUST NOT READ ALIKE. This repository ignores `node_modules`, so
// the full list the old code handed back was a claim about its ignore rules that no call supported.
test("a repository git could not be asked about answers null, not every path", () => {
  const at = scratchRepo("node_modules/\n")
  loseIndex(at)
  expect(notIgnored(at, PATHS)).toBe(null)
})

// A ROOT IN NO CHECKOUT GENUINELY IGNORES NOTHING, and refusing there would turn every scan of a
// plain directory into a fault.
test("a directory standing in no git checkout answers with every path", () => {
  expect(notIgnored(mkdtempSync(`${SCRATCH}/ignored-bare-`), PATHS)).toEqual(PATHS)
})

// A NON-ANSWER IS NEVER CACHED. The map holds for the life of the process, so a failure written
// into it would go on answering later questions about this root with the whole list.
test("a failure followed by a repair answers from the repair", () => {
  const at = scratchRepo("node_modules/\n")
  loseIndex(at)
  expect(notIgnored(at, PATHS)).toBe(null)
  rmSync(`${at}/.git/index`)
  execFileSync("git", ["-C", at, "read-tree", "HEAD"])
  expect(notIgnored(at, PATHS)).toEqual(["kept.domain.md"])
})
