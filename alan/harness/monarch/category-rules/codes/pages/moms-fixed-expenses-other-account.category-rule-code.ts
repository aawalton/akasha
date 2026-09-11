import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const momsFixedExpensesOtherAccount = {
  id: "01a0655b-fcd0-7024-b4da-60178114cd87",
  type: "category-rule-code",
  slug: "moms-fixed-expenses-other-account",
  title: "Moms fixed expenses other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["mom's fixed expenses"] },
    { key: "account", comparison: "is-not", values: ["Personal Profile"] },
  ],
} as const satisfies CategoryRuleCode
