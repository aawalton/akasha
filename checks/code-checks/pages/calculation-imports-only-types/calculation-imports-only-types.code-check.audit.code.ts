import {
  foundIn,
  runsFromText,
} from "akasha/checks/code-checks/pages/calculation-imports-only-types/calculation-imports-only-types.code-check.decision.code.ts"
import { overEveryNamed } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function calculationImportsOnlyTypes(root: string): readonly Judged[] {
  return overEveryNamed(root, runsFromText, foundIn)
}
