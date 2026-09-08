import { agentPathOf } from "@akasha/context/warranting"
import { editsAt } from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { mistaking } from "../../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../command-system/calling/calling.module.code.ts"
import { taking } from "../../../command-system/change-acting/change-acting.module.code.ts"
import { subagentIn } from "../../../command-system/change-arguing/change-arguing.module.code.ts"
import { inputIn } from "../../../command-system/piping/piping.module.code.ts"
import { noPageSaid } from "../change/change.command.code.ts"

const TAKES = "take"

export function changeTake(argv: readonly string[], given: Given): Answer {
  const said = subagentIn(argv, TAKES)
  if ("why" in said) return mistaking([said.why])
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  return taking(given.root, page, said.named ?? undefined, inputIn)
}
