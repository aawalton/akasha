import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const paramountPlus = {
  id: "01a0655b-fcd1-7001-91a9-425848dd9140",
  pageTypeSlug: "category-rule-code",
  slug: "paramount-plus",
  title: "Paramount plus",
  matches: [
    { key: "merchant", comparison: "is", values: ["paramount plus"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "shopping",
} as const satisfies CategoryRuleCode
