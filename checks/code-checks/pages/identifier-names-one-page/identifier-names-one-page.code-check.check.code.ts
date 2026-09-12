import {
  refusalsOf,
  statedBy,
} from "akasha/checks/code-checks/pages/identifier-names-one-page/identifier-names-one-page.code-check.decision.code.ts"
import { carriedBy } from "akasha/checks/code-checks/pages/relation-resolves/relation-resolves.code-check.decision.code.ts"
import { input, PAGES } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { identifyingFrom } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  if (carried.length === 0) return []
  const stated = statedBy(carried, identifyingFrom(shadow.index.sourceIn()))
  return refusalsOf(stated, shadow.index.listedNamed)
}

export const identifierNamesOnePage = input(PAGES, refusalsIn)
