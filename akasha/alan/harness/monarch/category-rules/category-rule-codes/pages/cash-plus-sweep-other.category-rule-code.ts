import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const cashPlusSweepOther = {
  id: "01a0655b-fccf-7013-9625-3c4c1fc6db75",
  pageTypeSlug: "category-rule-code",
  slug: "cash-plus-sweep-other",
  title: "Cash plus sweep other",
  matches: [
    { key: "merchant", comparison: "is", values: ["cash plus sweep"] },
    { key: "account", comparison: "is-not", values: ["2749"] },
  ],
} as const satisfies CategoryRuleCode
