import { shadowAt } from "@akasha/pages/shadow"
import { overEveryText } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { placesIn, refusedIn } from "./identifier-matches-its-place.code-check.decision.code.ts"

export function identifierMatchesItsPlace(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const places = placesIn(root, shadow.index, shadow.codeAt)
  return overEveryText(root, (path, text) => refusedIn(path, text, places))
}
