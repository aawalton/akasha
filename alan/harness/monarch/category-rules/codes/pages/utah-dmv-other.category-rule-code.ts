import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const utahDmvOther = {
  id: "01a0655b-fcdb-7002-a63a-53b4259f1e3f",
  pageTypeSlug: "category-rule-code",
  slug: "utah-dmv-other",
  title: "Utah dmv other",
  matches: [
    { key: "merchant", comparison: "is", values: ["utah dmv"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
