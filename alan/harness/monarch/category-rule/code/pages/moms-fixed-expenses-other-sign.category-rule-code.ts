import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const momsFixedExpensesOtherSign = {
  id: "01a0655b-fcd0-7025-9a01-569a778d72f4",
  type: "page-type/category-rule-code",
  slug: "moms-fixed-expenses-other-sign",
  title: "Moms fixed expenses other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["mom's fixed expenses"] },
    { key: "account", comparison: "is", values: ["Personal Profile"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
