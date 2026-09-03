import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const costcoGasOther = {
  id: "01a0655b-fcd0-7005-9de7-63c3f6746f91",
  pageTypeSlug: "category-rule-code",
  slug: "costco-gas-other",
  title: "Costco gas other",
  matches: [
    { key: "merchant", comparison: "is", values: ["costco gas"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
