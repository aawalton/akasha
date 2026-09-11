import { editsAt } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { listingKept } from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import { wordlessIn } from "akasha/commands/modules/change-arguing/change-arguing.module.code.ts"
import { noPageSaid } from "akasha/commands/modules/change-running/change-running.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

const LISTS = "list"

export function changeList(argv: readonly string[], given: Given): Answer {
  const why = wordlessIn(argv, LISTS)
  if (why !== null) return mistaking([why])
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  return listingKept(given.root, page)
}
