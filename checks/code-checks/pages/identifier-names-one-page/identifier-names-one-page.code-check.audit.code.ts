import {
  refusalsOf,
  statedBy,
} from "akasha/checks/code-checks/pages/identifier-names-one-page/identifier-names-one-page.code-check.decision.code.ts"
import { carriedBy } from "akasha/checks/code-checks/pages/relation-resolves/relation-resolves.code-check.decision.code.ts"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"
import { identifyingFrom } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"

export function identifierNamesOnePage(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const carried = carriedBy(everythingIn(root), shadow.index.pageTypesIn())
  const stated = statedBy(carried, identifyingFrom(shadow.index.sourceIn()))
  return refusalsOf(stated, shadow.index.listedNamed)
}
