import { refusalsOver } from "akasha/checks/code-checks/pages/no-import-cycle/no-import-cycle.code-check.decision.code.ts"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function noImportCycle(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root))
}
