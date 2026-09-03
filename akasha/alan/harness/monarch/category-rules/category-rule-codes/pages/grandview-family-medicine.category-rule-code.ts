import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const grandviewFamilyMedicine = {
  id: "01a0655b-fcd0-7018-b77b-b9feb9d69b89",
  pageTypeSlug: "category-rule-code",
  slug: "grandview-family-medicine",
  title: "Grandview family medicine",
  matches: [
    { key: "merchant", comparison: "is", values: ["grandview family medicine"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "medical",
  ruleNote: "Grandview Family Medicine",
} as const satisfies CategoryRuleCode
