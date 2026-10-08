import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const xkcdComic = {
  id: "01a06860-54a2-7eec-8732-4dd95d2b7eb1",
  type: "page-type/email-rule-code",
  slug: "xkcd-comic",
  title: "Xkcd comic",
  matches: [{ field: "from", comparison: "ends-with", values: ["mailing.xkcd.com"] }],
  filing: "skip",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
