import { refusalsIn } from "akasha/check/code/pages/phone-number-is-e164/phone-number-is-e164.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function phoneNumberIsE164(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsIn(commit.paths, commit)
}
