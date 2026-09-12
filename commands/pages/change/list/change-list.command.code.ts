import { editsAt } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  listingKept,
  noPageSaid,
} from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import {
  helpIn,
  wordlessIn,
} from "akasha/commands/pages/change/change-arguing/change-arguing.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

const LISTS = "list"

const HELP: readonly string[] = [
  "names the edits kept beside this agent's page and not yet landed,",
  "in the order a name sorts.",
  "",
  "It takes no word on the command line and nothing piped in.",
]

export function changeList(argv: readonly string[], given: Given): Answer {
  const help = helpIn(argv, given.calledAs, HELP)
  if (help !== null) return told(help)
  const why = wordlessIn(argv, LISTS)
  if (why !== null) return mistaking([why])
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  return listingKept(given.root, page)
}
