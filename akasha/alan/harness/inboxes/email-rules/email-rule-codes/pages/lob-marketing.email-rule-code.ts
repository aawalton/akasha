import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const lobMarketing = {
  id: "01a06860-54a2-7978-b9e4-3c0b5fc93368",
  pageTypeSlug: "email-rule-code",
  slug: "lob-marketing",
  title: "Lob marketing",
  matches: [{ field: "from", comparison: "is", values: ["hey@lob.com"] }],
  filing: "archive",
  actions: ["unsubscribe"],
} as const satisfies EmailRuleCode
