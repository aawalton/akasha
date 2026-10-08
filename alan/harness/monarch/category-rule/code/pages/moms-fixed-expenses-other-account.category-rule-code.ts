import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const momsFixedExpensesOtherAccount = {
  id: "01a0655b-fcd0-7024-b4da-60178114cd87",
  type: "page-type/category-rule-code",
  slug: "moms-fixed-expenses-other-account",
  title: "Moms fixed expenses other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["mom's fixed expenses"] },
    { key: "account", comparison: "is-not", values: ["Personal Profile"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
