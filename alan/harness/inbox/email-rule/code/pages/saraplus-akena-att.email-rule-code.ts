import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const saraplusAkenaAtt = {
  id: "01a06860-54a2-7a2b-8284-3e37ee4f5fce",
  type: "page-type/email-rule-code",
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
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
