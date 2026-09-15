import { refusedIn } from "akasha/check/code/pages/types-file-runs-nothing/types-file-runs-nothing.check-code.decision.code.ts"
import { overEveryText } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function typesFileRunsNothing(root: string): readonly Judged[] {
  return overEveryText(root, refusedIn)
}
