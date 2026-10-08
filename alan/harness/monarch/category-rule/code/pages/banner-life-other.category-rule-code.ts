import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const bannerLifeOther = {
  id: "01a0655b-fccf-700a-bfb8-3a6b2ca766f3",
  type: "page-type/category-rule-code",
  slug: "banner-life-other",
  title: "Banner life other",
  matches: [
    { key: "merchant", comparison: "is", values: ["banner life"] },
    { key: "sign", comparison: "is", values: ["positive"] },
  ],
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
