import { refusalsOver } from "akasha/checks/code-checks/pages/relation-resolves/relation-resolves.code-check.decision.code.ts"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function relationResolves(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root), shadowAt(root))
}
