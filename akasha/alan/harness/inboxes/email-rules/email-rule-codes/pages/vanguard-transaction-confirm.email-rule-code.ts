import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const vanguardTransactionConfirm = {
  id: "01a06860-54a2-7564-ae67-fb1830491d30",
  pageTypeSlug: "email-rule-code",
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
  forwardToSlug: "jenny",
} as const satisfies EmailRuleCode
