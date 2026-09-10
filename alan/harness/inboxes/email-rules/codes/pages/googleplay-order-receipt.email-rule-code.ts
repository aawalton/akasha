import type { EmailRuleCode } from "../email-rule-code.page-type.types.ts"

export const googleplayOrderReceipt = {
  id: "01a06860-54a2-7ba4-a60a-621ee362e6b3",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
  slug: "googleplay-order-receipt",
  title: "Googleplay order receipt",
  matches: [
    { field: "from", comparison: "is", values: ["googleplay-noreply@google.com"] },
    { field: "subject", comparison: "contains", values: ["your google play order receipt"] },
  ],
  filing: "archive",
  forwardTo: "jenny",
} as const satisfies EmailRuleCode
