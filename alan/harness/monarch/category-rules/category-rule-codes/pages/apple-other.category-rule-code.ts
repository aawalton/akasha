import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const appleOther = {
  id: "01a0655b-fccf-7009-ad67-36ad2415b608",
  pageTypeSlug: "category-rule-code",
  slug: "apple-other",
  title: "Apple other",
  matches: [
    { key: "merchant", comparison: "is", values: ["apple"] },
    { key: "amount", comparison: "is-not", values: ["-106.36"] },
  ],
} as const satisfies CategoryRuleCode
