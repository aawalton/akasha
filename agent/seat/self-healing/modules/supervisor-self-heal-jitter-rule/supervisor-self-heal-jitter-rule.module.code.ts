import {
  askRule,
  type RuleAnswer,
} from "akasha/agent/seat/supervisor/supervisor-deciding/modules/supervisor-ask-rule/supervisor-ask-rule.module.code.ts"
import type { AskDecide } from "akasha/agent/seat/supervisor/supervisor-restarting/modules/supervisor-resume-asks/supervisor-resume-asks.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const RULE = "selfHealJitterRule"

const AnswerZ = SHAPE.object({
  [RULE]: SHAPE.object({ reExecJitterMs: SHAPE.number() }),
})

const SAFE = 0

export type SelfHealJitterRuleSource = (
  randFloat: number,
  rawMaxJitterMs: string | undefined
) => Promise<RuleAnswer<number>>

function readReExecJitterMs(answered: unknown): number {
  return AnswerZ.parse(answered)[RULE].reExecJitterMs
}

export function askReExecJitterMs(
  randFloat: number,
  rawMaxJitterMs: string | undefined,
  ask?: AskDecide
): Promise<RuleAnswer<number>> {
  return askRule(
    RULE,
    { reExecJitterMs: { randFloat, rawMaxJitterMs: rawMaxJitterMs ?? null } },
    readReExecJitterMs,
    SAFE,
    ask
  )
}
