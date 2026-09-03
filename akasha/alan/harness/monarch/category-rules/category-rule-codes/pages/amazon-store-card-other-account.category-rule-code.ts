import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const amazonStoreCardOtherAccount = {
  id: "01a0655b-fccf-7002-ae00-6f6b69d269ee",
  pageTypeSlug: "category-rule-code",
  slug: "amazon-store-card-other-account",
  title: "Amazon store card other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["amazon store card"] },
    { key: "account", comparison: "is-not", values: ["6952"] },
  ],
} as const satisfies CategoryRuleCode
