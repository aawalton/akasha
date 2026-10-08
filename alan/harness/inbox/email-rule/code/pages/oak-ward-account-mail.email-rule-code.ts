import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const oakWardAccountMail = {
  id: "01a06860-54a2-7647-aa45-3db81337a209",
  type: "page-type/email-rule-code",
  slug: "oak-ward-account-mail",
  title: "Oak ward account mail",
  matches: [{ field: "from", comparison: "ends-with", values: ["oak.hills.first.ward.tech"] }],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
