import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const googleplayPolicyNotices = {
  id: "01a06860-54a2-748f-bea0-ff635bf33388",
  pageTypeSlug: "email-rule-code",
  slug: "googleplay-policy-notices",
  title: "Googleplay policy notices",
  matches: [
    { field: "from", comparison: "is", values: ["googleplay-noreply@google.com"] },
    {
      field: "subject",
      comparison: "contains",
      values: ["privacy", "policy", "terms", "user agreement", "upcoming changes"],
    },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["your google play order receipt"],
    },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
