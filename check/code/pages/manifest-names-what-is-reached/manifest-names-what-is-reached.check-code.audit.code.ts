import { refusalsOver } from "akasha/check/code/pages/manifest-names-what-is-reached/manifest-names-what-is-reached.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function manifestNamesWhatIsReached(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsOver(commit.read, commit, commit.paths, () => commit.paths)
}
