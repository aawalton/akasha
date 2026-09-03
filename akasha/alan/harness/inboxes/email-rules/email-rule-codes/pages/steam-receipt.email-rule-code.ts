import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const steamReceipt = {
  id: "01a06860-54a2-73cf-8ef9-1e19d7e02de7",
  pageTypeSlug: "email-rule-code",
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
  forwardToSlug: "jenny",
} as const satisfies EmailRuleCode
