import { judgingBy } from "akasha/check/code/pages/domain-is-a-part-of-a-domain/domain-is-a-part-of-a-domain.check-code.decision.code.ts"
import {
  judgedOver,
  UNDER_DOMAIN,
} from "akasha/check/code/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.check-code.check.code.ts"
import { input } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  return judgedOver(change, shadow, judgingBy)
}

export const domainIsAPartOfADomain = input(UNDER_DOMAIN, refusalsIn)
