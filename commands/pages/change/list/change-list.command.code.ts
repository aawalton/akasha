import { editsAt } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  listingKept,
  noPageSaid,
} from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { changeList as page } from "akasha/commands/pages/change/list/change-list.command.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

export function changeList(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking(read.refused)
  const agentPage = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (agentPage === null || editsAt(agentPage) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  return listingKept(given.root, agentPage)
}
