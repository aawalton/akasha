import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const anthropicLoginLinks = {
  id: "01a06860-54a2-7e2e-9af9-a45a3d24e5a1",
  pageTypeSlug: "email-rule-code",
  slug: "anthropic-login-links",
  title: "Anthropic login links",
  matches: [
    { field: "from", comparison: "ends-with", values: ["mail.anthropic.com"] },
    { field: "subject", comparison: "contains", values: ["secure link to"] },
  ],
  filing: "archive",
  delay: "15m",
} as const satisfies EmailRuleCode
