import type { EmailRuleCode } from "akasha/alan/harness/inboxes/email-rules/codes/email-rule-code.page-type.types.ts"

export const googleplayPolicyNotices = {
  id: "01a06860-54a2-748f-bea0-ff635bf33388",
  type: "email-rule-code",
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
