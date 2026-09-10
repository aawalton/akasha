import { compiled } from "akasha/code-system/code-typing/code-typing.module.code.ts"
import { everythingIn, textIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { clashesIn, judgedOf } from "./global-declared-once.code-check.decision.code.ts"

export function globalDeclaredOnce(root: string): readonly Judged[] {
  const change = everythingIn(root)
  const paths = change.changed.filter((one) => compiled(one))
  return judgedOf(clashesIn(paths, (path) => textIn(change, path)))
}
