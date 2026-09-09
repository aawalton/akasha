import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const paramountPlusOther = {
  id: "01a0655b-fcd1-7000-a523-8d664f524671",
  pageTypeSlug: "category-rule-code",
  slug: "paramount-plus-other",
  title: "Paramount plus other",
  matches: [
    { key: "merchant", comparison: "is", values: ["paramount plus"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
