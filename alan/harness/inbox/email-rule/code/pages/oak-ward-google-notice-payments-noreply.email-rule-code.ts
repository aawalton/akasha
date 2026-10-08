import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const oakWardGoogleNoticePaymentsNoreply = {
  id: "01a06860-54a2-7a75-880f-330c4a643aec",
  type: "page-type/email-rule-code",
  slug: "oak-ward-google-notice-payments-noreply",
  title: "Oak ward google notice payments noreply",
  matches: [
    { field: "from", comparison: "ends-with", values: ["google.com"] },
    { field: "subject", comparison: "contains", values: ["oak.hills.first.ward.tech"] },
    { field: "from", comparison: "is", values: ["payments-noreply@google.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["received your payment"] },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
