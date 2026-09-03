import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const audibleCreditReminder = {
  id: "01a06860-54a2-7a46-a89d-68dc139e48b9",
  pageTypeSlug: "email-rule-code",
  slug: "audible-credit-reminder",
  title: "Audible credit reminder",
  matches: [
    { field: "from", comparison: "is", values: ["do-not-reply@audible.com"] },
    { field: "subject", comparison: "contains", values: ["credit"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
