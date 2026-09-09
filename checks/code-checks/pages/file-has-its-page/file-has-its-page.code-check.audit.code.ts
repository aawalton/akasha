import { shadowAt } from "@akasha/pages/shadow"
import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { claimingIn, unclaimedAt } from "./file-has-its-page.code-check.decision.code.ts"

export function fileHasItsPage(root: string): readonly Judged[] {
  const claimed = claimingIn(shadowAt(root))
  const said: Judged[] = []
  for (const path of everythingIn(root).changed) {
    for (const reason of unclaimedAt(path, claimed)) said.push({ path, reason })
  }
  return said
}
