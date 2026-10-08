import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const googleCloud = {
  id: "01a0655b-fcd0-7014-9f0b-5b48e81dbbb0",
  type: "page-type/category-rule-code",
  slug: "google-cloud",
  title: "Google cloud",
  matches: [
    { key: "merchant", comparison: "is", values: ["google cloud"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/alans-spending",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
