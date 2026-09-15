import { editsAt } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  DROP_WORDS,
  dropping,
  noPageSaid,
  pipedPathsIn,
} from "akasha/command/modules/change-acting/change-acting.module.code.ts"
import { inputIn } from "akasha/command/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { changeDrop as page } from "akasha/command/pages/change/drop/change-drop.command.ts"
import { agentPathOf } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"

const PIPED = "a drop takes the paths it drops piped in, and nothing on the command line"

export function changeDrop(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking([...read.refused, PIPED])
  const agentPage = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (agentPage === null || editsAt(agentPage) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  const piped = pipedPathsIn(inputIn, DROP_WORDS)
  if (typeof piped === "string") return mistaking([piped])
  return dropping(given.root, agentPage, piped)
}
