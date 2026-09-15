import { linesOf, windowOf } from "akasha/check/modules/measuring/check-measuring.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { runWindow } from "akasha/command/argument/pages/run-window.argument.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { measureCall as page } from "akasha/command/pages/measure/call/measure-call.command.ts"
import {
  besideIn,
  costsOf,
} from "akasha/command/pages/measure/modules/gathering/measure-gathering.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

const SEAT = "seat"

const PHASE = "bash"

const CALL = "call"

const WIDEST = 60

const ELLIPSIS = "..."

export function shortened(ran: string): string {
  return ran.length <= WIDEST ? ran : `${ran.slice(0, WIDEST - ELLIPSIS.length)}${ELLIPSIS}`
}

export function measureCall(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [runWindow])
  if ("refused" in read) return mistaking(read.refused)
  const chose = windowOf(read.taken.runWindow)
  if (chose.chosen === null) return mistaking(chose.refusals)
  const gathered = besideIn(
    given.root,
    valuesOfType(given.root, SEAT).map((one) => one.path)
  )
  const held = {
    ...gathered,
    runs: gathered.runs.map((one) => ({ ...one, ran: shortened(one.ran) })),
  }
  const costs = costsOf(held, Date.now(), chose.chosen, (one) => one.phase === PHASE)
  return told([...linesOf(costs, CALL)])
}
