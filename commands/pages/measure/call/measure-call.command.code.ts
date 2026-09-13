import { linesOf, windowOf } from "akasha/checks/modules/measuring/check-measuring.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/taking/argument-taking.module.code.ts"
import { runWindow } from "akasha/commands/arguments/pages/run-window.argument.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { measureCall as page } from "akasha/commands/pages/measure/call/measure-call.command.ts"
import {
  besideIn,
  costsOf,
} from "akasha/commands/pages/measure/modules/gathering/measure-gathering.module.code.ts"
import { valuesOfType } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"

const SEAT = "seat"

const PHASE = "bash"

const CALL = "call"

export function measureCall(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [runWindow])
  if ("refused" in read) return mistaking(read.refused)
  const chose = windowOf(read.taken.runWindow)
  if (chose.chosen === null) return mistaking(chose.refusals)
  const gathered = besideIn(
    given.root,
    valuesOfType(given.root, SEAT).map((one) => one.path)
  )
  const costs = costsOf(gathered, Date.now(), chose.chosen, (one) => one.phase === PHASE)
  return told([...linesOf(costs, CALL)])
}
