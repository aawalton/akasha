import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const utahDmvRegistration = {
  id: "01a0655b-fcdb-7003-9c50-79517c4f504f",
  pageTypeSlug: "category-rule-code",
  slug: "utah-dmv-registration",
  title: "Utah dmv registration",
  matches: [
    { key: "merchant", comparison: "is", values: ["utah dmv"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "transportation",
} as const satisfies CategoryRuleCode
