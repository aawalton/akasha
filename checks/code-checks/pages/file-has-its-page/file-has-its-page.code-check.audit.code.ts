import {
  claimingIn,
  unclaimedAt,
} from "akasha/checks/code-checks/pages/file-has-its-page/file-has-its-page.code-check.decision.code.ts"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function fileHasItsPage(root: string): readonly Judged[] {
  const claimed = claimingIn(shadowAt(root))
  const said: Judged[] = []
  for (const path of everythingIn(root).changed) {
    for (const reason of unclaimedAt(path, claimed)) said.push({ path, reason })
  }
  return said
}
