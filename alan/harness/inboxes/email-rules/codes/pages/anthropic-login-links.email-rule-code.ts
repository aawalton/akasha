import type { EmailRuleCode } from "akasha/alan/harness/inboxes/email-rules/codes/email-rule-code.page-type.types.ts"

export const anthropicLoginLinks = {
  id: "01a06860-54a2-7e2e-9af9-a45a3d24e5a1",
  type: "email-rule-code",
  slug: "anthropic-login-links",
  title: "Anthropic login links",
  matches: [
    { field: "from", comparison: "ends-with", values: ["mail.anthropic.com"] },
    { field: "subject", comparison: "contains", values: ["secure link to"] },
  ],
  filing: "archive",
  delay: "15m",
} as const satisfies EmailRuleCode
