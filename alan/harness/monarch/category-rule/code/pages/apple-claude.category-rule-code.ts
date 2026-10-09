import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const appleClaude = {
  id: "01a12224-9168-7348-83d9-64a808466cbc",
  type: "page-type/category-rule-code",
  slug: "apple-claude",
  title: "Apple Claude",
  matches: [
    { key: "merchant", comparison: "is", values: ["apple"] },
    { key: "amount", comparison: "is", values: ["-21.49"] },
  ],
  category: "monarch-category/alans-ai-phd",
  overridesMonarch: true,
  createdAt: "2026-10-09T19:29:44.296Z",
  updatedAt: "2026-10-09T19:29:44.296Z",
} as const satisfies CategoryRuleCode
