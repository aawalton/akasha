import type { EmailRuleCode } from "../email-rule-code.page-type.types.ts"

export const audibleCreditReminder = {
  id: "01a06860-54a2-7a46-a89d-68dc139e48b9",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
  slug: "audible-credit-reminder",
  title: "Audible credit reminder",
  matches: [
    { field: "from", comparison: "is", values: ["do-not-reply@audible.com"] },
    { field: "subject", comparison: "contains", values: ["credit"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
