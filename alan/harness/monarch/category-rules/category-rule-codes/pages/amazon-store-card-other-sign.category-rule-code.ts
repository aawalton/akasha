import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const amazonStoreCardOtherSign = {
  id: "01a0655b-fccf-7003-8065-370d746d4e19",
  pageTypeSlug: "category-rule-code",
  slug: "amazon-store-card-other-sign",
  title: "Amazon store card other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["amazon store card"] },
    { key: "account", comparison: "is", values: ["6952"] },
    { key: "sign", comparison: "is-not", values: ["positive"] },
  ],
} as const satisfies CategoryRuleCode
