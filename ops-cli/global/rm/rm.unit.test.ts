import { expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { emptiedBy, pruneEmptied, trackedUnder } from "./rm.command.code.attachment.ts"

const SCRATCH = "/var/tmp"

function scratchRepo(): string {
  const at = mkdtempSync(`${SCRATCH}/rm-`)
  execFileSync("git", ["-C", at, "init", "-q"])
  return at
}

function put(root: string, rel: string, body: string): void {
  mkdirSync(`${root}/${dirname(rel)}`, { recursive: true })
  writeFileSync(`${root}/${rel}`, body)
}

test("a directory opens onto every tracked file under it, however deep", () => {
  const at = scratchRepo()
  put(at, "shell/atlas/package.json", "{}")
  put(at, "shell/atlas/scripts/seam.sh", "#!/bin/sh\n")
  put(at, "shell/other/package.json", "{}")
  execFileSync("git", ["-C", at, "add", "-A"])
  expect(trackedUnder(at, "shell/atlas")).toEqual([
    "shell/atlas/package.json",
    "shell/atlas/scripts/seam.sh",
  ])
})

test("what git does not hold is not swept up by naming its directory", () => {
  const at = scratchRepo()
  put(at, "shell/atlas/package.json", "{}")
  execFileSync("git", ["-C", at, "add", "-A"])
  put(at, "shell/atlas/node_modules/left/index.js", "")
  expect(trackedUnder(at, "shell/atlas")).toEqual(["shell/atlas/package.json"])
})

test("a directory git holds nothing under opens onto nothing, so the caller is refused", () => {
  const at = scratchRepo()
  put(at, "shell/atlas/node_modules/left/index.js", "")
  expect(trackedUnder(at, "shell/atlas")).toEqual([])
})

test("the directories a removal could empty are named deepest first", () => {
  expect(emptiedBy("/x", ["shell/atlas/scripts/seam.sh"])).toEqual([
    "shell/atlas/scripts",
    "shell/atlas",
    "shell",
  ])
})

test("a file at the root empties nothing", () => {
  expect(emptiedBy("/x", ["bun.lock"])).toEqual([])
})

test("a directory the removal emptied goes, and so does the parent it emptied in turn", () => {
  const at = scratchRepo()
  put(at, "shell/atlas/scripts/seam.sh", "#!/bin/sh\n")
  rmSync(`${at}/shell/atlas/scripts/seam.sh`)
  expect(pruneEmptied(at, ["shell/atlas/scripts/seam.sh"])).toEqual([
    "shell/atlas/scripts",
    "shell/atlas",
    "shell",
  ])
  expect(existsSync(`${at}/shell`)).toBe(false)
})

test("a directory still holding something is left where it is", () => {
  const at = scratchRepo()
  put(at, "shell/atlas/package.json", "{}")
  put(at, "shell/atlas/scripts/seam.sh", "#!/bin/sh\n")
  rmSync(`${at}/shell/atlas/scripts/seam.sh`)
  expect(pruneEmptied(at, ["shell/atlas/scripts/seam.sh"])).toEqual(["shell/atlas/scripts"])
  expect(existsSync(`${at}/shell/atlas`)).toBe(true)
})

test("the repository root is never pruned, whatever went from it", () => {
  const at = scratchRepo()
  put(at, "only.txt", "x")
  rmSync(`${at}/only.txt`)
  expect(pruneEmptied(at, ["only.txt"])).toEqual([])
  expect(existsSync(at)).toBe(true)
})
