import {
  refusalsOf,
  statedBy,
} from "akasha/check/code/pages/identifier-names-one-page/identifier-names-one-page.check-code.decision.code.ts"
import { carriedBy } from "akasha/check/code/pages/relation-resolves/relation-resolves.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { identifyingFrom } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

export function identifierNamesOnePage(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const carried = carriedBy(everythingIn(root), shadow.index.pageTypesIn())
  const stated = statedBy(carried, identifyingFrom(shadow.index.sourceIn()))
  return refusalsOf(stated, shadow.index.listedNamed)
}
