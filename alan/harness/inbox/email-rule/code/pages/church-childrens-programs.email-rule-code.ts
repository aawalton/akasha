import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const churchChildrensPrograms = {
  id: "01a06860-54a2-7f9b-a814-0a6d99e01ae1",
  type: "page-type/email-rule-code",
  slug: "church-childrens-programs",
  title: "Church childrens programs",
  matches: [
    { field: "from", comparison: "ends-with", values: ["churchofjesuschrist.org"] },
    {
      field: "subject",
      comparison: "contains",
      values: ["youth", "young women", "young men", "yw ", "ym ", "primary"],
    },
    {
      field: "from",
      comparison: "is-not",
      values: ["noreply-finance@mail.churchofjesuschrist.org"],
    },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
