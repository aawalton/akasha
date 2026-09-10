import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { emailRuleCodeActions } from "./email-rule-code-actions.select-property.ts"

export type EmailRuleCodeActions = List<(typeof emailRuleCodeActions.values)[number]>
