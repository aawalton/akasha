import {
  askRule,
  type RuleAnswer,
} from "akasha/agent/seat/supervisor/supervisor-deciding/modules/supervisor-ask-rule/supervisor-ask-rule.module.code.ts"
import type { AskDecide } from "akasha/agent/seat/supervisor/supervisor-restarting/modules/supervisor-resume-asks/supervisor-resume-asks.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const RULE = "preCliffRestartRule"

export type PreCliffObservation = {
  childAgeMs: number | null
  alreadyArmed: boolean
  deferredOrActionPending: boolean
}

export type PreCliffDecision = "arm" | "wait"

const AnswerZ = SHAPE.object({
  [RULE]: SHAPE.object({ decidePreCliffRestart: SHAPE.enum(["arm", "wait"]) }),
})

const SAFE: PreCliffDecision = "wait"

export type PreCliffRestartRuleSource = (
  obs: PreCliffObservation,
  thresholdMs: number
) => Promise<RuleAnswer<PreCliffDecision>>

function readPreCliffRestart(answered: unknown): PreCliffDecision {
  return AnswerZ.parse(answered)[RULE].decidePreCliffRestart
}

export function askPreCliffRestart(
  obs: PreCliffObservation,
  thresholdMs: number,
  ask?: AskDecide
): Promise<RuleAnswer<PreCliffDecision>> {
  return askRule(
    RULE,
    { decidePreCliffRestart: { obs, thresholdMs } },
    readPreCliffRestart,
    SAFE,
    ask
  )
}
