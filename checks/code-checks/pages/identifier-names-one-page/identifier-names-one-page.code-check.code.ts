import type { Change } from "@akasha/pages/change"
import { identifyingFrom } from "@akasha/pages/page-type-properties"
import type { Shadow } from "@akasha/pages/shadow"
import { input, PAGES } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { carriedBy } from "../relation-resolves/relation-resolves.code-check.decision.code.ts"
import { refusalsOf, statedBy } from "./identifier-names-one-page.code-check.decision.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  if (carried.length === 0) return []
  const stated = statedBy(carried, identifyingFrom(shadow.index.sourceIn()))
  return refusalsOf(stated, shadow.index.listedNamed)
}

export const identifierNamesOnePage = input(PAGES, refusalsIn)
