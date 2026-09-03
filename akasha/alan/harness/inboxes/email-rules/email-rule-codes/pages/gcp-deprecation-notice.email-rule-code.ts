import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const gcpDeprecationNotice = {
  id: "01a06860-54a2-743b-870a-d0cd1ee752cb",
  pageTypeSlug: "email-rule-code",
  slug: "gcp-deprecation-notice",
  title: "Gcp deprecation notice",
  matches: [
    { field: "from", comparison: "is", values: ["cloudplatform-noreply@google.com"] },
    { field: "subject", comparison: "contains", values: ["transition", "deprecat", "migrat"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
