import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const oakWardGoogleNoticeNoreplyDmarcSupport = {
  id: "01a06860-54a2-7a94-8b16-96e8c60dbecd",
  type: "page-type/email-rule-code",
  slug: "oak-ward-google-notice-noreply-dmarc-support",
  title: "Oak ward google notice noreply dmarc support",
  matches: [
    { field: "from", comparison: "ends-with", values: ["google.com"] },
    { field: "subject", comparison: "contains", values: ["oak.hills.first.ward.tech"] },
    { field: "from", comparison: "is", values: ["noreply-dmarc-support@google.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["report domain"] },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
