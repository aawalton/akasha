import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const stateFarmOther = {
  id: "01a0655b-fcda-7004-ba32-0cda134ea51c",
  type: "page-type/category-rule-code",
  slug: "state-farm-other",
  title: "State farm other",
  matches: [
    { key: "merchant", comparison: "is", values: ["state farm"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.458Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
