import {
  refusalsOf,
  statedBy,
} from "akasha/check/code/pages/identifier-names-one-page/identifier-names-one-page.check-code.decision.code.ts"
import { carriedBy } from "akasha/check/code/pages/relation-resolves/relation-resolves.check-code.decision.code.ts"
import { input, PAGES } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { identifyingFrom } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  if (carried.length === 0) return []
  const stated = statedBy(carried, identifyingFrom(shadow.index.sourceIn()))
  return refusalsOf(stated, shadow.index.listedNamed)
}

export const identifierNamesOnePage = input(PAGES, refusalsIn)
