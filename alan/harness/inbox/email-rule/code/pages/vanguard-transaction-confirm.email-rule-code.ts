import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const vanguardTransactionConfirm = {
  id: "01a06860-54a2-7564-ae67-fb1830491d30",
  type: "page-type/email-rule-code",
  slug: "vanguard-transaction-confirm",
  title: "Vanguard transaction confirm",
  matches: [
    { field: "from", comparison: "ends-with", values: ["transactional.vanguard.com"] },
    {
      field: "subject",
      comparison: "contains",
      values: ["transaction confirmation", "transaction submission"],
    },
  ],
  filing: "archive",
  forwardTo: "person/jenny",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
