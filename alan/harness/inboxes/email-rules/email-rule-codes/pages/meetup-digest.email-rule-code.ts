import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const meetupDigest = {
  id: "01a06860-54a2-7b18-b5ac-3b2fc978b9f4",
  pageTypeSlug: "email-rule-code",
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
} as const satisfies EmailRuleCode
