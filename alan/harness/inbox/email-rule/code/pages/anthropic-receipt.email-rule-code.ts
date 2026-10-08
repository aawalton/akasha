import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const anthropicReceipt = {
  id: "01a06860-54a2-717c-a258-2e8e779167cd",
  type: "page-type/email-rule-code",
  slug: "anthropic-receipt",
  title: "Anthropic receipt",
  matches: [
    { field: "from", comparison: "ends-with", values: ["mail.anthropic.com"] },
    { field: "subject", comparison: "contains", values: ["your receipt from anthropic"] },
    { field: "subject", comparison: "does-not-contain", values: ["secure link to"] },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
