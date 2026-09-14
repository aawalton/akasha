import { takenFor } from "akasha/commands/arguments/modules/taking/argument-taking.module.code.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { measureModelAccountCost as page } from "akasha/commands/pages/measure/model/account/cost/measure-model-account-cost.command.ts"
import {
  countedIn,
  linesOf,
  sinceOf,
  storeHere,
} from "akasha/commands/pages/measure/model/account/cost/modules/model-account-costing/model-account-costing.module.code.ts"

const DAYS = 30

export function measureModelAccountCost(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking(read.refused)
  const until = Date.now()
  const counted = countedIn(storeHere(), sinceOf(until, DAYS), until)
  return told([...linesOf(counted, DAYS)])
}
