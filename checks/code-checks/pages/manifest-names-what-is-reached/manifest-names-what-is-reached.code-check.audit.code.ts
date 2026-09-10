import { shadowAt } from "@akasha/pages/shadow"
import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsOver } from "./manifest-names-what-is-reached.code-check.decision.code.ts"

export function manifestNamesWhatIsReached(root: string): readonly Judged[] {
  const change = everythingIn(root)
  return refusalsOver(change, shadowAt(root), change.changed)
}
