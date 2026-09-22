import { refusalsFor } from "akasha/check/code/pages/typecheck/typecheck.check-code.decision.code.ts"
import {
  type Commit,
  commitIn,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

function readingOver(commit: Commit): (path: string) => string | null {
  const held = new Map<string, string | null>()
  return (path) => {
    const found = held.get(path)
    if (found !== undefined || held.has(path)) return found ?? null
    const made = commit.read(path)
    held.set(path, made)
    return made
  }
}

export function typecheck(root: string): Promise<readonly Judged[]> {
  const commit = commitIn(root)
  return refusalsFor(commit.root, commit.paths, readingOver(commit), commit.index)
}
