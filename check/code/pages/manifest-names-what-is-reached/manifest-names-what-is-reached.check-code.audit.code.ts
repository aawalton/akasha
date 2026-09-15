import { refusalsOver } from "akasha/check/code/pages/manifest-names-what-is-reached/manifest-names-what-is-reached.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function manifestNamesWhatIsReached(root: string): readonly Judged[] {
  const change = everythingIn(root)
  return refusalsOver(change, shadowAt(root), change.changed, () => change.changed)
}
