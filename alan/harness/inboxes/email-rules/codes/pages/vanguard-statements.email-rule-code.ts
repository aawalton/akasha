import type { EmailRuleCode } from "akasha/alan/harness/inboxes/email-rules/codes/email-rule-code.page-type.types.ts"

export const vanguardStatements = {
  id: "01a06860-54a2-7cad-8083-f8e07513f892",
  type: "email-rule-code",
  slug: "vanguard-statements",
  title: "Vanguard statements",
  matches: [
    { field: "from", comparison: "ends-with", values: ["transactional.vanguard.com"] },
    { field: "subject", comparison: "contains", values: ["statement"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["transaction confirmation", "transaction submission"],
    },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
