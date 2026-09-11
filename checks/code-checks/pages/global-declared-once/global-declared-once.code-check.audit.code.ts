import {
  clashesIn,
  judgedOf,
} from "akasha/checks/code-checks/pages/global-declared-once/global-declared-once.code-check.decision.code.ts"
import {
  everythingIn,
  textIn,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { compiled } from "akasha/code/typing/code-typing.module.code.ts"

export function globalDeclaredOnce(root: string): readonly Judged[] {
  const change = everythingIn(root)
  const paths = change.changed.filter((one) => compiled(one))
  return judgedOf(clashesIn(paths, (path) => textIn(change, path)))
}
