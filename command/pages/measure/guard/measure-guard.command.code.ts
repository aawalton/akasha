import { eventsIn, hooksIn } from "akasha/agent/hook/modules/dispatch/hook-dispatch.module.code.ts"
import { linesOf, windowOf } from "akasha/check/modules/measuring/check-measuring.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { runWindow } from "akasha/command/argument/pages/run-window.argument.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { measureGuard as page } from "akasha/command/pages/measure/guard/measure-guard.command.ts"
import {
  besideIn,
  costsOf,
} from "akasha/command/pages/measure/modules/gathering/measure-gathering.module.code.ts"

const GUARD = "guard"

export function measureGuard(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [runWindow])
  if ("refused" in read) return mistaking(read.refused)
  const chose = windowOf(read.taken.runWindow)
  if (chose.chosen === null) return mistaking(chose.refusals)
  const listed = hooksIn(given.root)
  const events = new Set(eventsIn(listed))
  const gathered = besideIn(
    given.root,
    listed.map((one) => one.path)
  )
  const costs = costsOf(gathered, Date.now(), chose.chosen, (one) => events.has(one.phase))
  return told([...linesOf(costs, GUARD)])
}
