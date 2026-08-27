import { describe, expect, it } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { runGit } from "./git"
import { getCommitTreeSha } from "./tree-sha"

async function initTwoCommitRepo(): Promise<{
  workDir: string
  commitA: string
  commitB: string
  cleanup: () => void
}> {
  const workDir = mkdtempSync(join(tmpdir(), "tree-sha-test-"))
  const cleanup = () => rmSync(workDir, { recursive: true, force: true })
  try {
    await runGit(["init", "-q", "-b", "main"], workDir)
    await runGit(["config", "user.email", "test@example.com"], workDir)
    await runGit(["config", "user.name", "test"], workDir)
    writeFileSync(join(workDir, "a.txt"), "hello\n")
    await runGit(["add", "a.txt"], workDir)
    await runGit(["commit", "-q", "-m", "A"], workDir)
    const a = await runGit(["rev-parse", "HEAD"], workDir)
    writeFileSync(join(workDir, "b.txt"), "world\n")
    await runGit(["add", "b.txt"], workDir)
    await runGit(["commit", "-q", "-m", "B"], workDir)
    const b = await runGit(["rev-parse", "HEAD"], workDir)
    return { workDir, commitA: a.stdout, commitB: b.stdout, cleanup }
  } catch (err) {
    cleanup()
    throw err
  }
}

describe("getCommitTreeSha", () => {
  it("returns a canonical 40-char tree OID for a real commit", async () => {
    const { workDir, commitA, cleanup } = await initTwoCommitRepo()
    try {
      const tree = await getCommitTreeSha(workDir, commitA)
      expect(tree).toMatch(/^[0-9a-f]{40}$/)
    } finally {
      cleanup()
    }
  })

  it("returns identical tree OIDs for two commits whose working trees are byte-identical", async () => {
    const { workDir, commitA, commitB, cleanup } = await initTwoCommitRepo()
    try {
      await runGit(["revert", "--no-edit", commitB], workDir)
      const c = await runGit(["rev-parse", "HEAD"], workDir)
      expect(c.stdout).not.toBe(commitA)
      const treeA = await getCommitTreeSha(workDir, commitA)
      const treeC = await getCommitTreeSha(workDir, c.stdout)
      expect(treeC).toBe(treeA)
    } finally {
      cleanup()
    }
  })

  it("returns different tree OIDs for two commits whose working trees differ", async () => {
    const { workDir, commitA, commitB, cleanup } = await initTwoCommitRepo()
    try {
      const treeA = await getCommitTreeSha(workDir, commitA)
      const treeB = await getCommitTreeSha(workDir, commitB)
      expect(treeB).not.toBe(treeA)
    } finally {
      cleanup()
    }
  })

  it("throws when the commit does not exist in the repo's object store", async () => {
    const { workDir, cleanup } = await initTwoCommitRepo()
    try {
      const bogus = "0123456789abcdef0123456789abcdef01234567"
      await expect(getCommitTreeSha(workDir, bogus)).rejects.toThrow(/rev-parse/)
    } finally {
      cleanup()
    }
  })
})
