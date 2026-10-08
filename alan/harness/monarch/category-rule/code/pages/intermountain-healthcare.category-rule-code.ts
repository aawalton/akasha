import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const intermountainHealthcare = {
  id: "01a0655b-fcd0-701a-8125-91344980cde5",
  type: "page-type/category-rule-code",
  slug: "intermountain-healthcare",
  title: "Intermountain healthcare",
  matches: [
    { key: "merchant", comparison: "is", values: ["intermountain"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/medical",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
