import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const royalroadMarketing = {
  id: "01a06860-54a2-7ed1-a11d-0ecb41f0a11d",
  type: "page-type/email-rule-code",
  slug: "royalroad-marketing",
  title: "Royalroad marketing",
  matches: [{ field: "from", comparison: "is", values: ["noreply@royalroad.com"] }],
  filing: "archive",
  actions: ["unsubscribe"],
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
