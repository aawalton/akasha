import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const amazonPurchases = {
  id: "01a06860-54a1-72fd-8bcb-6ab142ea4831",
  type: "page-type/email-rule-code",
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
        "item:",
        "items:",
        "shipped",
        "out for delivery",
        "arriving",
        "delivered",
        "delivery update",
        "dropoff confirmed",
        "return drop off confirmation",
        "return request confirmed",
        "advance refund issued",
        "partial refund confirmed",
        "refund confirmation",
        "refund on order",
        "cancelled successfully",
        "saved additional money on your amazon pre-order",
      ],
    },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.721Z",
  updatedAt: "2026-10-27T21:19:16.125Z",
} as const satisfies EmailRuleCode
