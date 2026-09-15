import { judgedIn } from "akasha/check/code/pages/no-tmp/no-tmp.check-code.decision.code.ts"
import { overEveryText } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function noTmp(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return overEveryText(root, (path, text) => judgedIn(path, text, shadow))
}
