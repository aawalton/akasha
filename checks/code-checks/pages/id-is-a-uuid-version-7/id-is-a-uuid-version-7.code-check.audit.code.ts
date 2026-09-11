import { foundIn } from "akasha/checks/code-checks/pages/id-is-a-uuid-version-7/id-is-a-uuid-version-7.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function idIsAUuidVersion7(root: string): readonly Judged[] {
  return overEveryText(root, foundIn)
}
