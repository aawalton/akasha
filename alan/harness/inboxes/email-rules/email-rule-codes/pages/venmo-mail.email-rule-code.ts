import type { EmailRuleCode } from "../../codes/email-rule-code.page-type.types.ts"

export const venmoMail = {
  id: "01a06860-54a2-7303-bc4f-9ece2661fe11",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
  slug: "venmo-mail",
  title: "Venmo mail",
  matches: [{ field: "from", comparison: "is", values: ["venmo@venmo.com"] }],
  filing: "archive",
} as const satisfies EmailRuleCode
