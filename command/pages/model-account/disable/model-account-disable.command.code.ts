import {
  markedIn,
  subscriptionMarks,
} from "akasha/agent/model/account/modules/marking/model-account-marking.module.code.ts"
import { accountStateIn } from "akasha/agent/model/account/modules/reading/model-account-reading.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { account } from "akasha/command/argument/pages/account.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { modelAccountDisable as page } from "akasha/command/pages/model-account/disable/model-account-disable.command.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"

export const WITHDRAWN_REASON = "the subscription was cancelled"

export function modelAccountDisable(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [account])
  if ("refused" in read) return mistaking(read.refused)
  const slug = read.taken.account
  try {
    const state = accountStateIn(given.root, slug)
    if (state !== null && state.subscriptionDisabledReason !== null) {
      return told([`${slug} was already shut out, so nothing was written`])
    }
    const said = markedIn(
      given.root,
      slug,
      subscriptionMarks(WITHDRAWN_REASON),
      readingIn(given.root),
      (path) => valueAt(path, given.root)
    )
    if (said.kind === "absent") return refusedBy([said.why], DATA)
    if (said.kind === "refused") return refusedBy([said.why], OPERATIONAL)
    return told([`${slug} is shut out, and the picker passes it over from the next ask`])
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
