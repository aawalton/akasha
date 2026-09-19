import {
  INSTANT_PROPERTY,
  reasonsAt,
} from "akasha/check/code/pages/instant-property-slug-closes-with-at/instant-property-slug-closes-with-at.check-code.decision.code.ts"
import type { Body } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import {
  input,
  overEachFile,
  overEachText,
  TEXTS,
  textNamed,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function reasonsIn(under: ReadonlySet<string>): (given: Body) => readonly string[] {
  return overEachText((path, text) => reasonsAt(path, text, under))
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const under = shadow.index.kindsUnder(INSTANT_PROPERTY)
  return overEachFile(change, textNamed, reasonsIn(under))
}

export const instantPropertySlugClosesWithAt = input(TEXTS, refusalsIn)
