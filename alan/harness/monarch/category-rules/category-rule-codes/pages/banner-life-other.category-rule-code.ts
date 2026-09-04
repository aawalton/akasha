import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const bannerLifeOther = {
  id: "01a0655b-fccf-700a-bfb8-3a6b2ca766f3",
  pageTypeSlug: "category-rule-code",
  slug: "banner-life-other",
  title: "Banner life other",
  matches: [
    { key: "merchant", comparison: "is", values: ["banner life"] },
    { key: "sign", comparison: "is", values: ["positive"] },
  ],
} as const satisfies CategoryRuleCode
