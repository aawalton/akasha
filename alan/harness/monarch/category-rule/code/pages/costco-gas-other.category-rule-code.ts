import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const costcoGasOther = {
  id: "01a0655b-fcd0-7005-9de7-63c3f6746f91",
  type: "page-type/category-rule-code",
  slug: "costco-gas-other",
  title: "Costco gas other",
  matches: [
    { key: "merchant", comparison: "is", values: ["costco gas"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
