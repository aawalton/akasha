import type { EmailRuleJudgement } from "akasha/alan/harness/inbox/email-rule/agent/properties/email-rule-judgement.text-property.types.ts"
import type { EmailRule } from "akasha/alan/harness/inbox/email-rule/email-rule.page-type.types.ts"

export type EmailRuleAgent = EmailRule & {
  judgement: EmailRuleJudgement
}
