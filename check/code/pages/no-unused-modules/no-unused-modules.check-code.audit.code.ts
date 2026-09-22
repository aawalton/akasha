import { refusalsIn } from "akasha/check/code/pages/no-unused-modules/no-unused-modules.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noUnusedModules(root: string, now: number = Date.now()): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsIn(
    {
      root: commit.root,
      taken: commit.paths,
      listed: commit.paths,
      paged: commit,
      read: commit.read,
      holds: (path) => commit.read(path) !== null,
    },
    now
  )
}
