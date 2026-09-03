import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const anthropicReceipt = {
  id: "01a06860-54a2-717c-a258-2e8e779167cd",
  pageTypeSlug: "email-rule-code",
  slug: "anthropic-receipt",
  title: "Anthropic receipt",
  matches: [
    { field: "from", comparison: "ends-with", values: ["mail.anthropic.com"] },
    { field: "subject", comparison: "contains", values: ["your receipt from anthropic"] },
    { field: "subject", comparison: "does-not-contain", values: ["secure link to"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
