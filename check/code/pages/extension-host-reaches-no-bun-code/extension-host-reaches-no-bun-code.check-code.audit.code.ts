import {
  manifestIn,
  refusalsOver,
} from "akasha/check/code/pages/extension-host-reaches-no-bun-code/extension-host-reaches-no-bun-code.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function extensionHostReachesNoBunCode(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return refusalsOver(everythingIn(root), shadow, manifestIn(shadow.index))
}
