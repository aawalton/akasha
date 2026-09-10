import { shadowAt } from "@akasha/pages/shadow"
import { overEveryText } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  INSTANT_PROPERTY,
  reasonsAt,
} from "./instant-property-slug-closes-with-at.code-check.decision.code.ts"

export function instantPropertySlugClosesWithAt(root: string): readonly Judged[] {
  const under = shadowAt(root).index.kindsUnder(INSTANT_PROPERTY)
  return overEveryText(root, (path, text) => reasonsAt(path, text, under))
}
