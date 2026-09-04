import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const icloudStorageNotices = {
  id: "01a06860-54a2-723d-8c07-d50e3fd53a55",
  pageTypeSlug: "email-rule-code",
  slug: "icloud-storage-notices",
  title: "Icloud storage notices",
  matches: [
    { field: "from", comparison: "is", values: ["noreply@email.apple.com"] },
    { field: "subject", comparison: "contains", values: ["icloud storage"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
