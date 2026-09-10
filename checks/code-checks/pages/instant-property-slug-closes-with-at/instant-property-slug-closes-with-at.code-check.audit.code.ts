import { shadowAt } from "@akasha/pages/shadow"
import {
  bodyOf,
  everythingIn,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  INSTANT_PROPERTY,
  reasonsAt,
} from "./instant-property-slug-closes-with-at.code-check.decision.code.ts"

export function instantPropertySlugClosesWithAt(root: string): readonly Judged[] {
  const under = shadowAt(root).index.kindsUnder(INSTANT_PROPERTY)
  const change = everythingIn(root)
  const said: Judged[] = []
  for (const path of change.changed) {
    if (!textNamed(path)) continue
    const bytes = change.after(path)
    if (bytes === null) continue
    for (const reason of reasonsAt(path, bodyOf({ root, path, bytes }), under)) {
      said.push({ path, reason })
    }
  }
  return said
}
