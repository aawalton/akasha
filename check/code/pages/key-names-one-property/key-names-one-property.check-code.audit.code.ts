import {
  everyDeclarer,
  refusalsOver,
} from "akasha/check/code/pages/key-names-one-property/key-names-one-property.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function keyNamesOneProperty(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsOver(everyDeclarer(commit), commit)
}
