import { editsAt } from "@akasha/changes/edits-keeping"
import { agentPathOf } from "akasha/context/modules/warranting/warranting.module.code.ts"
import type { Answer, Given } from "../../../../command-system/calling/calling.module.code.ts"
import { mistaking } from "../../../modules/asking/asking.module.code.ts"
import { taking } from "../../../modules/change-acting/change-acting.module.code.ts"
import { subagentIn } from "../../../modules/change-arguing/change-arguing.module.code.ts"
import { noPageSaid } from "../../../modules/change-running/change-running.module.code.ts"
import { inputIn } from "../../../modules/piping/piping.module.code.ts"

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
