import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const digitalPurchaseOther = {
  id: "01a0655b-fcd0-700b-bdc4-d301652a3037",
  type: "page-type/category-rule-code",
  slug: "digital-purchase-other",
  title: "Digital purchase other",
  matches: [
    { key: "merchant", comparison: "is", values: ["digital purchase"] },
    { key: "amount", comparison: "is-not", values: ["-18.26", "-12.88", "-5.36"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
