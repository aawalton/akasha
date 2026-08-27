import { describe, expect, test } from "bun:test"
import { decideTargetGuard, isLocalhostTarget, type WorktreeGitFacts } from "./target-guard"

const CLEAN: WorktreeGitFacts = { available: true, branch: "main", unlandedCommitCount: 0 }
const UNLANDED: WorktreeGitFacts = {
  available: true,
  branch: "project-14648",
  unlandedCommitCount: 3,
}
const UNAVAILABLE: WorktreeGitFacts = { available: false, branch: null, unlandedCommitCount: 0 }

describe("isLocalhostTarget", () => {
  test("recognizes loopback forms", () => {
    for (const u of [
      "http://localhost:3048",
      "http://localhost:3048/personas",
      "http://127.0.0.1:3000",
      "http://0.0.0.0:8080",
      "http://[::1]:3048",
      "http://app.localhost:3048",
    ]) {
      expect(isLocalhostTarget(u)).toBe(true)
    }
  })

  test("treats deployed domains as remote", () => {
    for (const u of [
      "https://alanwalton.com",
      "https://tempereso.com",
      "https://atlas.alanwalton.com",
    ]) {
      expect(isLocalhostTarget(u)).toBe(false)
    }
  })

  test("an unparseable URL is treated as remote (err toward warning)", () => {
    expect(isLocalhostTarget("not a url")).toBe(false)
  })
})

describe("decideTargetGuard", () => {
  test("deployed target + un-landed branch commits → WARNING", () => {
    const d = decideTargetGuard({ targetUrl: "https://alanwalton.com", git: UNLANDED })
    expect(d.warned).toBe(true)
    expect(d.lines).toHaveLength(2)
    expect(d.lines[0]).toContain("https://alanwalton.com")
    expect(d.lines[0]).toContain("(DEPLOYED)")
    expect(d.lines[1]).toContain("WARNING")
    expect(d.lines[1]).toContain("3 commits not on origin/main")
    expect(d.lines[1]).toContain("project-14648")
    expect(d.lines[1]).toContain("NOT under test")
  })

  test("deployed target + clean (fully-merged) worktree → no warning", () => {
    const d = decideTargetGuard({ targetUrl: "https://alanwalton.com", git: CLEAN })
    expect(d.warned).toBe(false)
    expect(d.lines).toHaveLength(1)
    expect(d.lines[0]).toContain("(DEPLOYED)")
  })

  test("localhost target + un-landed branch commits → no warning (branch IS what the dev server serves)", () => {
    const d = decideTargetGuard({ targetUrl: "http://localhost:3048", git: UNLANDED })
    expect(d.warned).toBe(false)
    expect(d.lines).toHaveLength(1)
    expect(d.lines[0]).toContain("(dev server)")
  })

  test("deployed target + git facts unavailable → no false warning", () => {
    const d = decideTargetGuard({ targetUrl: "https://alanwalton.com", git: UNAVAILABLE })
    expect(d.warned).toBe(false)
    expect(d.lines).toHaveLength(1)
  })

  test("singular commit phrasing", () => {
    const d = decideTargetGuard({
      targetUrl: "https://alanwalton.com",
      git: { available: true, branch: "project-1", unlandedCommitCount: 1 },
    })
    expect(d.lines[1]).toContain("1 commit not on origin/main")
    expect(d.lines[1]).not.toContain("1 commits")
  })

  test("missing branch name still warns, without the label", () => {
    const d = decideTargetGuard({
      targetUrl: "https://alanwalton.com",
      git: { available: true, branch: null, unlandedCommitCount: 2 },
    })
    expect(d.warned).toBe(true)
    expect(d.lines[1]).toContain("2 commits not on origin/main")
  })
})
