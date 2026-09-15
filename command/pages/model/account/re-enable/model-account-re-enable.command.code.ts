import {
  markedIn,
  subscriptionMarks,
} from "akasha/agent/model/account/modules/marking/model-account-marking.module.code.ts"
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
import { modelAccountReEnable as page } from "akasha/command/pages/model/account/re-enable/model-account-re-enable.command.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"

export function modelAccountReEnable(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [account])
  if ("refused" in read) return mistaking(read.refused)
  try {
    const said = markedIn(
      given.root,
      read.taken.account,
      subscriptionMarks(null),
      readingIn(given.root),
      (path) => valueAt(path, given.root)
    )
    if (said.kind === "absent") return refusedBy([said.why], DATA)
    if (said.kind === "refused") return refusedBy([said.why], OPERATIONAL)
    if (said.kind === "unchanged") {
      return told([`${read.taken.account} was already standing, so nothing was cleared`])
    }
    return told([`${read.taken.account} stands again, and the picker counts it from the next ask`])
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
