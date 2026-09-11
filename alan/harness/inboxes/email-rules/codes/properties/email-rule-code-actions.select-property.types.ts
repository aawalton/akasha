import type { emailRuleCodeActions } from "akasha/alan/harness/inboxes/email-rules/codes/properties/email-rule-code-actions.select-property.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type EmailRuleCodeActions = List<(typeof emailRuleCodeActions.values)[number]>
