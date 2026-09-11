import {
  ADDRESS,
  keyingIn,
  reasonsIn,
} from "akasha/checks/code-checks/pages/email-address-is-well-formed/email-address-is-well-formed.code-check.decision.code.ts"
import { carriedBy } from "akasha/checks/code-checks/pages/relation-resolves/relation-resolves.code-check.decision.code.ts"
import { input, PAGES } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  if (carried.length === 0) return []
  const under = shadow.index.kindsUnder(ADDRESS)
  const keying = keyingIn(under, shadow)
  const said: Judged[] = []
  for (const one of carried) said.push(...reasonsIn(one.path, one.value, keying))
  return said
}

export const emailAddressIsWellFormed = input(PAGES, refusalsIn)
