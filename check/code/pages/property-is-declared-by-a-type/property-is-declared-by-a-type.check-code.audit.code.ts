import { refusalsIn } from "akasha/check/code/pages/property-is-declared-by-a-type/property-is-declared-by-a-type.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function propertyIsDeclaredByAType(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsIn(commit.paths, commit.read, (path) => commit.read(path) !== null, commit)
}
