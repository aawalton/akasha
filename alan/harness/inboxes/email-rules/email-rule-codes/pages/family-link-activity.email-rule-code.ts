import type { EmailRuleCode } from "../../../../../../persons/people/email/rules/codes/email-rule-code.page-type.types.ts"

export const familyLinkActivity = {
  id: "01a06860-54a2-759a-92a2-93192deed6ad",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
  slug: "family-link-activity",
  title: "Family link activity",
  matches: [
    { field: "from", comparison: "is", values: ["families-noreply@google.com"] },
    {
      field: "subject",
      comparison: "contains",
      values: ["activity", "weekly report", "weekly summary"],
    },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
