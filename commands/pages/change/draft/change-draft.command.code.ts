import { editsAt } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { loadedAt } from "akasha/changes/runners/change-loading/change-loading.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { CHANGE_DRAFT_SLUG } from "akasha/commands/modules/change-costing/change-costing.module.code.ts"
import {
  type Chosen,
  changing,
  noPageSaid,
} from "akasha/commands/modules/change-running/change-running.module.code.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

const DRAFTS = "draft"

const LANDS = "a draft lands nothing, so no message is composed and none is taken"

export const CHOSEN: Chosen = {
  said: DRAFTS,
  drafts: true,
  barred: ["draft", "message", "measure"],
  slug: CHANGE_DRAFT_SLUG,
}

async function nothing(): Promise<Answer> {
  return { report: [], refusals: [LANDS], code: 3 }
}

export async function changeDraft(argv: readonly string[], given: Given): Promise<Answer> {
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  return await changing(given.root, page, given.agentId, argv, inputIn, loadedAt, nothing, CHOSEN)
}
