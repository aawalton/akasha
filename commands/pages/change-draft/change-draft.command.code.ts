import { agentPathOf } from "@akasha/context/warranting"
import { editsAt } from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { loadedAt } from "../../../changes/runners/change-loading/change-loading.module.code.ts"
import { mistaking } from "../../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../command-system/calling/calling.module.code.ts"
import { inputIn } from "../../../command-system/piping/piping.module.code.ts"
import { type Chosen, changing, noPageSaid } from "../change/change.command.code.ts"

const DRAFTS = "draft"

const NO_ACT = "a draft names the change to answer, and this call named none"

const LANDS = "a draft lands nothing, so no message is composed and none is taken"

export const CHOSEN: Chosen = { said: DRAFTS, drafts: true, barred: ["draft", "message"] }

async function nothing(): Promise<Answer> {
  return { report: [], refusals: [LANDS], code: 3 }
}

export async function changeDraft(argv: readonly string[], given: Given): Promise<Answer> {
  if (argv[0] === undefined) return mistaking([NO_ACT])
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  return await changing(given.root, page, given.agentId, argv, inputIn, loadedAt, nothing, CHOSEN)
}
