import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  countedIn,
  linesOf,
  sinceOf,
  storeHere,
} from "akasha/commands/pages/measure/claude-account/cost/claude-account-costing/claude-account-costing.module.code.ts"

const DAYS = 30

export function measureClaudeAccountCost(): Answer {
  const until = Date.now()
  const counted = countedIn(storeHere(), sinceOf(until, DAYS), until)
  return told([...linesOf(counted, DAYS)])
}
