import { seatEditsAt } from "akasha/agents/subagents/modules/recovering/subagent-recovering.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/taking/argument-taking.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { noPageSaid } from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import { argumentsIn } from "akasha/commands/modules/change-running/change-running.module.code.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { pathIn } from "akasha/commands/pages/change/show/change-show.command.code.ts"
import { showingRecords } from "akasha/commands/pages/change/subagent/modules/subagent-edits-acting/subagent-edits-acting.module.code.ts"
import { changeSubagentShow as page } from "akasha/commands/pages/change/subagent/show/change-subagent-show.command.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

const NO_FLAGS = "a show takes its arguments piped in, and nothing on the command line"

export function changeSubagentShow(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking([...read.refused, NO_FLAGS])
  const taken = argumentsIn(inputIn)
  if (typeof taken === "string") return mistaking([taken])
  const path = pathIn(given.root, taken)
  if (typeof path !== "string") return mistaking(path)
  const agentPage = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (agentPage === null || seatEditsAt(agentPage) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  return showingRecords(given.root, agentPage, path)
}
