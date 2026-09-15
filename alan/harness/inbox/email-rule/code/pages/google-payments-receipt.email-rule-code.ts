import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const googlePaymentsReceipt = {
  id: "01a06860-54a2-7e49-86d6-d8f59cf70665",
  type: "email-rule-code",
  slug: "google-payments-receipt",
  title: "Google payments receipt",
  matches: [
    { field: "from", comparison: "is", values: ["payments-noreply@google.com"] },
    { field: "subject", comparison: "contains", values: ["received your payment"] },
  ],
  filing: "archive",
  forwardTo: "person/jenny",
} as const satisfies EmailRuleCode
