import { shadowAt } from "@akasha/pages/shadow"
import { overEveryText } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { judgedIn } from "./no-tmp.code-check.decision.code.ts"

export function noTmp(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return overEveryText(root, (path, text) => judgedIn(path, text, shadow))
}
