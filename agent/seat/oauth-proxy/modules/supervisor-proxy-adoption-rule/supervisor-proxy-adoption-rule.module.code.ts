import {
  askRule,
  type RuleAnswer,
} from "akasha/agent/seat/supervisor/supervisor-deciding/modules/supervisor-ask-rule/supervisor-ask-rule.module.code.ts"
import type { AskDecide } from "akasha/agent/seat/supervisor/supervisor-restarting/modules/supervisor-resume-asks/supervisor-resume-asks.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const RULE = "proxyAdoptionRule"

export type ProxyAdoptionInput = {
  readonly hasLiveProxy: boolean
  readonly versionMatches: boolean
  readonly healthy: boolean
}

export type ProxyAdoptionDecision = "adopt" | "adopt-with-drift" | "spawn-fresh"

const AnswerZ = SHAPE.object({
  [RULE]: SHAPE.object({
    decideProxyAdoption: SHAPE.enum(["adopt", "adopt-with-drift", "spawn-fresh"]),
  }),
})

const SAFE: ProxyAdoptionDecision = "adopt"

export type ProxyAdoptionRuleSource = (
  input: ProxyAdoptionInput
) => Promise<RuleAnswer<ProxyAdoptionDecision>>

function readProxyAdoption(answered: unknown): ProxyAdoptionDecision {
  return AnswerZ.parse(answered)[RULE].decideProxyAdoption
}

export function askProxyAdoption(
  input: ProxyAdoptionInput,
  ask?: AskDecide
): Promise<RuleAnswer<ProxyAdoptionDecision>> {
  return askRule(RULE, { decideProxyAdoption: input }, readProxyAdoption, SAFE, ask)
}
