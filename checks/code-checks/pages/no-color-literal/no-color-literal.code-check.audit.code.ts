import { shadowAt } from "@akasha/pages/shadow"
import { overEveryBody } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { foundIn } from "./no-color-literal.code-check.decision.code.ts"

export function noColorLiteral(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return overEveryBody(root, (path, text) => foundIn(shadow, path, text))
}
