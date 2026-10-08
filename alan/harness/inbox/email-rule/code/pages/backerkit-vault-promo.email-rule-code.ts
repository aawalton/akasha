import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const backerkitVaultPromo = {
  id: "01a06860-54a2-76bd-b8b3-dace27c0296e",
  type: "page-type/email-rule-code",
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
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
