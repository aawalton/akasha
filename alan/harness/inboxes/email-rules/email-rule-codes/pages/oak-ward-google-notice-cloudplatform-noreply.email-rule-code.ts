import type { EmailRuleCode } from "../../../../../../persons/people/email/rules/codes/email-rule-code.page-type.types.ts"

export const oakWardGoogleNoticeCloudplatformNoreply = {
  id: "01a06860-54a2-734e-b702-ac0d9c338cd3",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
  slug: "oak-ward-google-notice-cloudplatform-noreply",
  title: "Oak ward google notice cloudplatform noreply",
  matches: [
    { field: "from", comparison: "ends-with", values: ["google.com"] },
    { field: "subject", comparison: "contains", values: ["oak.hills.first.ward.tech"] },
    { field: "from", comparison: "is", values: ["cloudplatform-noreply@google.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["transition", "deprecat", "migrat"],
    },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
