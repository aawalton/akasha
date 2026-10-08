import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const tsaPrecheckClearPromo = {
  id: "01a06860-54a2-726f-a1c8-605e69131e95",
  type: "page-type/email-rule-code",
  slug: "tsa-precheck-clear-promo",
  title: "Tsa precheck clear promo",
  matches: [
    { field: "from", comparison: "is", values: ["donotreply@tsa.dhs.gov"] },
    { field: "subject", comparison: "contains", values: ["survey", "feedback", "by clear"] },
  ],
  filing: "archive",
  actions: ["unsubscribe"],
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
