import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const provoCityUtilities = {
  id: "01a0655b-fcd1-7004-a02e-4d9dbf9536d8",
  pageTypeSlug: "category-rule-code",
  slug: "provo-city-utilities",
  title: "Provo city utilities",
  matches: [
    { key: "merchant", comparison: "is", values: ["provo city utilities"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "utilities",
} as const satisfies CategoryRuleCode
