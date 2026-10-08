import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const vendorPolicyNotices = {
  id: "01a06860-54a2-7313-ae40-6920a01f9a87",
  type: "page-type/email-rule-code",
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
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
