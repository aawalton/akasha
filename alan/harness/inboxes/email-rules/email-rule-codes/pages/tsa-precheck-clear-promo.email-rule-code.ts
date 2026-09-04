import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const tsaPrecheckClearPromo = {
  id: "01a06860-54a2-726f-a1c8-605e69131e95",
  pageTypeSlug: "email-rule-code",
  slug: "tsa-precheck-clear-promo",
  title: "Tsa precheck clear promo",
  matches: [
    { field: "from", comparison: "is", values: ["donotreply@tsa.dhs.gov"] },
    { field: "subject", comparison: "contains", values: ["survey", "feedback", "by clear"] },
  ],
  filing: "archive",
  actions: ["unsubscribe"],
} as const satisfies EmailRuleCode
