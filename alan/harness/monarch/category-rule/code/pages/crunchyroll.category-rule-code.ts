import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const crunchyroll = {
  id: "01a0655b-fcd0-700a-9cba-1712b2e2c353",
  type: "page-type/category-rule-code",
  slug: "crunchyroll",
  title: "Crunchyroll",
  matches: [
    { key: "merchant", comparison: "is", values: ["crunchyroll"] },
    { key: "sign", comparison: "is", values: ["negative"] },
    { key: "date", comparison: "on-or-after", values: ["2026-08-08"] },
  ],
  category: "monarch-category/shopping",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
