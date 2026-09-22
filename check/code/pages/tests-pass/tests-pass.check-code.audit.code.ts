import {
  linksOver,
  namedOver,
} from "akasha/check/code/pages/tests-pass/modules/run-naming/run-naming.module.code.ts"
import { refusingOver } from "akasha/check/code/pages/tests-pass/tests-pass.check-code.decision.code.ts"
import {
  type Commit,
  commitIn,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

function thereIn(commit: Commit): (path: string) => boolean {
  const held = new Map<string, boolean>()
  return (path) => {
    const found = held.get(path)
    if (found !== undefined) return found
    const made = commit.read(path) !== null
    held.set(path, made)
    return made
  }
}

export async function testsPass(root: string): Promise<readonly Judged[]> {
  const commit = commitIn(root)
  const named = namedOver(commit.paths, thereIn(commit))
  const bodies = Object.fromEntries(linksOver(commit.paths, commit.read))
  return await refusingOver(commit.root, named, bodies)
}
