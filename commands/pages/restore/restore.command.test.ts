import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { put } from "@akasha/testing-system/putting"
import { said as gitIn } from "../../../git/git-running/git-running.module.code.ts"
import type { Given } from "../../modules/calling/calling.module.code.ts"
import { scratchWorld } from "../../modules/scratching/scratching.module.code.ts"
import { restore } from "./restore.command.code.ts"

const ONE = "akasha/one.ts"

const TWO = "akasha/two.ts"

const HELD = "committed\n"

const DRIFT = "drifted here, and nobody committed it\n"

const scratch = scratchWorld()

afterAll(() => {
  scratch.sweep()
})

function repoWith(named: Readonly<Record<string, string>> = { [ONE]: HELD, [TWO]: HELD }): string {
  const root = scratch.rootFor("akasha-restore-")
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) put(root, path, body)
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  return root
}

function givenIn(root: string): Given {
  return { root, calledAs: "akasha restore", from: root, writer: null, agentId: null }
}

function onDisk(root: string, path: string): string {
  return readFileSync(join(root, path), "utf8")
}

function stagedOid(root: string, path: string): string {
  return gitIn(root, ["ls-files", "-s", "--", path]).split(" ")[1] ?? ""
}

function headOid(root: string, path: string): string {
  const said = gitIn(root, ["ls-tree", "HEAD", "--", path]).split(" ")[2] ?? ""
  return said.split("\t")[0] ?? ""
}

function drifted(root: string, path: string, body: string = DRIFT): undefined {
  writeFileSync(join(root, path), body)
}

test("a drifted file is the body HEAD holds again, on disk and in the git index", () => {
  const root = repoWith()
  drifted(root, ONE)
  gitIn(root, ["add", "--", ONE])
  expect(stagedOid(root, ONE)).not.toBe(headOid(root, ONE))
  const said = restore(["--file-path", ONE], givenIn(root))
  expect(said.code).toBe(0)
  expect(onDisk(root, ONE)).toBe(HELD)
  expect(stagedOid(root, ONE)).toBe(headOid(root, ONE))
  expect(gitIn(root, ["status", "--porcelain", "--", ONE])).toBe("")
})

test("a drift the git index alone holds is put back too", () => {
  const root = repoWith()
  drifted(root, ONE)
  gitIn(root, ["add", "--", ONE])
  writeFileSync(join(root, ONE), HELD)
  expect(stagedOid(root, ONE)).not.toBe(headOid(root, ONE))
  const said = restore(["--file-path", ONE], givenIn(root))
  expect(said.code).toBe(0)
  expect(stagedOid(root, ONE)).toBe(headOid(root, ONE))
  expect(said.report.join("\n")).toContain("the working tree already holds HEAD's body")
  expect(said.report.join("\n")).toContain("the git index holds another body")
})

test("a file the drift deleted off the disk comes back", () => {
  const root = repoWith()
  gitIn(root, ["rm", "--quiet", "--cached", "--", ONE])
  writeFileSync(join(root, ONE), DRIFT)
  const said = restore(["--file-path", ONE], givenIn(root))
  expect(said.code).toBe(0)
  expect(onDisk(root, ONE)).toBe(HELD)
  expect(stagedOid(root, ONE)).toBe(headOid(root, ONE))
})

test("a path HEAD does not hold is refused, and is left as it is", () => {
  const root = repoWith()
  const at = put(root, "akasha/untracked.ts", "another agent is working on this\n")
  const said = restore(["--file-path", "akasha/untracked.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("HEAD holds no akasha/untracked.ts")
  expect(said.refusals.join("\n")).toContain("refuses rather than deleting it")
  expect(existsSync(at)).toBe(true)
  expect(readFileSync(at, "utf8")).toBe("another agent is working on this\n")
})

test("a path already holding HEAD's body is left alone and said so", () => {
  const root = repoWith()
  const said = restore(["--file-path", ONE], givenIn(root))
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(
    `${ONE} is already the body HEAD holds, so akasha restore left it alone`
  )
  expect(said.report.join("\n")).not.toContain("is discarding uncommitted work")
})

test("what goes is said before what was put back", () => {
  const root = repoWith()
  drifted(root, ONE)
  const said = restore(["--file-path", ONE], givenIn(root)).report.join("\n")
  expect(said).toContain("akasha restore is discarding uncommitted work at 1 path")
  expect(said).toContain(
    `the working tree holds ${DRIFT.length} bytes where HEAD holds ${HELD.length}`
  )
  expect(said.indexOf("is discarding uncommitted work")).toBeLessThan(
    said.indexOf("is the body HEAD holds again")
  )
})

test("one path refused refuses the whole call, and nothing is written", () => {
  const root = repoWith()
  drifted(root, ONE)
  const said = restore(["--file-path", ONE, "--file-path", "akasha/gone.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(onDisk(root, ONE)).toBe(DRIFT)
})

test("a folder HEAD holds is refused rather than swept", () => {
  const root = repoWith()
  drifted(root, ONE)
  const said = restore(["--file-path", "akasha"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("as a tree rather than a file")
  expect(onDisk(root, ONE)).toBe(DRIFT)
})

test("the executable bit HEAD holds comes back with the body", () => {
  const root = repoWith()
  gitIn(root, ["update-index", "--chmod=+x", "--", ONE])
  gitIn(root, ["commit", "--quiet", "-m", "made it runnable"])
  writeFileSync(join(root, ONE), DRIFT, { mode: 0o644 })
  const said = restore(["--file-path", ONE], givenIn(root))
  expect(said.code).toBe(0)
  expect(statSync(join(root, ONE)).mode & 0o111).toBe(0o111)
  expect(stagedOid(root, ONE)).toBe(headOid(root, ONE))
})

test("several paths go back in one call", () => {
  const root = repoWith()
  drifted(root, ONE)
  drifted(root, TWO)
  const said = restore(["--file-path", ONE, "--file-path", TWO], givenIn(root))
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("at 2 paths")
  expect(onDisk(root, ONE)).toBe(HELD)
  expect(onDisk(root, TWO)).toBe(HELD)
})

test("a call naming no path is refused", () => {
  const root = repoWith()
  expect(restore([], givenIn(root)).refusals.join("\n")).toContain("name at least one path")
})

test("a path carrying no flag before it is refused rather than read as a named path", () => {
  const root = repoWith()
  const said = restore([ONE], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("carries no flag before it")
})

test("no flag but --file-path is taken", () => {
  const root = repoWith()
  for (const flag of ["--all", "--folder", "--message"]) {
    const said = restore([flag, "x"], givenIn(root))
    expect(said.code).toBe(1)
    expect(said.refusals.join("\n")).toContain("is not a flag this takes")
  }
})

test("a path outside the repository is refused", () => {
  const root = repoWith()
  const said = restore(["--file-path", "../elsewhere.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("no path inside the repository")
})

test("a path named twice is refused", () => {
  const root = repoWith()
  const said = restore(["--file-path", ONE, "--file-path", ONE], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("is named more than once")
})

test("nothing is committed", () => {
  const root = repoWith()
  const was = gitIn(root, ["rev-parse", "HEAD"])
  drifted(root, ONE)
  expect(restore(["--file-path", ONE], givenIn(root)).code).toBe(0)
  expect(gitIn(root, ["rev-parse", "HEAD"])).toBe(was)
  expect(gitIn(root, ["rev-list", "--count", "HEAD"]).trim()).toBe("1")
})
