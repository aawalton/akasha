import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const oakWardGoogleNoticeGoogleplayNoreply = {
  id: "01a06860-54a2-7bb6-8f89-369136e62ec4",
  pageTypeSlug: "email-rule-code",
  slug: "oak-ward-google-notice-googleplay-noreply",
  title: "Oak ward google notice googleplay noreply",
  matches: [
    { field: "from", comparison: "ends-with", values: ["google.com"] },
    { field: "subject", comparison: "contains", values: ["oak.hills.first.ward.tech"] },
    { field: "from", comparison: "is", values: ["googleplay-noreply@google.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: [
        "your google play order receipt",
        "privacy",
        "policy",
        "terms",
        "user agreement",
        "upcoming changes",
      ],
    },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
