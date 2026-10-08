import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const amazonStoreNews = {
  id: "01a06860-54a2-72ca-8867-f1457e9af4a7",
  type: "page-type/email-rule-code",
  slug: "amazon-store-news",
  title: "Amazon store news",
  matches: [{ field: "from", comparison: "is", values: ["store-news@amazon.com"] }],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
