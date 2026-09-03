import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const primeVideoAdFree = {
  id: "01a0655b-fcd1-7002-b752-1cd4113d2d6b",
  pageTypeSlug: "category-rule-code",
  slug: "prime-video-ad-free",
  title: "Prime video ad free",
  matches: [
    { key: "merchant", comparison: "is", values: ["digital purchase"] },
    { key: "amount", comparison: "is", values: ["-5.36"] },
  ],
  categorySlug: "shopping",
  ruleNote: "Prime Video Ultra subscription",
} as const satisfies CategoryRuleCode
