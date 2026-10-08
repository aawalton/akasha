import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const lobMarketing = {
  id: "01a06860-54a2-7978-b9e4-3c0b5fc93368",
  type: "page-type/email-rule-code",
  slug: "lob-marketing",
  title: "Lob marketing",
  matches: [{ field: "from", comparison: "is", values: ["hey@lob.com"] }],
  filing: "archive",
  actions: ["unsubscribe"],
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
