import { foundIn } from "akasha/check/code/pages/id-is-a-uuid-version-7/id-is-a-uuid-version-7.check-code.decision.code.ts"
import { overEveryText } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function idIsAUuidVersion7(root: string): readonly Judged[] {
  return overEveryText(root, foundIn)
}
