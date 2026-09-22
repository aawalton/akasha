import {
  INSTANT_PROPERTY,
  reasonsAt,
} from "akasha/check/code/pages/instant-property-slug-closes-with-at/instant-property-slug-closes-with-at.check-code.decision.code.ts"
import {
  commitIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function instantPropertySlugClosesWithAt(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const under = commit.index.kindsUnder(INSTANT_PROPERTY)
  return overEachText(commit, (path, text) => reasonsAt(path, text, under))
}
