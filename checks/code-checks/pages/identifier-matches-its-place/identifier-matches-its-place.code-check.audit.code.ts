import { shadowAt } from "@akasha/pages/shadow"
import {
  bodyOf,
  everythingIn,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { placesIn, refusedIn } from "./identifier-matches-its-place.code-check.decision.code.ts"

export function identifierMatchesItsPlace(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const places = placesIn(root, shadow.index, shadow.codeAt)
  const change = everythingIn(root)
  const said: Judged[] = []
  for (const path of change.changed) {
    if (!textNamed(path)) continue
    const bytes = change.after(path)
    if (bytes === null) continue
    for (const reason of refusedIn(path, bodyOf({ root, path, bytes }), places)) {
      said.push({ path, reason })
    }
  }
  return said
}
