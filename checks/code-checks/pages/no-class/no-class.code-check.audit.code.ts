import {
  found,
  librariesIn,
} from "akasha/checks/code-checks/pages/no-class/no-class.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function noClass(root: string): readonly Judged[] {
  const under = librariesIn(shadowAt(root))
  return overEveryText(root, (path, text) => found(under, path, text))
}
