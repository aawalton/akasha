import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const grandviewFamilyMedicineOther = {
  id: "01a0655b-fcd0-7017-9eaf-3b2cf2df5a0e",
  pageTypeSlug: "category-rule-code",
  slug: "grandview-family-medicine-other",
  title: "Grandview family medicine other",
  matches: [
    { key: "merchant", comparison: "is", values: ["grandview family medicine"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
