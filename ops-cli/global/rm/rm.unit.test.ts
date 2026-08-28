import { expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { emptiedBy, pruneEmptied, trackedUnder } from "./rm.command.code.attachment.ts"

const SCRATCH = "/var/tmp"

const ENTRY = `${import.meta.dir}/rm.command.code.attachment.ts`

interface Ran {
  readonly code: number
  readonly said: string
}

function scratchRepo(): string {
  const at = mkdtempSync(`${SCRATCH}/rm-`)
  execFileSync("git", ["-C", at, "init", "-q"])
  execFileSync("git", ["-C", at, "config", "user.email", "a@b.c"])
  execFileSync("git", ["-C", at, "config", "user.name", "t"])
  return at
}

function committed(root: string, rel: string, body: string): void {
  put(root, rel, body)
  execFileSync("git", ["-C", root, "add", "--", rel])
  execFileSync("git", ["-C", root, "commit", "-qm", `hold ${rel}`])
}

function removing(root: string, args: readonly string[]): Ran {
  const ran = Bun.spawnSync({
    cmd: [process.execPath, ENTRY, ...args],
    cwd: root,
    env: { ...process.env, CODE_EDITOR_ROOT: root },
    stdout: "pipe",
    stderr: "pipe",
  })
  return { code: ran.exitCode ?? -1, said: ran.stderr.toString() + ran.stdout.toString() }
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

function unreadableIndex(root: string): void {
  writeFileSync(`${root}/.git/index`, "not an index")
}

test("a directory whose ls-files could not answer opens onto null, not onto nothing", () => {
  const at = scratchRepo()
  put(at, "shell/atlas/package.json", "{}")
  put(at, "shell/atlas/scripts/seam.sh", "#!/bin/sh\n")
  execFileSync("git", ["-C", at, "add", "-A"])
  unreadableIndex(at)
  expect(trackedUnder(at, "shell/atlas")).toBe(null)
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

test("a path standing in the worktree is taken", () => {
  const at = scratchRepo()
  committed(at, "was.txt", "body\n")
  const ran = removing(at, ["was.txt", "--dry-run"])
  expect(ran.code).toBe(0)
  expect(ran.said).toContain("1 removed")
})

test("a path the worktree has lost while git still holds it is taken", () => {
  const at = scratchRepo()
  committed(at, "was.txt", "body\n")
  rmSync(`${at}/was.txt`)
  const ran = removing(at, ["was.txt", "--dry-run"])
  expect(ran.code).toBe(0)
  expect(ran.said).toContain("1 removed")
})

test("a path neither the worktree nor git holds is refused", () => {
  const at = scratchRepo()
  committed(at, "was.txt", "body\n")
  const ran = removing(at, ["never.txt", "--dry-run"])
  expect(ran.code).toBe(1)
  expect(ran.said).toContain("does not exist")
})

test("a directory git could not be asked about is refused differently from one holding nothing", () => {
  const empty = scratchRepo()
  committed(empty, "root.txt", "x\n")
  put(empty, "shell/atlas/node_modules/left/index.js", "")
  const onEmpty = removing(empty, ["shell/atlas", "--dry-run"])

  const failed = scratchRepo()
  put(failed, "shell/atlas/package.json", "{}")
  put(failed, "shell/atlas/scripts/seam.sh", "#!/bin/sh\n")
  execFileSync("git", ["-C", failed, "add", "-A"])
  execFileSync("git", ["-C", failed, "commit", "-qm", "hold"])
  unreadableIndex(failed)
  const onFailure = removing(failed, ["shell/atlas", "--dry-run"])

  expect(onEmpty.code).toBe(1)
  expect(onEmpty.said).toContain("holds no file under")
  expect(onFailure.code).toBe(1)
  expect(onFailure.said).toContain("could not establish")
  expect(onFailure.said).not.toContain("holds no file under")
  expect(existsSync(`${failed}/shell/atlas/package.json`)).toBe(true)
})
