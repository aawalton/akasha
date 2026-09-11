import {
  type FleetUsage,
  readFleetUsage,
} from "akasha/agents/claude-accounts/modules/usage/claude-account-usage.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { readIn } from "akasha/commands/pages/agent/forest/no-word-reading/no-word-reading.module.code.ts"

export function saidOf(usage: FleetUsage): string {
  return JSON.stringify(usage)
}

export function answerFrom(reading: () => FleetUsage): Answer {
  try {
    return { report: [saidOf(reading())], refusals: [], code: 0 }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}

export function claudeAccountUsage(argv: readonly string[], _given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  return answerFrom(readFleetUsage)
}
