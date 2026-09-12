import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import {
  countedIn,
  linesOf,
  sinceOf,
  storeHere,
} from "akasha/commands/pages/measure/claude-account/cost/claude-account-costing/claude-account-costing.module.code.ts"
import { measureClaudeAccountCost as page } from "akasha/commands/pages/measure/claude-account/cost/measure-claude-account-cost.command.ts"

const DAYS = 30

export function measureClaudeAccountCost(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking(read.refused)
  const until = Date.now()
  const counted = countedIn(storeHere(), sinceOf(until, DAYS), until)
  return told([...linesOf(counted, DAYS)])
}
