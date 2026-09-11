import { editsAt } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  listingHanded,
  listingKept,
} from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import { subagentIn } from "akasha/commands/modules/change-arguing/change-arguing.module.code.ts"
import { noPageSaid } from "akasha/commands/modules/change-running/change-running.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

const LISTS = "list"

export function changeList(argv: readonly string[], given: Given): Answer {
  const said = subagentIn(argv, LISTS)
  if ("why" in said) return mistaking([said.why])
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  const under = said.named
  return under === null ? listingKept(given.root, page) : listingHanded(given.root, page, under)
}
