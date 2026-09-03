import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const oakWardGoogleNoticeNoreplyDmarcSupport = {
  id: "01a06860-54a2-7a94-8b16-96e8c60dbecd",
  pageTypeSlug: "email-rule-code",
  slug: "oak-ward-google-notice-noreply-dmarc-support",
  title: "Oak ward google notice noreply dmarc support",
  matches: [
    { field: "from", comparison: "ends-with", values: ["google.com"] },
    { field: "subject", comparison: "contains", values: ["oak.hills.first.ward.tech"] },
    { field: "from", comparison: "is", values: ["noreply-dmarc-support@google.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["report domain"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
