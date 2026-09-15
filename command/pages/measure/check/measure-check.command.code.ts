import {
  costsIn,
  linesOf,
  windowOf,
} from "akasha/checks/modules/measuring/check-measuring.module.code.ts"
import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { runWindow } from "akasha/command/arguments/pages/run-window.argument.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { measureCheck as page } from "akasha/command/pages/measure/check/measure-check.command.ts"

export function measureCheck(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [runWindow])
  if ("refused" in read) return mistaking(read.refused)
  const chose = windowOf(read.taken.runWindow)
  if (chose.chosen === null) return mistaking(chose.refusals)
  const costs = costsIn(given.root, Date.now(), chose.chosen, "check")
  return told([...linesOf(costs)])
}
