import { refusalsOver } from "akasha/check/code/pages/page-named-as-stated/page-named-as-stated.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function pageNamedAsStated(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root), shadowAt(root))
}
