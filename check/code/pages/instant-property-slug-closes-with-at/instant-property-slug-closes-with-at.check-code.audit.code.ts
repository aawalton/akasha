import {
  INSTANT_PROPERTY,
  reasonsAt,
} from "akasha/check/code/pages/instant-property-slug-closes-with-at/instant-property-slug-closes-with-at.check-code.decision.code.ts"
import { overEveryText } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function instantPropertySlugClosesWithAt(root: string): readonly Judged[] {
  const under = shadowAt(root).index.kindsUnder(INSTANT_PROPERTY)
  return overEveryText(root, (path, text) => reasonsAt(path, text, under))
}
