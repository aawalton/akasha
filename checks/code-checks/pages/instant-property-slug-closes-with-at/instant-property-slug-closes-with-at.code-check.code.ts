import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import type { Body } from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  input,
  overEachFile,
  overEachText,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  INSTANT_PROPERTY,
  reasonsAt,
} from "./instant-property-slug-closes-with-at.code-check.decision.code.ts"

export function reasonsIn(under: ReadonlySet<string>): (given: Body) => readonly string[] {
  return overEachText((path, text) => reasonsAt(path, text, under))
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const under = shadow.index.kindsUnder(INSTANT_PROPERTY)
  return overEachFile(change, reasonsIn(under))
}

export const instantPropertySlugClosesWithAt = input(TEXTS, refusalsIn)
