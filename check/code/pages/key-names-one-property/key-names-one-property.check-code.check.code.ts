import {
  judgedIn,
  refusalsOver,
  underEach,
} from "akasha/check/code/pages/key-names-one-property/key-names-one-property.check-code.decision.code.ts"
import { carriedBy } from "akasha/check/code/pages/relation-resolves/relation-resolves.check-code.decision.code.ts"
import { input, PAGES } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  if (carried.length === 0) return []
  return refusalsOver(underEach(judgedIn(carried, shadow), shadow), shadow)
}

export const keyNamesOneProperty = input(PAGES, refusalsIn)
