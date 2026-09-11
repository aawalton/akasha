import {
  placesIn,
  refusedIn,
} from "akasha/checks/code-checks/pages/identifier-matches-its-place/identifier-matches-its-place.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function identifierMatchesItsPlace(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const places = placesIn(root, shadow.index, shadow.codeAt)
  return overEveryText(root, (path, text) => refusedIn(path, text, places))
}
