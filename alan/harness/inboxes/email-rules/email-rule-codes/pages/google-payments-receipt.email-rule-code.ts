import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const googlePaymentsReceipt = {
  id: "01a06860-54a2-7e49-86d6-d8f59cf70665",
  pageTypeSlug: "email-rule-code",
  slug: "google-payments-receipt",
  title: "Google payments receipt",
  matches: [
    { field: "from", comparison: "is", values: ["payments-noreply@google.com"] },
    { field: "subject", comparison: "contains", values: ["received your payment"] },
  ],
  filing: "archive",
  forwardToSlug: "jenny",
} as const satisfies EmailRuleCode
