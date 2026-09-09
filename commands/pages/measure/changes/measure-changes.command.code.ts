import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { CHANGE, costsIn } from "../../../modules/change-measuring/change-measuring.module.code.ts"
import { linesOf, windowIn } from "../../../modules/check-measuring/check-measuring.module.code.ts"

export function measureChanges(argv: readonly string[], given: Given): Answer {
  const chose = windowIn(argv)
  if (chose.chosen === null) return { report: [], refusals: [...chose.refusals], code: 2 }
  const costs = costsIn(given.root, Date.now(), chose.chosen)
  return { report: [...linesOf(costs, CHANGE)], refusals: [], code: 0 }
}
