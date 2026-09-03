import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const royalroadMarketing = {
  id: "01a06860-54a2-7ed1-a11d-0ecb41f0a11d",
  pageTypeSlug: "email-rule-code",
  slug: "royalroad-marketing",
  title: "Royalroad marketing",
  matches: [{ field: "from", comparison: "is", values: ["noreply@royalroad.com"] }],
  filing: "archive",
  actions: ["unsubscribe"],
} as const satisfies EmailRuleCode
