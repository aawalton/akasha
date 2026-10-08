import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const alansOutboundMail = {
  id: "01a06860-54a1-7d94-a4d0-eab66bcd5920",
  type: "page-type/email-rule-code",
  slug: "alans-outbound-mail",
  title: "Alans outbound mail",
  matches: [
    { field: "from", comparison: "is", values: ["aawalton@gmail.com"] },
    { field: "to", comparison: "does-not-contain", values: ["aawalton@gmail.com"] },
  ],
  filing: "skip",
  createdAt: "2026-09-03T17:45:38.721Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
