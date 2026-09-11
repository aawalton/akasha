import {
  INSTANT_PROPERTY,
  reasonsAt,
} from "akasha/checks/code-checks/pages/instant-property-slug-closes-with-at/instant-property-slug-closes-with-at.code-check.decision.code.ts"
import type { Body } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import {
  input,
  overEachFile,
  overEachText,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

export function reasonsIn(under: ReadonlySet<string>): (given: Body) => readonly string[] {
  return overEachText((path, text) => reasonsAt(path, text, under))
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const under = shadow.index.kindsUnder(INSTANT_PROPERTY)
  return overEachFile(change, reasonsIn(under))
}

export const instantPropertySlugClosesWithAt = input(TEXTS, refusalsIn)
