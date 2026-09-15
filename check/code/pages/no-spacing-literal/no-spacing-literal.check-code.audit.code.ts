import {
  found,
  passingIn,
  swiftNamed,
} from "akasha/check/code/pages/no-spacing-literal/no-spacing-literal.check-code.decision.code.ts"
import { overEveryNamed } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function noSpacingLiteral(root: string): readonly Judged[] {
  const passing = passingIn(shadowAt(root))
  return overEveryNamed(root, swiftNamed, (path, text) => found(passing, path, text))
}
