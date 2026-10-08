import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const amyMail = {
  id: "01a06860-54a2-75d5-93c3-200f439f4722",
  type: "page-type/email-rule-code",
  slug: "amy-mail",
  title: "Amy mail",
  matches: [{ field: "from", comparison: "is", values: ["amy@alanwalton.com"] }],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
