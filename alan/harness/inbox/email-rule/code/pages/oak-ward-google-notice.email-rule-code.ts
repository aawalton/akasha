import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const oakWardGoogleNotice = {
  id: "01a06860-54a2-7528-91b7-a3caaee84031",
  type: "page-type/email-rule-code",
  slug: "oak-ward-google-notice",
  title: "Oak ward google notice",
  matches: [
    { field: "from", comparison: "ends-with", values: ["google.com"] },
    { field: "subject", comparison: "contains", values: ["oak.hills.first.ward.tech"] },
    {
      field: "from",
      comparison: "is-not",
      values: [
        "googleplay-noreply@google.com",
        "payments-noreply@google.com",
        "cloudplatform-noreply@google.com",
        "noreply-dmarc-support@google.com",
        "families-noreply@google.com",
      ],
    },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
