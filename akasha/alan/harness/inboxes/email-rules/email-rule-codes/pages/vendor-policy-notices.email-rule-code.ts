import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const vendorPolicyNotices = {
  id: "01a06860-54a2-7313-ae40-6920a01f9a87",
  pageTypeSlug: "email-rule-code",
  slug: "vendor-policy-notices",
  title: "Vendor policy notices",
  matches: [
    { field: "from", comparison: "ends-with", values: ["render.com"] },
    {
      field: "subject",
      comparison: "contains",
      values: ["privacy", "policy", "terms", "user agreement", "upcoming changes"],
    },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
