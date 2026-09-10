import { identifyingFrom } from "@akasha/pages/page-type-properties"
import { shadowAt } from "@akasha/pages/shadow"
import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { carriedBy } from "../relation-resolves/relation-resolves.code-check.code.ts"
import { refusalsOf, statedBy } from "./identifier-names-one-page.code-check.decision.code.ts"

export function identifierNamesOnePage(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const carried = carriedBy(everythingIn(root), shadow.index.pageTypesIn())
  const stated = statedBy(carried, identifyingFrom(shadow.index.sourceIn()))
  return refusalsOf(stated, shadow.index.listedNamed)
}
