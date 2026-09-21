import {
  refusalsOver,
  viewsIn,
} from "akasha/check/code/pages/view-names-a-declared-key/view-names-a-declared-key.check-code.decision.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function viewNamesADeclaredKey(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return refusalsOver(viewsIn(shadow), shadow)
}
