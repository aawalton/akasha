import {
  found,
  passingIn,
  swiftNamed,
} from "akasha/checks/code-checks/pages/no-spacing-literal/no-spacing-literal.code-check.decision.code.ts"
import { overEveryNamed } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function noSpacingLiteral(root: string): readonly Judged[] {
  const passing = passingIn(shadowAt(root))
  return overEveryNamed(root, swiftNamed, (path, text) => found(passing, path, text))
}
