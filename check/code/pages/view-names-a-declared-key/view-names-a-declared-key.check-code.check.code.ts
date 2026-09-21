import {
  refusalsOver,
  viewsReachedBy,
} from "akasha/check/code/pages/view-names-a-declared-key/view-names-a-declared-key.check-code.decision.code.ts"
import { input, PAGES } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  return refusalsOver(viewsReachedBy(change, shadow), shadow)
}

export const viewNamesADeclaredKey = input(PAGES, refusalsIn)
