import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const oakWardGoogleNotice = {
  id: "01a06860-54a2-7528-91b7-a3caaee84031",
  pageTypeSlug: "email-rule-code",
  slug: "oak-ward-google-notice",
  title: "Oak ward google notice",
  matches: [
    { field: "from", comparison: "ends-with", values: ["google.com"] },
    { field: "subject", comparison: "contains", values: ["oak.hills.first.ward.tech"] },
    { field: "from", comparison: "ends-with", values: ["google.com"] },
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
} as const satisfies EmailRuleCode
