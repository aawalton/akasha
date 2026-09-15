import { foundIn } from "akasha/check/code/pages/no-method-signature/no-method-signature.check-code.decision.code.ts"
import { overEveryText } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noMethodSignature(root: string): readonly Judged[] {
  return overEveryText(root, foundIn)
}
