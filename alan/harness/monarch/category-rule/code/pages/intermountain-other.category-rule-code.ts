import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const intermountainOther = {
  id: "01a0655b-fcd0-701b-9ce1-3fac867208e8",
  type: "page-type/category-rule-code",
  slug: "intermountain-other",
  title: "Intermountain other",
  matches: [
    { key: "merchant", comparison: "is", values: ["intermountain"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
