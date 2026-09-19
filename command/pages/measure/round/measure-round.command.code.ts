import { auditPageAt } from "akasha/check/modules/audit-recording/audit-recording.module.code.ts"
import { linesOf, windowOf } from "akasha/check/modules/measuring/check-measuring.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { runWindow } from "akasha/command/argument/pages/run-window.argument.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  besideIn,
  costsOf,
} from "akasha/command/pages/measure/modules/gathering/measure-gathering.module.code.ts"
import { measureRound as page } from "akasha/command/pages/measure/round/measure-round.command.ts"

const ROUND = "round"

export function measureRound(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [runWindow])
  if ("refused" in read) return mistaking(read.refused)
  const chose = windowOf(read.taken.runWindow)
  if (chose.chosen === null) return mistaking(chose.refusals)
  const at = auditPageAt(given.root)
  const gathered = besideIn(given.root, at === null ? [] : [at])
  const costs = costsOf(gathered, Date.now(), chose.chosen, (one) => one.phase === ROUND)
  return told([...linesOf(costs, ROUND)])
}
