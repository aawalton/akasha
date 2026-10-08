import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const midlandNationalOther = {
  id: "01a0655b-fcd0-7022-9594-d9fc6ce0cf13",
  type: "page-type/category-rule-code",
  slug: "midland-national-other",
  title: "Midland national other",
  matches: [
    { key: "merchant", comparison: "is", values: ["midland national"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
