import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const jiffyLube = {
  id: "01a0655b-fcd0-701e-9713-4e00a8b1ba31",
  type: "page-type/category-rule-code",
  slug: "jiffy-lube",
  title: "Jiffy lube",
  matches: [
    { key: "merchant", comparison: "is", values: ["jiffy lube"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/transportation",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
