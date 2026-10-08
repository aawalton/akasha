import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const googleplayOrderReceipt = {
  id: "01a06860-54a2-7ba4-a60a-621ee362e6b3",
  type: "page-type/email-rule-code",
  slug: "googleplay-order-receipt",
  title: "Googleplay order receipt",
  matches: [
    { field: "from", comparison: "is", values: ["googleplay-noreply@google.com"] },
    { field: "subject", comparison: "contains", values: ["your google play order receipt"] },
  ],
  filing: "archive",
  forwardTo: "person/jenny",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
