import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const cashPlusSweep = {
  id: "01a0655b-fccf-7014-bdf3-198339e8db63",
  pageTypeSlug: "category-rule-code",
  slug: "cash-plus-sweep",
  title: "Cash plus sweep",
  matches: [
    { key: "merchant", comparison: "is", values: ["cash plus sweep"] },
    { key: "account", comparison: "is", values: ["2749"] },
  ],
  categorySlug: "transfer",
} as const satisfies CategoryRuleCode
