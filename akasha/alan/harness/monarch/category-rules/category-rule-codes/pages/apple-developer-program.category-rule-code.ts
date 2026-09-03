import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const appleDeveloperProgram = {
  id: "01a0655b-fccf-7008-ab16-645cc6b24302",
  pageTypeSlug: "category-rule-code",
  slug: "apple-developer-program",
  title: "Apple developer program",
  matches: [
    { key: "merchant", comparison: "is", values: ["apple"] },
    { key: "amount", comparison: "is", values: ["-106.36"] },
  ],
  categorySlug: "alans-spending",
  ruleNote: "Apple Developer Program annual membership",
} as const satisfies CategoryRuleCode
