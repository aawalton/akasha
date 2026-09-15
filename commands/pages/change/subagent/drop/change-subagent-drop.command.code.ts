import { seatEditsAt } from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  noPageSaid,
  pipedPathsIn,
} from "akasha/command/modules/change-acting/change-acting.module.code.ts"
import { inputIn } from "akasha/command/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { changeSubagentDrop as page } from "akasha/command/pages/change/subagent/drop/change-subagent-drop.command.ts"
import {
  droppingRecords,
  RECORD_WORDS,
} from "akasha/command/pages/change/subagent/modules/subagent-edits-acting/subagent-edits-acting.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

const PIPED = "a drop takes the paths it drops piped in, and nothing on the command line"

export function changeSubagentDrop(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking([...read.refused, PIPED])
  const agentPage = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (agentPage === null || seatEditsAt(agentPage) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  const piped = pipedPathsIn(inputIn, RECORD_WORDS)
  if (typeof piped === "string") return mistaking([piped])
  return droppingRecords(given.root, agentPage, piped)
}
