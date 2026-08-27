import { describe, expect, it } from "bun:test"
import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { runCmd } from "./git"

async function waitGone(pid: number, budgetMs: number): Promise<boolean> {
  const deadline = Date.now() + budgetMs
  for (;;) {
    try {
      process.kill(pid, 0)
    } catch {
      return true
    }
    if (Date.now() >= deadline) return false
    await Bun.sleep(25)
  }
}

function killBestEffort(pid: number): undefined {
  try {
    process.kill(pid, "SIGKILL")
  } catch {}
}

describe("runCmd timeout — process-group reaping", () => {
  it("reaps the whole process group, not just the direct child, on timeout", async () => {
    const dir = mkdtempSync(join(tmpdir(), "git-timeout-test-"))
    const pidFile = join(dir, "child.pid")
    let grandchildPid: number | undefined
    try {
      const result = await runCmd(
        ["sh", "-c", `sleep 30 & echo $! > '${pidFile}'; sleep 30`],
        dir,
        { timeoutMs: 400 }
      )

      expect(result.ok).toBe(false)
      expect(result.exitCode).toBe(-1)
      expect(result.stderr).toContain("timed out after 400ms")

      grandchildPid = Number.parseInt(readFileSync(pidFile, "utf8").trim(), 10)
      expect(grandchildPid).toBeGreaterThan(0)

      const gone = await waitGone(grandchildPid, 3_000)
      expect(gone).toBe(true)
    } finally {
      if (grandchildPid !== undefined && Number.isFinite(grandchildPid)) {
        killBestEffort(grandchildPid)
      }
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it("reaps the whole process group on normal (non-timeout) completion", async () => {
    const dir = mkdtempSync(join(tmpdir(), "git-normal-test-"))
    const pidFile = join(dir, "child.pid")
    let grandchildPid: number | undefined
    try {
      const result = await runCmd(
        ["sh", "-c", `sleep 30 </dev/null >/dev/null 2>&1 & echo $! > '${pidFile}'; exit 0`],
        dir,
        { timeoutMs: 5_000 }
      )

      expect(result.ok).toBe(true)
      expect(result.exitCode).toBe(0)

      grandchildPid = Number.parseInt(readFileSync(pidFile, "utf8").trim(), 10)
      expect(grandchildPid).toBeGreaterThan(0)

      const gone = await waitGone(grandchildPid, 3_000)
      expect(gone).toBe(true)
    } finally {
      if (grandchildPid !== undefined && Number.isFinite(grandchildPid)) {
        killBestEffort(grandchildPid)
      }
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it("reaps the whole process group when no timeout is set", async () => {
    const dir = mkdtempSync(join(tmpdir(), "git-notimeout-test-"))
    const pidFile = join(dir, "child.pid")
    let grandchildPid: number | undefined
    try {
      const result = await runCmd(
        ["sh", "-c", `sleep 30 </dev/null >/dev/null 2>&1 & echo $! > '${pidFile}'; exit 0`],
        dir
      )

      expect(result.ok).toBe(true)
      expect(result.exitCode).toBe(0)

      grandchildPid = Number.parseInt(readFileSync(pidFile, "utf8").trim(), 10)
      expect(grandchildPid).toBeGreaterThan(0)

      const gone = await waitGone(grandchildPid, 3_000)
      expect(gone).toBe(true)
    } finally {
      if (grandchildPid !== undefined && Number.isFinite(grandchildPid)) {
        killBestEffort(grandchildPid)
      }
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
