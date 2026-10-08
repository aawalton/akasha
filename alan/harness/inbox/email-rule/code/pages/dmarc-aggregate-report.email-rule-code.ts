import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const dmarcAggregateReport = {
  id: "01a06860-54a2-75dd-8a60-688dd2cc3423",
  type: "page-type/email-rule-code",
  slug: "dmarc-aggregate-report",
  title: "Dmarc aggregate report",
  matches: [
    { field: "from", comparison: "is", values: ["noreply-dmarc-support@google.com"] },
    { field: "subject", comparison: "contains", values: ["report domain"] },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
