import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const anthropicLoginLinks = {
  id: "01a06860-54a2-7e2e-9af9-a45a3d24e5a1",
  type: "page-type/email-rule-code",
  slug: "anthropic-login-links",
  title: "Anthropic login links",
  matches: [
    { field: "from", comparison: "ends-with", values: ["mail.anthropic.com"] },
    { field: "subject", comparison: "contains", values: ["secure link to"] },
  ],
  filing: "archive",
  delay: "15m",
  rescueFromSpam: true,
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-10-08T16:23:01.916Z",
} as const satisfies EmailRuleCode
