import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const oakWardGoogleNoticePaymentsNoreply = {
  id: "01a06860-54a2-7a75-880f-330c4a643aec",
  pageTypeSlug: "email-rule-code",
  slug: "oak-ward-google-notice-payments-noreply",
  title: "Oak ward google notice payments noreply",
  matches: [
    { field: "from", comparison: "ends-with", values: ["google.com"] },
    { field: "subject", comparison: "contains", values: ["oak.hills.first.ward.tech"] },
    { field: "from", comparison: "is", values: ["payments-noreply@google.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["received your payment"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
