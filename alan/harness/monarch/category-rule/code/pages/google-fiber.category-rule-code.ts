import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const googleFiber = {
  id: "01a0655b-fcd0-7016-a872-c983e8fc6fc2",
  type: "page-type/category-rule-code",
  slug: "google-fiber",
  title: "Google fiber",
  matches: [
    { key: "merchant", comparison: "is", values: ["google fiber"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/utilities",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
