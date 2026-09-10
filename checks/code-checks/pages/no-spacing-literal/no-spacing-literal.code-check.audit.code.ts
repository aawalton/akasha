import { shadowAt } from "@akasha/pages/shadow"
import { overEveryNamed } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { found, passingIn, swiftNamed } from "./no-spacing-literal.code-check.decision.code.ts"

export function noSpacingLiteral(root: string): readonly Judged[] {
  const passing = passingIn(shadowAt(root))
  return overEveryNamed(root, swiftNamed, (path, text) => found(passing, path, text))
}
