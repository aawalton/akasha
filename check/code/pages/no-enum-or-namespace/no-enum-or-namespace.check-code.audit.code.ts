import { foundIn } from "akasha/check/code/pages/no-enum-or-namespace/no-enum-or-namespace.check-code.decision.code.ts"
import {
  commitIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noEnumOrNamespace(root: string): readonly Judged[] {
  return overEachText(commitIn(root), foundIn)
}
