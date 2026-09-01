import { told } from "@akasha/git/git-running"
import type { WorktreeGitFacts } from "../target-guard/target-guard.module.code.ts"

const CEILING = 5_000

export function readWorktreeGitFacts(cwd: string = process.cwd()): WorktreeGitFacts {
  const run = (args: readonly string[]): string | null =>
    told(cwd, args, { timeout: CEILING })?.trim() ?? null

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
