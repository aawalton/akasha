import type { EmailRuleCodeActions } from "akasha/alan/harness/inboxes/email-rules/codes/properties/email-rule-code-actions.select-property.types.ts"
import type { EmailRuleCodeDelay } from "akasha/alan/harness/inboxes/email-rules/codes/properties/email-rule-code-delay.text-property.types.ts"
import type { EmailRuleCodeFiling } from "akasha/alan/harness/inboxes/email-rules/codes/properties/email-rule-code-filing.select-property.types.ts"
import type { EmailRuleCodeForwardTo } from "akasha/alan/harness/inboxes/email-rules/codes/properties/email-rule-code-forward-to.relation-property.types.ts"
import type { EmailRule } from "akasha/alan/harness/inboxes/email-rules/email-rule.page-type.types.ts"

export type EmailRuleCode = EmailRule & {
  filing: EmailRuleCodeFiling
  actions?: EmailRuleCodeActions
  delay?: EmailRuleCodeDelay
  forwardTo?: EmailRuleCodeForwardTo
}
