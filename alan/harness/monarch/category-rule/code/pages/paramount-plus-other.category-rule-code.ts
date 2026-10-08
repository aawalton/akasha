import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const paramountPlusOther = {
  id: "01a0655b-fcd1-7000-a523-8d664f524671",
  type: "page-type/category-rule-code",
  slug: "paramount-plus-other",
  title: "Paramount plus other",
  matches: [
    { key: "merchant", comparison: "is", values: ["paramount plus"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.449Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
