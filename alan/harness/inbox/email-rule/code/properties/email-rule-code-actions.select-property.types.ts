import type { emailRuleCodeActions } from "akasha/alan/harness/inbox/email-rule/code/properties/email-rule-code-actions.select-property.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type EmailRuleCodeActions = List<(typeof emailRuleCodeActions.values)[number]>
