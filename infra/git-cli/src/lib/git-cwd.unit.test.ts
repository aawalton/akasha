import { describe, expect, it } from "bun:test"
import { existsSync, mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { runCmd, runGit } from "./git"

describe("runCmd / runGit — missing cwd fails loud, not misleading", () => {
  it("returns ok=false with a 'cwd missing' diagnostic instead of throwing", async () => {
    const missing = join(tmpdir(), "git-cwd-missing-should-not-exist-15004")
    rmSync(missing, { recursive: true, force: true })
    expect(existsSync(missing)).toBe(false)

    const result = await runCmd(["echo", "hi"], missing)

    expect(result.ok).toBe(false)
    expect(result.exitCode).toBe(-1)
    expect(result.stderr).toContain(`cwd missing: ${missing}`)
    expect(result.stdout).toBe("")
  })

  it("runGit surfaces the same diagnostic for a missing cwd", async () => {
    const missing = join(tmpdir(), "git-cwd-missing-runGit-15004")
    rmSync(missing, { recursive: true, force: true })
    expect(existsSync(missing)).toBe(false)

    const result = await runGit(["status"], missing)

    expect(result.ok).toBe(false)
    expect(result.exitCode).toBe(-1)
    expect(result.stderr).toContain(`cwd missing: ${missing}`)
  })

  it("leaves normal behavior unchanged for a valid cwd", async () => {
    const dir = mkdtempSync(join(tmpdir(), "git-cwd-valid-15004-"))
    try {
      const result = await runCmd(["echo", "hi"], dir)
      expect(result.ok).toBe(true)
      expect(result.exitCode).toBe(0)
      expect(result.stdout).toBe("hi")
      expect(result.stderr).toBe("")
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
