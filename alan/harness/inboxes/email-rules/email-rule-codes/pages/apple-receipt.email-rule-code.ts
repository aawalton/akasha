import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const appleReceipt = {
  id: "01a06860-54a2-743b-8fad-54f58e5a38a8",
  pageTypeSlug: "email-rule-code",
  slug: "apple-receipt",
  title: "Apple receipt",
  matches: [
    { field: "from", comparison: "is", values: ["no_reply@email.apple.com"] },
    { field: "subject", comparison: "contains", values: ["your receipt from apple"] },
  ],
  filing: "archive",
  forwardToSlug: "jenny",
} as const satisfies EmailRuleCode
