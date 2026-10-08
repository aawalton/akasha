import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const interestOther = {
  id: "01a0655b-fcd0-7019-b63f-f09c40357e8e",
  type: "page-type/category-rule-code",
  slug: "interest-other",
  title: "Interest other",
  matches: [
    { key: "merchant", comparison: "is", values: ["interest"] },
    { key: "account", comparison: "is-not", values: ["2749"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
