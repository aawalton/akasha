import { editsAt } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { loadedAt } from "akasha/changes/runners/change-loading/change-loading.module.code.ts"
import {
  applyingKept,
  applyWith,
} from "akasha/commands/modules/apply-running/apply-running.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { CHANGE_APPLY_SLUG } from "akasha/commands/modules/change-costing/change-costing.module.code.ts"
import {
  type Chosen,
  changing,
  noPageSaid,
} from "akasha/commands/modules/change-running/change-running.module.code.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

const APPLIES = "apply"

const MESSAGE = "message"

const MEASURE = "measure"

const TRUE = "true"

export const CHOSEN: Omit<Chosen, "calledAs"> = {
  said: APPLIES,
  drafts: false,
  barred: ["draft"],
  slug: CHANGE_APPLY_SLUG,
}

export async function changeApply(argv: readonly string[], given: Given): Promise<Answer> {
  if (argv[0] === undefined) return await applyingKept(given)
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  const landing = async (message: string | null, measure: boolean): Promise<Answer> => {
    const taken: Record<string, string> = {}
    if (message !== null) taken[MESSAGE] = message
    if (measure) taken[MEASURE] = TRUE
    return await applyWith(taken, given)
  }
  return await changing(given.root, page, given.agentId, argv, inputIn, loadedAt, landing, {
    ...CHOSEN,
    calledAs: given.calledAs,
  })
}
