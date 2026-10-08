import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const steamReceipt = {
  id: "01a06860-54a2-73cf-8ef9-1e19d7e02de7",
  type: "page-type/email-rule-code",
  slug: "steam-receipt",
  title: "Steam receipt",
  matches: [
    { field: "from", comparison: "ends-with", values: ["steampowered.com"] },
    {
      field: "subject",
      comparison: "contains",
      values: ["thank you for your purchase", "purchase receipt"],
    },
  ],
  filing: "archive",
  forwardTo: "person/jenny",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
