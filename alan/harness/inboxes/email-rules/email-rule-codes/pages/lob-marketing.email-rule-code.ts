import type { EmailRuleCode } from "../../../../../../persons/people/email/rules/codes/email-rule-code.page-type.types.ts"

export const lobMarketing = {
  id: "01a06860-54a2-7978-b9e4-3c0b5fc93368",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
  slug: "lob-marketing",
  title: "Lob marketing",
  matches: [{ field: "from", comparison: "is", values: ["hey@lob.com"] }],
  filing: "archive",
  actions: ["unsubscribe"],
} as const satisfies EmailRuleCode
