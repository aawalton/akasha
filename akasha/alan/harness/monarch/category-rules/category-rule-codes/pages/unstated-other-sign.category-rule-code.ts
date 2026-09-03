import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const unstatedOtherSign = {
  id: "01a0655b-fcdb-7001-b4ad-ed33e8ad93ee",
  pageTypeSlug: "category-rule-code",
  slug: "unstated-other-sign",
  title: "Unstated other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["unstated"] },
    { key: "account", comparison: "is", values: ["6952"] },
    { key: "sign", comparison: "is-not", values: ["positive"] },
  ],
} as const satisfies CategoryRuleCode
