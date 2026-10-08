import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const edgemontAutoService = {
  id: "01a0655b-fcd0-7010-81cb-5ba1dd5c5529",
  type: "page-type/category-rule-code",
  slug: "edgemont-auto-service",
  title: "Edgemont auto service",
  matches: [
    { key: "merchant", comparison: "is", values: ["edgemont auto"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/transportation",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
