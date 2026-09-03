import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const churchChildrensProgramsNoreplyFinance = {
  id: "01a06860-54a2-727d-89c0-f3f602a0576e",
  pageTypeSlug: "email-rule-code",
  slug: "church-childrens-programs-noreply-finance",
  title: "Church childrens programs noreply finance",
  matches: [
    { field: "from", comparison: "ends-with", values: ["churchofjesuschrist.org"] },
    {
      field: "subject",
      comparison: "contains",
      values: ["youth", "young women", "young men", "yw ", "ym ", "primary"],
    },
    { field: "from", comparison: "is", values: ["noreply-finance@mail.churchofjesuschrist.org"] },
    { field: "subject", comparison: "does-not-contain", values: ["statement"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
