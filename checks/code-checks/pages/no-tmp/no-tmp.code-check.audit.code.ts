import { judgedIn } from "akasha/checks/code-checks/pages/no-tmp/no-tmp.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function noTmp(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return overEveryText(root, (path, text) => judgedIn(path, text, shadow))
}
