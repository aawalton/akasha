import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const intermountainOther = {
  id: "01a0655b-fcd0-701b-9ce1-3fac867208e8",
  pageTypeSlug: "category-rule-code",
  slug: "intermountain-other",
  title: "Intermountain other",
  matches: [
    { key: "merchant", comparison: "is", values: ["intermountain"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
