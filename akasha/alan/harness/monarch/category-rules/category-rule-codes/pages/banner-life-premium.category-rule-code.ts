import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const bannerLifePremium = {
  id: "01a0655b-fccf-700b-96eb-38e766f31681",
  pageTypeSlug: "category-rule-code",
  slug: "banner-life-premium",
  title: "Banner life premium",
  matches: [
    { key: "merchant", comparison: "is", values: ["banner life"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "financial",
} as const satisfies CategoryRuleCode
