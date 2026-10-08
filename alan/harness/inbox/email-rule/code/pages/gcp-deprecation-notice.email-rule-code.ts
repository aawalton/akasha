import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const gcpDeprecationNotice = {
  id: "01a06860-54a2-743b-870a-d0cd1ee752cb",
  type: "page-type/email-rule-code",
  slug: "gcp-deprecation-notice",
  title: "Gcp deprecation notice",
  matches: [
    { field: "from", comparison: "is", values: ["cloudplatform-noreply@google.com"] },
    { field: "subject", comparison: "contains", values: ["transition", "deprecat", "migrat"] },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
