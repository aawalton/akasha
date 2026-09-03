import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const amazonStoreNews = {
  id: "01a06860-54a2-72ca-8867-f1457e9af4a7",
  pageTypeSlug: "email-rule-code",
  slug: "amazon-store-news",
  title: "Amazon store news",
  matches: [{ field: "from", comparison: "is", values: ["store-news@amazon.com"] }],
  filing: "archive",
} as const satisfies EmailRuleCode
