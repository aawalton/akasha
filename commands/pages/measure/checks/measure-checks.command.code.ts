import {
  chosenIn,
  costsIn,
  linesOf,
} from "../../../../checks/modules/measuring/check-measuring.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"

export function measureChecks(argv: readonly string[], given: Given): Answer {
  const chose = chosenIn(argv)
  if (chose.chosen === null) return { report: [], refusals: [...chose.refusals], code: 2 }
  const costs = costsIn(given.root, Date.now(), chose.chosen, chose.group)
  return { report: [...linesOf(costs)], refusals: [], code: 0 }
}
