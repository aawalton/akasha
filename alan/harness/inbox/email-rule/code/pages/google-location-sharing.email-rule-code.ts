import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const googleLocationSharing = {
  id: "01a06860-54a2-79d8-97f8-7bdf524cc9b8",
  type: "page-type/email-rule-code",
  slug: "google-location-sharing",
  title: "Google location sharing",
  matches: [
    { field: "from", comparison: "is", values: ["noreply-location-sharing@google.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["oak.hills.first.ward.tech"] },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
