import { seatEditsAt } from "akasha/agents/subagents/modules/recovering/subagent-recovering.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/taking/argument-taking.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { noPageSaid } from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { changeSubagentList as page } from "akasha/commands/pages/change/subagent/list/change-subagent-list.command.ts"
import { listingRecords } from "akasha/commands/pages/change/subagent/modules/subagent-edits-acting/subagent-edits-acting.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

export function changeSubagentList(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking(read.refused)
  const agentPage = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (agentPage === null || seatEditsAt(agentPage) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  return listingRecords(given.root, agentPage)
}
