import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const anthropicOther = {
  id: "01a0655b-fccf-7006-ac32-badc9a970055",
  type: "page-type/category-rule-code",
  slug: "anthropic-other",
  title: "Anthropic other",
  matches: [
    { key: "merchant", comparison: "is", values: ["anthropic"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
