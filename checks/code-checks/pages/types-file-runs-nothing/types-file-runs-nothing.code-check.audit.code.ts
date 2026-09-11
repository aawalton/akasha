import { refusedIn } from "akasha/checks/code-checks/pages/types-file-runs-nothing/types-file-runs-nothing.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function typesFileRunsNothing(root: string): readonly Judged[] {
  return overEveryText(root, refusedIn)
}
