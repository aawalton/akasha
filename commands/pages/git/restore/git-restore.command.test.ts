import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, rmSync, statSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { gitRestore } from "akasha/commands/pages/git/restore/git-restore.command.code.ts"
import { said as gitIn } from "akasha/git/running/git-running.module.code.ts"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const ONE = "akasha/one.ts"

const TWO = "akasha/two.ts"

const RESIDUE = "akasha/residue.ts"

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
  return { root, calledAs: "akasha git restore", from: root, writer: null, agentId: null }
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

function indexOnly(root: string, body: string = DRIFT): string {
  const at = put(root, RESIDUE, body)
  gitIn(root, ["add", "--", RESIDUE])
  rmSync(at)
  return at
}

test("a drifted file is the body HEAD holds again, on disk and in the git index", () => {
  const root = repoWith()
  drifted(root, ONE)
  gitIn(root, ["add", "--", ONE])
  expect(stagedOid(root, ONE)).not.toBe(headOid(root, ONE))
  const said = gitRestore(["--file-path", ONE], givenIn(root))
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
  const said = gitRestore(["--file-path", ONE], givenIn(root))
  expect(said.code).toBe(0)
  expect(stagedOid(root, ONE)).toBe(headOid(root, ONE))
  expect(said.report.join("\n")).toContain("the working tree already holds HEAD's body")
  expect(said.report.join("\n")).toContain("the git index holds another body")
})

test("a file the drift deleted off the disk comes back", () => {
  const root = repoWith()
  gitIn(root, ["rm", "--quiet", "--cached", "--", ONE])
  writeFileSync(join(root, ONE), DRIFT)
  const said = gitRestore(["--file-path", ONE], givenIn(root))
  expect(said.code).toBe(0)
  expect(onDisk(root, ONE)).toBe(HELD)
  expect(stagedOid(root, ONE)).toBe(headOid(root, ONE))
})

