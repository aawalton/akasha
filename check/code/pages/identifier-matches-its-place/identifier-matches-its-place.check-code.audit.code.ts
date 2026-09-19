import { refusedIn } from "akasha/check/code/pages/identifier-matches-its-place/identifier-matches-its-place.check-code.decision.code.ts"
import { placesIn } from "akasha/check/code/pages/identifier-matches-its-place/modules/place-reading/place-reading.module.code.ts"
import { overEveryText } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function identifierMatchesItsPlace(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const places = placesIn(root, shadow.index, shadow.codeAt)
  return overEveryText(root, (path, text) => refusedIn(path, text, places))
}
