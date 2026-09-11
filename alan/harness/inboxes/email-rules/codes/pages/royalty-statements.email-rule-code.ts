import type { EmailRuleCode } from "akasha/alan/harness/inboxes/email-rules/codes/email-rule-code.page-type.types.ts"

export const royaltyStatements = {
  id: "01a06860-54a2-78b9-a6cf-5d156dc4de7b",
  type: "email-rule-code",
  slug: "royalty-statements",
  title: "Royalty statements",
  matches: [
    { field: "from", comparison: "ends-with", values: ["royaltytracker.com"] },
    { field: "subject", comparison: "contains", values: ["statement"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
