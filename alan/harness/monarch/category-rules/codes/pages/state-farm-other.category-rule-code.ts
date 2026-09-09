import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const stateFarmOther = {
  id: "01a0655b-fcda-7004-ba32-0cda134ea51c",
  pageTypeSlug: "category-rule-code",
  slug: "state-farm-other",
  title: "State farm other",
  matches: [
    { key: "merchant", comparison: "is", values: ["state farm"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
