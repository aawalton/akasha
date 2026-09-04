import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const provoCityUtilitiesOther = {
  id: "01a0655b-fcd1-7003-974b-2ec616e52600",
  pageTypeSlug: "category-rule-code",
  slug: "provo-city-utilities-other",
  title: "Provo city utilities other",
  matches: [
    { key: "merchant", comparison: "is", values: ["provo city utilities"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
