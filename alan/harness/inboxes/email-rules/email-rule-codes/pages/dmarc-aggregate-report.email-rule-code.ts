import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const dmarcAggregateReport = {
  id: "01a06860-54a2-75dd-8a60-688dd2cc3423",
  pageTypeSlug: "email-rule-code",
  slug: "dmarc-aggregate-report",
  title: "Dmarc aggregate report",
  matches: [
    { field: "from", comparison: "is", values: ["noreply-dmarc-support@google.com"] },
    { field: "subject", comparison: "contains", values: ["report domain"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
