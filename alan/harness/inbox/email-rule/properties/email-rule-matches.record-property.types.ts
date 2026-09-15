import type { EmailRuleMatchComparison } from "akasha/alan/harness/inbox/email-rule/properties/email-rule-match-comparison.select-property.types.ts"
import type { EmailRuleMatchField } from "akasha/alan/harness/inbox/email-rule/properties/email-rule-match-field.select-property.types.ts"
import type { EmailRuleMatchValues } from "akasha/alan/harness/inbox/email-rule/properties/email-rule-match-values.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type EmailRuleMatches = List<{
  field: EmailRuleMatchField
  comparison: EmailRuleMatchComparison
  values: EmailRuleMatchValues
}>
