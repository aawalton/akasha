import type { EmailRuleCode } from "akasha/alan/harness/inboxes/email-rules/codes/email-rule-code.page-type.types.ts"

export const attAkenaMisdirect = {
  id: "01a06860-54a2-71bc-bd5d-a31796f3c32e",
  type: "email-rule-code",
  slug: "att-akena-misdirect",
  title: "Att akena misdirect",
  matches: [{ field: "from", comparison: "ends-with", values: ["att-mail.com"] }],
  filing: "archive",
} as const satisfies EmailRuleCode
