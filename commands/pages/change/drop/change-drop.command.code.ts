import { editsAt } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  DROP_WORDS,
  dropping,
  forgetting,
  pipedPathsIn,
} from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import { subagentIn } from "akasha/commands/modules/change-arguing/change-arguing.module.code.ts"
import { noPageSaid } from "akasha/commands/modules/change-running/change-running.module.code.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

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
