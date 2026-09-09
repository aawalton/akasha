import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import { input, PAGES } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { carriedBy } from "../relation-resolves/relation-resolves.code-check.code.ts"
import {
  ADDRESS,
  keyingIn,
  reasonsIn,
} from "./email-address-is-well-formed.code-check.decision.code.ts"

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
