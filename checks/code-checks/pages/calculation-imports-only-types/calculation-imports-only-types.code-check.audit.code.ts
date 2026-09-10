import { overEveryNamed } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { foundIn, runsFromText } from "./calculation-imports-only-types.code-check.decision.code.ts"

export function calculationImportsOnlyTypes(root: string): readonly Judged[] {
  return overEveryNamed(root, runsFromText, foundIn)
}
