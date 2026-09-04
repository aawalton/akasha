import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const amazonPurchases = {
  id: "01a06860-54a1-72fd-8bcb-6ab142ea4831",
  pageTypeSlug: "email-rule-code",
  slug: "amazon-purchases",
  title: "Amazon purchases",
  matches: [
    { field: "from", comparison: "ends-with", values: ["amazon.com"] },
    { field: "from", comparison: "is-not", values: ["store-news@amazon.com"] },
    {
      field: "subject",
      comparison: "contains",
      values: [
        "ordered:",
        "shipped",
        "out for delivery",
        "arriving",
        "delivered",
        "dropoff confirmed",
        "return request confirmed",
        "advance refund issued",
        "saved additional money on your amazon pre-order",
      ],
    },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
