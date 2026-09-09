import { editsAt } from "@akasha/changes/edits-keeping"
import { agentPathOf } from "@akasha/context/warranting"
import { mistaking } from "../../../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../../command-system/calling/calling.module.code.ts"
import { noPageSaid } from "../../../../command-system/change-running/change-running.module.code.ts"
import {
  listingHanded,
  listingKept,
} from "../../../modules/change-acting/change-acting.module.code.ts"
import { subagentIn } from "../../../modules/change-arguing/change-arguing.module.code.ts"

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
