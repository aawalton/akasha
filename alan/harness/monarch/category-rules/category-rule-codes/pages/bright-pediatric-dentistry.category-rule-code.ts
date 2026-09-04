import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const brightPediatricDentistry = {
  id: "01a0655b-fccf-700d-8d34-646f76b24ffc",
  pageTypeSlug: "category-rule-code",
  slug: "bright-pediatric-dentistry",
  title: "Bright pediatric dentistry",
  matches: [
    { key: "merchant", comparison: "is", values: ["bright pediatric dentistry"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "medical",
} as const satisfies CategoryRuleCode
