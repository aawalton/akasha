import { describe, expect, it } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { runCmd, runGit, runGitRaw } from "./git"
import { readPorcelainStatus } from "./porcelain-status"

async function repoWithUnstagedLockfile(): Promise<string> {
  const dir = mkdtempSync(join(tmpdir(), "porcelain-status-"))
  await runGit(["init", "-q", "."], dir)
  await runGit(["config", "user.email", "t@t.t"], dir)
  await runGit(["config", "user.name", "t"], dir)
  writeFileSync(join(dir, "bun.lock"), "lock\n")
  await runGit(["add", "-A"], dir)
  await runGit(["commit", "-qm", "init"], dir)
  writeFileSync(join(dir, "bun.lock"), "lock2\n")
  return dir
}

describe("runCmd keeps trimming — callers that want trimmed output still get it", () => {
  it("strips the trailing newline from stdout, as every rev-parse caller relies on", async () => {
    const dir = mkdtempSync(join(tmpdir(), "porcelain-trim-"))
    try {
      const result = await runCmd(["printf", "sha\\n"], dir)
      expect(result.stdout).toBe("sha")
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it("still eats a significant leading space — the defect is preserved here on purpose", async () => {
    const dir = await repoWithUnstagedLockfile()
    try {
      const trimmed = await runGit(["status", "--porcelain"], dir)
      expect(trimmed.stdout).toBe("M bun.lock")
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe("runGitRaw", () => {
  it("returns stdout byte-exact, leading column intact", async () => {
    const dir = await repoWithUnstagedLockfile()
    try {
      const raw = await runGitRaw(["status", "--porcelain"], dir)
      expect(raw.ok).toBe(true)
      expect(raw.stdout).toBe(" M bun.lock\n")
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it("reports a missing cwd the same way the trimming reader does", async () => {
    const missing = join(tmpdir(), "porcelain-status-missing-should-not-exist")
    rmSync(missing, { recursive: true, force: true })
    const raw = await runGitRaw(["status"], missing)
    expect(raw.ok).toBe(false)
    expect(raw.stderr).toContain(`cwd missing: ${missing}`)
  })
})

describe("readPorcelainStatus", () => {
  it("reads an unstaged lockfile modification as bun.lock, not un.lock", async () => {
    const dir = await repoWithUnstagedLockfile()
    try {
      const result = await readPorcelainStatus(dir, { untrackedFiles: "no" })
      expect(result.ok).toBe(true)
      if (!result.ok) return
      expect(result.entries).toEqual([
        { index: " ", worktree: "M", path: "bun.lock", origPath: undefined },
      ])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it("corrupts no path when several files are dirty", async () => {
    const dir = await repoWithUnstagedLockfile()
    try {
      writeFileSync(join(dir, "a.ts"), "x\n")
      await runGit(["add", "a.ts"], dir)
      await runGit(["commit", "-qm", "a"], dir)
      writeFileSync(join(dir, "a.ts"), "y\n")
      const result = await readPorcelainStatus(dir, { untrackedFiles: "no" })
      expect(result.ok).toBe(true)
      if (!result.ok) return
      expect(result.entries.map((e) => e.path).sort()).toEqual(["a.ts", "bun.lock"])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it("returns no entries for a clean tree", async () => {
    const dir = mkdtempSync(join(tmpdir(), "porcelain-clean-"))
    try {
      await runGit(["init", "-q", "."], dir)
      await runGit(["config", "user.email", "t@t.t"], dir)
      await runGit(["config", "user.name", "t"], dir)
      writeFileSync(join(dir, "a.ts"), "x\n")
      await runGit(["add", "-A"], dir)
      await runGit(["commit", "-qm", "init"], dir)
      const result = await readPorcelainStatus(dir)
      expect(result.ok).toBe(true)
      if (result.ok) expect(result.entries).toEqual([])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it("scopes to a pathspec when one is given", async () => {
    const dir = await repoWithUnstagedLockfile()
    try {
      writeFileSync(join(dir, "other.ts"), "x\n")
      const scoped = await readPorcelainStatus(dir, { pathspec: ["bun.lock"] })
      expect(scoped.ok).toBe(true)
      if (scoped.ok) expect(scoped.entries.map((e) => e.path)).toEqual(["bun.lock"])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it("fails with git's stderr when the read itself fails", async () => {
    const dir = mkdtempSync(join(tmpdir(), "porcelain-nonrepo-"))
    try {
      const result = await readPorcelainStatus(dir)
      expect(result.ok).toBe(false)
      if (!result.ok) expect(result.error.length).toBeGreaterThan(0)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
