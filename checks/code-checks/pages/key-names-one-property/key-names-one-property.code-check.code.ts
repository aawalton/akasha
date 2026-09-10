import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import { input, PAGES } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { carriedBy } from "../relation-resolves/relation-resolves.code-check.decision.code.ts"
import {
  judgedIn,
  refusalsOver,
  underEach,
} from "./key-names-one-property.code-check.decision.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  if (carried.length === 0) return []
  return refusalsOver(underEach(judgedIn(carried, shadow), shadow), shadow)
}

export const keyNamesOneProperty = input(PAGES, refusalsIn)
