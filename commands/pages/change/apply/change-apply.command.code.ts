import { editsAt } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { loadedAt } from "akasha/changes/runners/change-loading/change-loading.module.code.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  applyingKept,
  applyWith,
} from "akasha/commands/modules/apply-running/apply-running.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { noPageSaid } from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import { CHANGE_APPLY_SLUG } from "akasha/commands/modules/change-costing/change-costing.module.code.ts"
import {
  type Chosen,
  changing,
} from "akasha/commands/modules/change-running/change-running.module.code.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { helpIn } from "akasha/commands/pages/change/change-arguing/change-arguing.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

const APPLIES = "apply"

const HELP: readonly string[] = [
  "lands every edit kept, answering one change first where one is named.",
  "",
  "It takes a change to answer as its one word, and its arguments piped in:",
  "",
  "  message: <what the commit is for>   composed where none is said",
  "  measure: true                       run the checks and land nothing",
  "  break-the-glass: <why>              land with no check run",
  "",
  "A call naming a change takes that change's arguments beside these.",
  "A call naming no change lands the edits already kept.",
  "`draft` is refused here.",
  "A change or a check that refuses lands nothing and leaves every edit kept.",
]

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
  const help = helpIn(argv, given.calledAs, HELP)
  if (help !== null) return told(help)
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
