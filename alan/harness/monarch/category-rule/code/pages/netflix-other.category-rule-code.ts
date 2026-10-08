import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const netflixOther = {
  id: "01a0655b-fcd0-7027-8cda-6c4e878677fd",
  type: "page-type/category-rule-code",
  slug: "netflix-other",
  title: "Netflix other",
  matches: [
    { key: "merchant", comparison: "is", values: ["netflix"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
