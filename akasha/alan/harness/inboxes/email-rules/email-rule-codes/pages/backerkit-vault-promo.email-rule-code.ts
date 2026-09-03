import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const backerkitVaultPromo = {
  id: "01a06860-54a2-76bd-b8b3-dace27c0296e",
  pageTypeSlug: "email-rule-code",
  slug: "backerkit-vault-promo",
  title: "Backerkit vault promo",
  matches: [
    { field: "from", comparison: "ends-with", values: ["backerkit.com"] },
    {
      field: "subject",
      comparison: "contains",
      values: [
        "just launched",
        "now live",
        "launching",
        "live on backerkit",
        "live on vault",
        "new on vault",
        "now funding",
        "now on vault",
        "vault just backed",
        "vault backed",
        "back it now",
        "hours left to back",
        "days left to back",
      ],
    },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
