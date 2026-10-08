import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const googlePaymentsReceipt = {
  id: "01a06860-54a2-7e49-86d6-d8f59cf70665",
  type: "page-type/email-rule-code",
  slug: "google-payments-receipt",
  title: "Google payments receipt",
  matches: [
    { field: "from", comparison: "is", values: ["payments-noreply@google.com"] },
    { field: "subject", comparison: "contains", values: ["received your payment"] },
  ],
  filing: "archive",
  forwardTo: "person/jenny",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
