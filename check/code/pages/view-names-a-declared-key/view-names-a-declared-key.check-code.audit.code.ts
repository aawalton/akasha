import {
  refusalsOver,
  viewsIn,
} from "akasha/check/code/pages/view-names-a-declared-key/view-names-a-declared-key.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function viewNamesADeclaredKey(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsOver(viewsIn(commit), commit)
}
