import type { EmailRuleCode } from "../../../../../../persons/people/email/rules/codes/email-rule-code.page-type.types.ts"

export const churchChildrensPrograms = {
  id: "01a06860-54a2-7f9b-a814-0a6d99e01ae1",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
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
} as const satisfies EmailRuleCode
