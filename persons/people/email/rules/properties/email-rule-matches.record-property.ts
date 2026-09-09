import type { List } from "@akasha/pages/page-property"
import type { RecordProperty } from "@akasha/pages/record-property"
import type { EmailRuleMatchComparison } from "./email-rule-match-comparison.select-property.ts"
import type { EmailRuleMatchField } from "./email-rule-match-field.select-property.ts"
import type { EmailRuleMatchValues } from "./email-rule-match-values.text-property.ts"

export type EmailRuleMatch = {
  field: EmailRuleMatchField
  comparison: EmailRuleMatchComparison
  values: readonly EmailRuleMatchValues[]
}

export type EmailRuleMatches = List<EmailRuleMatch>

export const emailRuleMatches = {
  id: "01a06860-549f-7699-a464-5922a5455508",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "email-rule-matches",
  propertySlug: "matches",
  definition: "which mail a rule applies to, each clause with the field tested and how",
  properties: [
    { pageProperty: "select-property/email-rule-match-field", required: true, many: false },
    {
      pageProperty: "select-property/email-rule-match-comparison",
      required: true,
      many: false,
    },
    {
      pageProperty: "text-property/email-rule-match-values",
      required: true,
      many: true,
      maxCount: 50,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A piece of mail is caught where the mail passes every clause.",
    },
    { invariantKind: "departure", statement: "A rule with no clause catches nothing." },
    { invariantKind: "departure", statement: "Two clauses on one field are two entries." },
  ],
} as const satisfies RecordProperty
