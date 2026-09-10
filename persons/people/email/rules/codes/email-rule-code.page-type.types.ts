import type { EmailRule } from "../email-rule.page-type.types.ts"
import type { EmailRuleCodeActions } from "./properties/email-rule-code-actions.select-property.ts"
import type { EmailRuleCodeDelay } from "./properties/email-rule-code-delay.text-property.ts"
import type { EmailRuleCodeFiling } from "./properties/email-rule-code-filing.select-property.ts"
import type { EmailRuleCodeForwardTo } from "./properties/email-rule-code-forward-to.relation-property.ts"

export type EmailRuleCode = EmailRule & {
  filing: EmailRuleCodeFiling
  actions?: EmailRuleCodeActions
  delay?: EmailRuleCodeDelay
  forwardTo?: EmailRuleCodeForwardTo
}
