import { shadowAt } from "@akasha/pages/shadow"
import { overEveryText } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { found, librariesIn } from "./no-class.code-check.decision.code.ts"

export function noClass(root: string): readonly Judged[] {
  const under = librariesIn(shadowAt(root))
  return overEveryText(root, (path, text) => found(under, path, text))
}
