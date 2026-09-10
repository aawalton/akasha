import type { EmailRuleCode } from "../email-rule-code.page-type.types.ts"

export const appleReceipt = {
  id: "01a06860-54a2-743b-8fad-54f58e5a38a8",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
  slug: "apple-receipt",
  title: "Apple receipt",
  matches: [
    { field: "from", comparison: "is", values: ["no_reply@email.apple.com"] },
    { field: "subject", comparison: "contains", values: ["your receipt from apple"] },
  ],
  filing: "archive",
  forwardTo: "jenny",
} as const satisfies EmailRuleCode
