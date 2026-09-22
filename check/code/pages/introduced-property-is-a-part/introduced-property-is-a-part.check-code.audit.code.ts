import {
  everyType,
  refusalsOver,
  sourceOf,
} from "akasha/check/code/pages/introduced-property-is-a-part/introduced-property-is-a-part.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function introducedPropertyIsAPart(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const types = everyType(commit, [])
  return refusalsOver(types, sourceOf(types, commit.index.sourceIn()))
}
