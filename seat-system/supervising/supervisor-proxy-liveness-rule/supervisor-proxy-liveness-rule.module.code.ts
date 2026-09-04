import { askRule, type RuleAnswer } from "@akasha/seat-system/supervisor-ask-rule"
import type { AskDecide } from "@akasha/seat-system/supervisor-resume-asks"
import { shape } from "@akasha/utils-narrow/shape"

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

const StateZ = shape.object({
  consecutiveFailures: shape.number(),
  consecutiveRespawns: shape.number(),
  gaveUp: shape.boolean(),
})
const AnswerZ = shape.object({
  [RULE]: shape.object({
    decideProxyLiveness: shape.object({
      state: StateZ,
      action: shape.enum(["none", "respawn", "give-up"]),
    }),
  }),
})

export type ProxyLivenessRuleSource = (
  state: ProxyLivenessState | null,
  healthy: boolean
) => Promise<RuleAnswer<ProxyLivenessVerdict>>

export function readProxyLiveness(answered: unknown): ProxyLivenessVerdict {
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
