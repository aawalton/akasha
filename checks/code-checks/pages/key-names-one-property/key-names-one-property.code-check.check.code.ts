import {
  judgedIn,
  refusalsOver,
  underEach,
} from "akasha/checks/code-checks/pages/key-names-one-property/key-names-one-property.code-check.decision.code.ts"
import { carriedBy } from "akasha/checks/code-checks/pages/relation-resolves/relation-resolves.code-check.decision.code.ts"
import { input, PAGES } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  if (carried.length === 0) return []
  return refusalsOver(underEach(judgedIn(carried, shadow), shadow), shadow)
}

export const keyNamesOneProperty = input(PAGES, refusalsIn)
