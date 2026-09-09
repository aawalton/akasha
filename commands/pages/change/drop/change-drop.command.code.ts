import { editsAt } from "@akasha/changes/edits-keeping"
import { agentPathOf } from "@akasha/context/warranting"
import { mistaking } from "../../../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../../command-system/calling/calling.module.code.ts"
import { inputIn } from "../../../../command-system/piping/piping.module.code.ts"
import {
  DROP_WORDS,
  dropping,
  forgetting,
  pipedPathsIn,
} from "../../../modules/change-acting/change-acting.module.code.ts"
import { subagentIn } from "../../../modules/change-arguing/change-arguing.module.code.ts"
import { noPageSaid } from "../../../modules/change-running/change-running.module.code.ts"

const DROPS = "drop"

export function changeDrop(argv: readonly string[], given: Given): Answer {
  const said = subagentIn(argv, DROPS)
  if ("why" in said) return mistaking([said.why])
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  const under = said.named
  if (under !== null) return forgetting(given.root, page, under, inputIn)
  const piped = pipedPathsIn(inputIn, DROP_WORDS)
  if (typeof piped === "string") return mistaking([piped])
  return dropping(given.root, page, piped)
}
