import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const synchronyCardPayment = {
  id: "01a06860-54a2-71f9-9c21-085bc65204cf",
  type: "page-type/email-rule-code",
  slug: "synchrony-card-payment",
  title: "Synchrony card payment",
  matches: [
    { field: "from", comparison: "is", values: ["customer.service@servicing.synchrony.com"] },
    {
      field: "subject",
      comparison: "contains",
      values: ["payment has processed", "automatic payment"],
    },
  ],
  filing: "archive",
  forwardTo: "person/jenny",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
