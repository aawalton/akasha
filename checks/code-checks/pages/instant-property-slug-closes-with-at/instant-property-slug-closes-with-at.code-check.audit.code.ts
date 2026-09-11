import {
  INSTANT_PROPERTY,
  reasonsAt,
} from "akasha/checks/code-checks/pages/instant-property-slug-closes-with-at/instant-property-slug-closes-with-at.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function instantPropertySlugClosesWithAt(root: string): readonly Judged[] {
  const under = shadowAt(root).index.kindsUnder(INSTANT_PROPERTY)
  return overEveryText(root, (path, text) => reasonsAt(path, text, under))
}
