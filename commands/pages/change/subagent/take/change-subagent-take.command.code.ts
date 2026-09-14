import { seatEditsAt } from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/taking/argument-taking.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { noPageSaid } from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import { inputIn, type Piping } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import {
  askedIn,
  TAKE_WORDS,
  takingRecords,
} from "akasha/commands/pages/change/subagent/modules/subagent-edits-acting/subagent-edits-acting.module.code.ts"
import { changeSubagentTake as page } from "akasha/commands/pages/change/subagent/take/change-subagent-take.command.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

const PIPED = "a take takes the paths it reaches piped in, and nothing on the command line"

export function changeSubagentTake(
  argv: readonly string[],
  given: Given,
  piping: Piping = inputIn
): Answer {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking([...read.refused, PIPED])
  const agentPage = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (agentPage === null || seatEditsAt(agentPage) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  const asked = askedIn(piping, TAKE_WORDS)
  if (typeof asked === "string") return mistaking([asked])
  return takingRecords(given.root, agentPage, asked.paths, asked.unlanded)
}
