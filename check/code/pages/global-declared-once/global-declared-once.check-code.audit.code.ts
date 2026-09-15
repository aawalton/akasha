import {
  clashesIn,
  judgedOf,
} from "akasha/check/code/pages/global-declared-once/global-declared-once.check-code.decision.code.ts"
import {
  everythingIn,
  textIn,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { compiled } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"

export function globalDeclaredOnce(root: string): readonly Judged[] {
  const change = everythingIn(root)
  const paths = change.changed.filter((one) => compiled(one))
  return judgedOf(clashesIn(paths, (path) => textIn(change, path)))
}
