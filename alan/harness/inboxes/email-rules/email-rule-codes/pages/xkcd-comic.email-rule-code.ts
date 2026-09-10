import type { EmailRuleCode } from "../../../../../../persons/people/email/rules/codes/email-rule-code.page-type.types.ts"

export const xkcdComic = {
  id: "01a06860-54a2-7eec-8732-4dd95d2b7eb1",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
  slug: "xkcd-comic",
  title: "Xkcd comic",
  matches: [{ field: "from", comparison: "ends-with", values: ["mailing.xkcd.com"] }],
  filing: "skip",
} as const satisfies EmailRuleCode
