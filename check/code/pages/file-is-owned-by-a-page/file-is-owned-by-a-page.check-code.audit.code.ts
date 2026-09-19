import { judgedIn } from "akasha/check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.decision.code.ts"
import {
  everythingIn,
  overEachFile,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function fileIsOwnedByAPage(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return overEachFile(
    everythingIn(root),
    () => true,
    (given) => judgedIn(given, shadow)
  )
}
