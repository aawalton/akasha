import { foundIn } from "akasha/checks/code-checks/pages/no-method-signature/no-method-signature.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function noMethodSignature(root: string): readonly Judged[] {
  return overEveryText(root, foundIn)
}
