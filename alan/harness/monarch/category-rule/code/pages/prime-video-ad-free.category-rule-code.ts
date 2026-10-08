import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const primeVideoAdFree = {
  id: "01a0655b-fcd1-7002-b752-1cd4113d2d6b",
  type: "page-type/category-rule-code",
  slug: "prime-video-ad-free",
  title: "Prime video ad free",
  matches: [
    { key: "merchant", comparison: "is", values: ["digital purchase"] },
    { key: "amount", comparison: "is", values: ["-5.36"] },
  ],
  category: "monarch-category/shopping",
  ruleNote: "Prime Video Ultra subscription",
  createdAt: "2026-09-03T03:42:02.449Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
