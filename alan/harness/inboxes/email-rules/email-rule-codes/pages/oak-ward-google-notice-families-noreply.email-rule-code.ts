import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const oakWardGoogleNoticeFamiliesNoreply = {
  id: "01a06860-54a2-7916-9f27-ec7686128131",
  pageTypeSlug: "email-rule-code",
  slug: "oak-ward-google-notice-families-noreply",
  title: "Oak ward google notice families noreply",
  matches: [
    { field: "from", comparison: "ends-with", values: ["google.com"] },
    { field: "subject", comparison: "contains", values: ["oak.hills.first.ward.tech"] },
    { field: "from", comparison: "is", values: ["families-noreply@google.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["activity", "weekly report", "weekly summary"],
    },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
