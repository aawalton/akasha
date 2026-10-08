import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const icloudStorageNotices = {
  id: "01a06860-54a2-723d-8c07-d50e3fd53a55",
  type: "page-type/email-rule-code",
  slug: "icloud-storage-notices",
  title: "Icloud storage notices",
  matches: [
    { field: "from", comparison: "is", values: ["noreply@email.apple.com"] },
    { field: "subject", comparison: "contains", values: ["icloud storage"] },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
