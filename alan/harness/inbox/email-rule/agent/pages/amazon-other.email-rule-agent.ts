import type { EmailRuleAgent } from "akasha/alan/harness/inbox/email-rule/agent/email-rule-agent.page-type.types.ts"

export const amazonOther = {
  id: "01a06863-fbe8-7f83-99bc-93eecc2a6180",
  type: "page-type/email-rule-agent",
  slug: "amazon-other",
  title: "Amazon other",
  matches: [
    { field: "from", comparison: "ends-with", values: ["amazon.com"] },
    { field: "from", comparison: "is-not", values: ["store-news@amazon.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
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
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
  createdAt: "2026-09-03T17:49:38.152Z",
  updatedAt: "2026-10-27T21:19:16.125Z",
} as const satisfies EmailRuleAgent
