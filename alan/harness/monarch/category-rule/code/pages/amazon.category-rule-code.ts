import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const amazon = {
  id: "01a0655b-fccf-7005-93dd-b35019f20d8c",
  type: "page-type/category-rule-code",
  slug: "amazon",
  title: "Amazon",
  matches: [{ key: "merchant", comparison: "is", values: ["amazon"] }],
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
