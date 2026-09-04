import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const royaltyStatements = {
  id: "01a06860-54a2-78b9-a6cf-5d156dc4de7b",
  pageTypeSlug: "email-rule-code",
  slug: "royalty-statements",
  title: "Royalty statements",
  matches: [
    { field: "from", comparison: "ends-with", values: ["royaltytracker.com"] },
    { field: "subject", comparison: "contains", values: ["statement"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
