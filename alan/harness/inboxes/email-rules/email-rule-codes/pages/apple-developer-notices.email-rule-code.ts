import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const appleDeveloperNotices = {
  id: "01a06860-54a2-7e9e-a022-c0af20204aa9",
  pageTypeSlug: "email-rule-code",
  slug: "apple-developer-notices",
  title: "Apple developer notices",
  matches: [
    {
      field: "from",
      comparison: "is",
      values: ["no_reply@email.apple.com", "testflight_no_reply@email.apple.com"],
    },
    {
      field: "subject",
      comparison: "contains",
      values: ["completed processing", "is now available to test"],
    },
    { field: "from", comparison: "is", values: ["no_reply@email.apple.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["your receipt from apple"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
