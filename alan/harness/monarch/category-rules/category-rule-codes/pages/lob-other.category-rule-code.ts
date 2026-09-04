import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const lobOther = {
  id: "01a0655b-fcd0-7020-bce5-8bf5f718facf",
  pageTypeSlug: "category-rule-code",
  slug: "lob-other",
  title: "Lob other",
  matches: [
    { key: "merchant", comparison: "is", values: ["lob"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
