import type { EmailRuleJudgement } from "akasha/alan/harness/inboxes/email-rules/agents/properties/email-rule-judgement.text-property.types.ts"
import type { EmailRule } from "akasha/alan/harness/inboxes/email-rules/email-rule.page-type.types.ts"

export type EmailRuleAgent = EmailRule & {
  judgement: EmailRuleJudgement
}
