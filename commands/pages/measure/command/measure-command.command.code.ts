import { linesOf, windowOf } from "akasha/checks/modules/measuring/check-measuring.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { runWindow } from "akasha/commands/arguments/pages/run-window.argument.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { measureCommand as page } from "akasha/commands/pages/measure/command/measure-command.command.ts"
import {
  COMMAND,
  costsIn,
} from "akasha/commands/pages/measure/command/modules/command-measuring/command-measuring.module.code.ts"

export function measureCommand(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [runWindow])
  if ("refused" in read) return mistaking(read.refused)
  const chose = windowOf(read.taken.runWindow)
  if (chose.chosen === null) return mistaking(chose.refusals)
  const costs = costsIn(given.root, Date.now(), chose.chosen)
  return told([...linesOf(costs, COMMAND)])
}
