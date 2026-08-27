import { execFileSync } from "node:child_process"
import type { WorktreeGitFacts } from "./target-guard"

export function readWorktreeGitFacts(cwd: string = process.cwd()): WorktreeGitFacts {
  const run = (args: readonly string[]): string | null => {
    try {
      return execFileSync("git", args, {
        cwd,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
        timeout: 5_000,
      }).trim()
    } catch {
      return null
    }
  }

  if (run(["rev-parse", "--verify", "origin/main"]) === null) {
    return { available: false, branch: null, unlandedCommitCount: 0 }
  }

  const countRaw = run(["rev-list", "--count", "origin/main..HEAD"])
  if (countRaw === null) return { available: false, branch: null, unlandedCommitCount: 0 }
  const unlandedCommitCount = Number.parseInt(countRaw, 10)
  if (!Number.isFinite(unlandedCommitCount) || unlandedCommitCount < 0) {
    return { available: false, branch: null, unlandedCommitCount: 0 }
  }

  const branchRaw = run(["rev-parse", "--abbrev-ref", "HEAD"])
  const branch = branchRaw === null || branchRaw === "HEAD" ? null : branchRaw

  return { available: true, branch, unlandedCommitCount }
}
