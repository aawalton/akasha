import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const bannerLifePremium = {
  id: "01a0655b-fccf-700b-96eb-38e766f31681",
  type: "page-type/category-rule-code",
  slug: "banner-life-premium",
  title: "Banner life premium",
  matches: [
    { key: "merchant", comparison: "is", values: ["banner life"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/financial",
} as const satisfies CategoryRuleCode
