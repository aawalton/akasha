import { agentPathOf } from "@akasha/context/warranting"
import { editsAt } from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { loadedAt } from "../../../changes/runners/change-loading/change-loading.module.code.ts"
import { mistaking } from "../../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../command-system/calling/calling.module.code.ts"
import { inputIn } from "../../../command-system/piping/piping.module.code.ts"
import { apply, applyWith } from "../apply/apply.command.code.ts"
import { type Chosen, changing, noPageSaid } from "../change/change.command.code.ts"

const APPLIES = "apply"

const MESSAGE = "message"

export const CHOSEN: Chosen = { said: APPLIES, drafts: false, barred: ["draft"] }

export async function changeApply(argv: readonly string[], given: Given): Promise<Answer> {
  if (argv[0] === undefined) return await apply([], given)
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  const landing = async (message: string | null): Promise<Answer> =>
    await applyWith(message === null ? {} : { [MESSAGE]: message }, given)
  return await changing(given.root, page, given.agentId, argv, inputIn, loadedAt, landing, CHOSEN)
}
