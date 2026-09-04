import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const citiOtherSign = {
  id: "01a0655b-fcd0-7001-bb00-0b2a174dbf38",
  pageTypeSlug: "category-rule-code",
  slug: "citi-other-sign",
  title: "Citi other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["citi"] },
    { key: "account", comparison: "is", values: ["1425"] },
    { key: "sign", comparison: "is-not", values: ["positive"] },
  ],
} as const satisfies CategoryRuleCode
