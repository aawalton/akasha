import type { EmailRuleCode } from "../email-rule-code.page-type.types.ts"

export const synchronyCardPayment = {
  id: "01a06860-54a2-71f9-9c21-085bc65204cf",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
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
  forwardTo: "jenny",
} as const satisfies EmailRuleCode
