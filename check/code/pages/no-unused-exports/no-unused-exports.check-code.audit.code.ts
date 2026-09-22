import { sparingLately } from "akasha/check/code/pages/no-unused-exports/modules/recent-landing/recent-landing.module.code.ts"
import { refusalsIn } from "akasha/check/code/pages/no-unused-exports/no-unused-exports.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noUnusedExports(root: string, now: number = Date.now()): readonly Judged[] {
  const commit = commitIn(root)
  return sparingLately(root, refusalsIn(commit.paths, commit.index, commit.read), now)
}
