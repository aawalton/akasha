import {
  askRule,
  type RuleAnswer,
} from "akasha/agent/seat/supervisor/supervisor-deciding/modules/supervisor-ask-rule/supervisor-ask-rule.module.code.ts"
import type { AskDecide } from "akasha/agent/seat/supervisor/supervisor-restarting/modules/supervisor-resume-asks/supervisor-resume-asks.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const RULE = "proxyLivenessRule"

export type ProxyLivenessState = {
  readonly consecutiveFailures: number
  readonly consecutiveRespawns: number
  readonly gaveUp: boolean
}

export type ProxyLivenessAction = "none" | "respawn" | "give-up"

export type ProxyLivenessVerdict = {
  readonly state: ProxyLivenessState | null
  readonly action: ProxyLivenessAction
}

const StateZ = SHAPE.object({
  consecutiveFailures: SHAPE.number(),
  consecutiveRespawns: SHAPE.number(),
  gaveUp: SHAPE.boolean(),
})
const AnswerZ = SHAPE.object({
  [RULE]: SHAPE.object({
    decideProxyLiveness: SHAPE.object({
      state: StateZ,
      action: SHAPE.enum(["none", "respawn", "give-up"]),
    }),
  }),
})

export type ProxyLivenessRuleSource = (
  state: ProxyLivenessState | null,
  healthy: boolean
) => Promise<RuleAnswer<ProxyLivenessVerdict>>

function readProxyLiveness(answered: unknown): ProxyLivenessVerdict {
  return AnswerZ.parse(answered)[RULE].decideProxyLiveness
}

export function askProxyLiveness(
  state: ProxyLivenessState | null,
  healthy: boolean,
  ask?: AskDecide
): Promise<RuleAnswer<ProxyLivenessVerdict>> {
  return askRule(
    RULE,
    { decideProxyLiveness: { state, healthy } },
    readProxyLiveness,
    { state, action: "none" },
    ask
  )
}
