import type { Answer } from "../../../../modules/calling/calling.module.code.ts"
import {
  countedIn,
  linesOf,
  sinceOf,
  storeHere,
} from "../../../../modules/claude-account-costing/claude-account-costing.module.code.ts"

const DAYS = 30

export function measureClaudeAccountsCost(): Answer {
  const until = Date.now()
  const counted = countedIn(storeHere(), sinceOf(until, DAYS), until)
  return { report: [...linesOf(counted, DAYS)], refusals: [], code: 0 }
}
