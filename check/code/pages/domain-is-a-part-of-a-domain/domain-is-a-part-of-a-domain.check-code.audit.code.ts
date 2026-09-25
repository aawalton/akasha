import { judgingBy } from "akasha/check/code/pages/domain-is-a-part-of-a-domain/domain-is-a-part-of-a-domain.check-code.decision.code.ts"
import { auditedOver } from "akasha/check/code/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.check-code.audit.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function domainIsAPartOfADomain(root: string): readonly Judged[] {
  return auditedOver(root, judgingBy)
}
