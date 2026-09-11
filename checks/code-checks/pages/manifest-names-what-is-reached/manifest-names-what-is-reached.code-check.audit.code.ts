import { refusalsOver } from "akasha/checks/code-checks/pages/manifest-names-what-is-reached/manifest-names-what-is-reached.code-check.decision.code.ts"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function manifestNamesWhatIsReached(root: string): readonly Judged[] {
  const change = everythingIn(root)
  return refusalsOver(change, shadowAt(root), change.changed)
}
