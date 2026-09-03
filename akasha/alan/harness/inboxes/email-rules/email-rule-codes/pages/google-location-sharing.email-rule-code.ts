import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const googleLocationSharing = {
  id: "01a06860-54a2-79d8-97f8-7bdf524cc9b8",
  pageTypeSlug: "email-rule-code",
  slug: "google-location-sharing",
  title: "Google location sharing",
  matches: [
    { field: "from", comparison: "is", values: ["noreply-location-sharing@google.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["oak.hills.first.ward.tech"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
