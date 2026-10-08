import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const unrecognizedMerchant = {
  id: "01a0655b-fcda-7009-bc2a-26e3f6789b20",
  type: "page-type/category-rule-code",
  slug: "unrecognized-merchant",
  title: "Unrecognized merchant",
  matches: [{ key: "merchant", comparison: "is", values: ["unrecognized"] }],
  createdAt: "2026-09-03T03:42:02.458Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
