import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const familyLinkActivity = {
  id: "01a06860-54a2-759a-92a2-93192deed6ad",
  type: "page-type/email-rule-code",
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
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
