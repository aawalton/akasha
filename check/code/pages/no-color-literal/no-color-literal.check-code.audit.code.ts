import { foundIn } from "akasha/check/code/pages/no-color-literal/no-color-literal.check-code.decision.code.ts"
import { overEveryBody } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function noColorLiteral(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return overEveryBody(root, (path, text) => foundIn(shadow, path, text))
}
