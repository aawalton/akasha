import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const target = {
  id: "01a0655b-fcda-7006-bf35-913c3e0e93e2",
  type: "page-type/category-rule-code",
  slug: "target",
  title: "Target",
  matches: [{ key: "merchant", comparison: "is", values: ["target"] }],
} as const satisfies CategoryRuleCode
