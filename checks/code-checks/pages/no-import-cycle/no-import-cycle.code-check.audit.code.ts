import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsOver } from "./no-import-cycle.code-check.decision.code.ts"

export function noImportCycle(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root))
}
