import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const audibleCreditReminder = {
  id: "01a06860-54a2-7a46-a89d-68dc139e48b9",
  type: "page-type/email-rule-code",
  slug: "audible-credit-reminder",
  title: "Audible credit reminder",
  matches: [
    { field: "from", comparison: "is", values: ["do-not-reply@audible.com"] },
    { field: "subject", comparison: "contains", values: ["credit"] },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
