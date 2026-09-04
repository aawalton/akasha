import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const venmoMail = {
  id: "01a06860-54a2-7303-bc4f-9ece2661fe11",
  pageTypeSlug: "email-rule-code",
  slug: "venmo-mail",
  title: "Venmo mail",
  matches: [{ field: "from", comparison: "is", values: ["venmo@venmo.com"] }],
  filing: "archive",
} as const satisfies EmailRuleCode
