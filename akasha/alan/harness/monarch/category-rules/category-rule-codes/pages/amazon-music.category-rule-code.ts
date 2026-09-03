import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const amazonMusic = {
  id: "01a0655b-fccf-7001-8bf8-3789babaeee5",
  pageTypeSlug: "category-rule-code",
  slug: "amazon-music",
  title: "Amazon music",
  matches: [
    { key: "merchant", comparison: "is", values: ["digital purchase"] },
    { key: "amount", comparison: "is", values: ["-18.26"] },
  ],
  categorySlug: "shopping",
  ruleNote: "Amazon Music subscription",
} as const satisfies CategoryRuleCode
