import type { EmailRuleCode } from "../../../../../../persons/people/email/rules/codes/email-rule-code.page-type.types.ts"

export const alansOutboundMail = {
  id: "01a06860-54a1-7d94-a4d0-eab66bcd5920",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
  slug: "alans-outbound-mail",
  title: "Alans outbound mail",
  matches: [
    { field: "from", comparison: "is", values: ["aawalton@gmail.com"] },
    { field: "to", comparison: "does-not-contain", values: ["aawalton@gmail.com"] },
  ],
  filing: "skip",
} as const satisfies EmailRuleCode
