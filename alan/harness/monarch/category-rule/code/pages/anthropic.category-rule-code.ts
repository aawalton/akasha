import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const anthropic = {
  id: "01a0655b-fccf-7007-9674-c7560dd74719",
  type: "page-type/category-rule-code",
  slug: "anthropic",
  title: "Anthropic",
  matches: [
    { key: "merchant", comparison: "is", values: ["anthropic"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/alans-ai-phd",
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-26T15:01:53.000Z",
} as const satisfies CategoryRuleCode
