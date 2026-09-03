import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const vanguardStatements = {
  id: "01a06860-54a2-7cad-8083-f8e07513f892",
  pageTypeSlug: "email-rule-code",
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
