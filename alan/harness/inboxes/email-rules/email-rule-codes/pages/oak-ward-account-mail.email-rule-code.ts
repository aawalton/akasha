import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const oakWardAccountMail = {
  id: "01a06860-54a2-7647-aa45-3db81337a209",
  pageTypeSlug: "email-rule-code",
  slug: "oak-ward-account-mail",
  title: "Oak ward account mail",
  matches: [{ field: "from", comparison: "ends-with", values: ["oak.hills.first.ward.tech"] }],
  filing: "archive",
} as const satisfies EmailRuleCode
