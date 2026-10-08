import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const meetupDigest = {
  id: "01a06860-54a2-7b18-b5ac-3b2fc978b9f4",
  type: "page-type/email-rule-code",
  slug: "meetup-digest",
  title: "Meetup digest",
  matches: [
    { field: "from", comparison: "is", values: ["info@meetup.com"] },
    {
      field: "subject",
      comparison: "contains",
      values: ["suggestions", "this week", "recommended", "groups for you", "groups near you"],
    },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
