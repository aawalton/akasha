import type { EmailRule } from "../email-rule.page-type.types.ts"
import type { EmailRuleJudgement } from "./properties/email-rule-judgement.text-property.types.ts"

export type EmailRuleAgent = EmailRule & {
  judgement: EmailRuleJudgement
}
