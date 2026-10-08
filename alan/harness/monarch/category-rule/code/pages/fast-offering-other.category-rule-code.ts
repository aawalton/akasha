import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const fastOfferingOther = {
  id: "01a0655b-fcd0-7011-af9e-54ad987ae522",
  type: "page-type/category-rule-code",
  slug: "fast-offering-other",
  title: "Fast offering other",
  matches: [
    { key: "merchant", comparison: "is", values: ["fast offering"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
