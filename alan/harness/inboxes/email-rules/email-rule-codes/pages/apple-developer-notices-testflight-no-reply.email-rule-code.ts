import type { EmailRuleCode } from "../../../../../../persons/people/email/rules/codes/email-rule-code.page-type.types.ts"

export const appleDeveloperNoticesTestflightNoReply = {
  id: "01a06860-54a2-70ff-9565-a0c8d958fe8f",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
  slug: "apple-developer-notices-testflight-no-reply",
  title: "Apple developer notices testflight no reply",
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
    { field: "from", comparison: "is", values: ["testflight_no_reply@email.apple.com"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
