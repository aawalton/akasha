import {
  foundIn,
  runsFromText,
} from "akasha/check/code/pages/calculation-imports-only-types/calculation-imports-only-types.check-code.decision.code.ts"
import { overEveryNamed } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function calculationImportsOnlyTypes(root: string): readonly Judged[] {
  return overEveryNamed(root, runsFromText, foundIn)
}
