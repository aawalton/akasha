import { type FleetUsage, readFleetUsage } from "@akasha/agents/claude-account-usage"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { readIn } from "../../modules/no-word-reading/no-word-reading.module.code.ts"

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

export function claudeUsage(argv: readonly string[], _given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  return answerFrom(readFleetUsage)
}
