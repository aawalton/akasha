import {
  moduleAt,
  reasonsIn,
} from "akasha/check/code/pages/no-global-in-a-module/no-global-in-a-module.check-code.decision.code.ts"
import {
  commitIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noGlobalInAModule(root: string): readonly Judged[] {
  return overEachText(commitIn(root), (path, text) => (moduleAt(path) ? reasonsIn(path, text) : []))
}
