import { linesOf, windowIn } from "akasha/checks/modules/measuring/check-measuring.module.code.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import {
  CHANGE,
  costsIn,
} from "akasha/commands/pages/measure/change/change-measuring/change-measuring.module.code.ts"

export function measureChange(argv: readonly string[], given: Given): Answer {
  const chose = windowIn(argv)
  if (chose.chosen === null) return mistaking(chose.refusals)
  const costs = costsIn(given.root, Date.now(), chose.chosen)
  return told([...linesOf(costs, CHANGE)])
}
