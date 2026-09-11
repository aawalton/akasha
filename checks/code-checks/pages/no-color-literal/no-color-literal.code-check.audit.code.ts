import { foundIn } from "akasha/checks/code-checks/pages/no-color-literal/no-color-literal.code-check.decision.code.ts"
import { overEveryBody } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function noColorLiteral(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return overEveryBody(root, (path, text) => foundIn(shadow, path, text))
}
