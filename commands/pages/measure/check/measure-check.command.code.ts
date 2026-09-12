import {
  costsIn,
  linesOf,
  windowIn,
} from "akasha/checks/modules/measuring/check-measuring.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

export function measureChecks(argv: readonly string[], given: Given): Answer {
  const chose = windowIn(argv)
  if (chose.chosen === null) return { report: [], refusals: [...chose.refusals], code: 2 }
  const costs = costsIn(given.root, Date.now(), chose.chosen, "check")
  return { report: [...linesOf(costs)], refusals: [], code: 0 }
}
