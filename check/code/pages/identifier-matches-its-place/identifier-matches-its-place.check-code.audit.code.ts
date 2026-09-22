import { refusedIn } from "akasha/check/code/pages/identifier-matches-its-place/identifier-matches-its-place.check-code.decision.code.ts"
import { placesIn } from "akasha/check/code/pages/identifier-matches-its-place/modules/place-reading/place-reading.module.code.ts"
import {
  commitIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function identifierMatchesItsPlace(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const places = placesIn(root, commit.index)
  return overEachText(commit, (path, text) => refusedIn(path, text, places))
}
