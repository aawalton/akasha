import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const unrecognizedMerchant = {
  id: "01a0655b-fcda-7009-bc2a-26e3f6789b20",
  pageTypeSlug: "category-rule-code",
  slug: "unrecognized-merchant",
  title: "Unrecognized merchant",
  matches: [{ key: "merchant", comparison: "is", values: ["unrecognized"] }],
} as const satisfies CategoryRuleCode
