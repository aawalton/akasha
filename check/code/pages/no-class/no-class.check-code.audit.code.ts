import {
  found,
  librariesIn,
} from "akasha/check/code/pages/no-class/no-class.check-code.decision.code.ts"
import { overEveryText } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function noClass(root: string): readonly Judged[] {
  const under = librariesIn(shadowAt(root))
  return overEveryText(root, (path, text) => found(under, path, text))
}
