import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const venmoMail = {
  id: "01a06860-54a2-7303-bc4f-9ece2661fe11",
  type: "page-type/email-rule-code",
  slug: "venmo-mail",
  title: "Venmo mail",
  matches: [{ field: "from", comparison: "is", values: ["venmo@venmo.com"] }],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
