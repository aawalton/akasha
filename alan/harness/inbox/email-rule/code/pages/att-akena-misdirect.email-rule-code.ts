import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const attAkenaMisdirect = {
  id: "01a06860-54a2-71bc-bd5d-a31796f3c32e",
  type: "page-type/email-rule-code",
  slug: "att-akena-misdirect",
  title: "Att akena misdirect",
  matches: [{ field: "from", comparison: "ends-with", values: ["att-mail.com"] }],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
