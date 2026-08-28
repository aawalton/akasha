import { expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs"
import { scanIn } from "./page-types.ts"

const SCRATCH = "/var/tmp"

function scratchRepo(): string {
  const at = mkdtempSync(`${SCRATCH}/page-types-scan-`)
  execFileSync("git", ["-C", at, "init", "-q"])
  execFileSync("git", ["-C", at, "config", "user.email", "a@b.c"])
  execFileSync("git", ["-C", at, "config", "user.name", "t"])
  writeFileSync(`${at}/.gitignore`, "node_modules/\n")
  writeFileSync(`${at}/kept.domain.md`, "# kept\n")
  mkdirSync(`${at}/node_modules`)
  writeFileSync(`${at}/node_modules/stray.domain.md`, "# stray\n")
  execFileSync("git", ["-C", at, "add", "-A"])
  execFileSync("git", ["-C", at, "commit", "-qm", "hold"])
  return at
}

test("a scan of a root git can answer for leaves the ignored page out", () => {
  expect(scanIn(scratchRepo(), ["**/*.domain.md"], null)).toEqual(["kept.domain.md"])
})

test("a scan of a root git could not be asked about refuses rather than returning the corpus", () => {
  const at = scratchRepo()
  writeFileSync(`${at}/.git/index`, "not an index\n")
  expect(() => scanIn(at, ["**/*.domain.md"], null)).toThrow(/could not establish what/)
})
