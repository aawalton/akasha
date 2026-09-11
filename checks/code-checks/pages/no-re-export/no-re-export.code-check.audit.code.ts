import { refusalsIn } from "akasha/checks/code-checks/pages/no-re-export/no-re-export.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function noReExport(root: string): readonly Judged[] {
  return overEveryText(root, refusalsIn)
}
