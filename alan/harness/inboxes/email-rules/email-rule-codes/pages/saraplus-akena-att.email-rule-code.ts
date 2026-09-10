import type { EmailRuleCode } from "../../codes/email-rule-code.page-type.types.ts"

export const saraplusAkenaAtt = {
  id: "01a06860-54a2-7a2b-8284-3e37ee4f5fce",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
  slug: "saraplus-akena-att",
  title: "Saraplus akena att",
  matches: [
    { field: "from", comparison: "ends-with", values: ["saraplus.com"] },
    {
      field: "subject",
      comparison: "contains",
      values: ["at&t order", "order summary", "order confirmation", "your order", "recent order"],
    },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