test("a path HEAD does not hold is refused, and is left as it is", () => {
  const root = repoWith()
  const at = put(root, "akasha/untracked.ts", "another agent is working on this\n")
  const said = gitRestore(["--file-path", "akasha/untracked.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("HEAD holds no akasha/untracked.ts")
  expect(said.refusals.join("\n")).toContain("refuses rather than deleting it")
  expect(existsSync(at)).toBe(true)
  expect(readFileSync(at, "utf8")).toBe("another agent is working on this\n")
})

test("a git index entry HEAD and the working tree both lack is cleared", () => {
  const root = repoWith()
  const at = indexOnly(root)
  expect(stagedOid(root, RESIDUE)).not.toBe("")
  const said = gitRestore(["--file-path", RESIDUE], givenIn(root))
  expect(said.code).toBe(0)
  expect(stagedOid(root, RESIDUE)).toBe("")
  expect(existsSync(at)).toBe(false)
  expect(gitIn(root, ["status", "--porcelain", "--", RESIDUE])).toBe("")
  expect(said.report.join("\n")).toContain("is clearing a git index entry at 1 path")
  expect(said.report.join("\n")).toContain(`${RESIDUE} is out of the git index`)
  expect(said.report.join("\n")).not.toContain("is discarding uncommitted work")
})

test("a path the git index holds and the working tree holds too is refused, and both are left", () => {
  const root = repoWith()
  const body = "another agent staged this and has not landed it\n"
  const at = put(root, RESIDUE, body)
  gitIn(root, ["add", "--", RESIDUE])
  const was = stagedOid(root, RESIDUE)
  const said = gitRestore(["--file-path", RESIDUE], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("work another agent staged and has not landed")
  expect(existsSync(at)).toBe(true)
  expect(readFileSync(at, "utf8")).toBe(body)
  expect(stagedOid(root, RESIDUE)).toBe(was)
})

test("a git index entry that is no file is refused rather than cleared", () => {
  const root = repoWith()
  symlinkSync("one.ts", join(root, RESIDUE))
  gitIn(root, ["add", "--", RESIDUE])
  rmSync(join(root, RESIDUE))
  const said = gitRestore(["--file-path", RESIDUE], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("with mode 120000")
  expect(stagedOid(root, RESIDUE)).not.toBe("")
})

test("one path refused leaves a git index entry the same call would have cleared", () => {
  const root = repoWith()
  indexOnly(root)
  const was = stagedOid(root, RESIDUE)
  const said = gitRestore(["--file-path", RESIDUE, "--file-path", "akasha/gone.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(stagedOid(root, RESIDUE)).toBe(was)
})

test("a git index entry cleared and a body put back go in one call", () => {
  const root = repoWith()
  drifted(root, ONE)
  indexOnly(root)
  const said = gitRestore(["--file-path", ONE, "--file-path", RESIDUE], givenIn(root))
  expect(said.code).toBe(0)
  expect(onDisk(root, ONE)).toBe(HELD)
  expect(stagedOid(root, ONE)).toBe(headOid(root, ONE))
  expect(stagedOid(root, RESIDUE)).toBe("")
  const report = said.report.join("\n")
  expect(report.indexOf("is clearing a git index entry")).toBeLessThan(
    report.indexOf("is the body HEAD holds again")
  )
})

test("a path already holding HEAD's body is left alone and said so", () => {
  const root = repoWith()
  const said = gitRestore(["--file-path", ONE], givenIn(root))
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(
    `${ONE} is already the body HEAD holds, so akasha git restore left it alone`
  )
  expect(said.report.join("\n")).not.toContain("is discarding uncommitted work")
})

test("what goes is said before what was put back", () => {
  const root = repoWith()
  drifted(root, ONE)
  const said = gitRestore(["--file-path", ONE], givenIn(root)).report.join("\n")
  expect(said).toContain("akasha git restore is discarding uncommitted work at 1 path")
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
  const said = gitRestore(["--file-path", ONE, "--file-path", "akasha/gone.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(onDisk(root, ONE)).toBe(DRIFT)
})

test("a folder HEAD holds is refused rather than swept", () => {
  const root = repoWith()
  drifted(root, ONE)
  const said = gitRestore(["--file-path", "akasha"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("as a tree rather than a file")
  expect(onDisk(root, ONE)).toBe(DRIFT)
})

test("the executable bit HEAD holds comes back with the body", () => {
  const root = repoWith()
  gitIn(root, ["update-index", "--chmod=+x", "--", ONE])
  gitIn(root, ["commit", "--quiet", "-m", "made it runnable"])
  writeFileSync(join(root, ONE), DRIFT, { mode: 0o644 })
  const said = gitRestore(["--file-path", ONE], givenIn(root))
  expect(said.code).toBe(0)
  expect(statSync(join(root, ONE)).mode & 0o111).toBe(0o111)
  expect(stagedOid(root, ONE)).toBe(headOid(root, ONE))
})

test("several paths go back in one call", () => {
  const root = repoWith()
  drifted(root, ONE)
  drifted(root, TWO)
  const said = gitRestore(["--file-path", ONE, "--file-path", TWO], givenIn(root))
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("at 2 paths")
  expect(onDisk(root, ONE)).toBe(HELD)
  expect(onDisk(root, TWO)).toBe(HELD)
})

test("a call naming no path is refused", () => {
  const root = repoWith()
  expect(gitRestore([], givenIn(root)).refusals.join("\n")).toContain("name at least one path")
})

test("a path carrying no flag before it is refused rather than read as a named path", () => {
  const root = repoWith()
  const said = gitRestore([ONE], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("carries no flag before it")
})

test("no flag but --file-path is taken", () => {
  const root = repoWith()
  for (const flag of ["--all", "--folder", "--message"]) {
    const said = gitRestore([flag, "x"], givenIn(root))
    expect(said.code).toBe(1)
    expect(said.refusals.join("\n")).toContain("is not a flag this takes")
  }
})

test("a path outside the repository is refused", () => {
  const root = repoWith()
  const said = gitRestore(["--file-path", "../elsewhere.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("no path inside the repository")
})

test("a path named twice is refused", () => {
  const root = repoWith()
  const said = gitRestore(["--file-path", ONE, "--file-path", ONE], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("is named more than once")
})

test("nothing is committed", () => {
  const root = repoWith()
  const was = gitIn(root, ["rev-parse", "HEAD"])
  drifted(root, ONE)
  expect(gitRestore(["--file-path", ONE], givenIn(root)).code).toBe(0)
  expect(gitIn(root, ["rev-parse", "HEAD"])).toBe(was)
  expect(gitIn(root, ["rev-list", "--count", "HEAD"]).trim()).toBe("1")
})
