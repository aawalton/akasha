import { loadedAt } from "@akasha/changes/change-loading"
import { editsAt } from "@akasha/changes/edits-keeping"
import { agentPathOf } from "akasha/context/modules/warranting/warranting.module.code.ts"
import { mistaking } from "../../../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../../command-system/calling/calling.module.code.ts"
import {
  applyingKept,
  applyWith,
} from "../../../modules/apply-running/apply-running.module.code.ts"
import { CHANGE_APPLY_PAGE } from "../../../modules/change-costing/change-costing.module.code.ts"
import {
  type Chosen,
  changing,
  noPageSaid,
} from "../../../modules/change-running/change-running.module.code.ts"
import { inputIn } from "../../../modules/piping/piping.module.code.ts"

const APPLIES = "apply"

const MESSAGE = "message"

const MEASURE = "measure"

const TRUE = "true"

export const CHOSEN: Chosen = {
  said: APPLIES,
  drafts: false,
  barred: ["draft"],
  at: CHANGE_APPLY_PAGE,
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
  return await changing(given.root, page, given.agentId, argv, inputIn, loadedAt, landing, CHOSEN)
}
