import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const edgemontAutoOther = {
  id: "01a0655b-fcd0-700f-b1a8-210d547ac9e7",
  type: "page-type/category-rule-code",
  slug: "edgemont-auto-other",
  title: "Edgemont auto other",
  matches: [
    { key: "merchant", comparison: "is", values: ["edgemont auto"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
