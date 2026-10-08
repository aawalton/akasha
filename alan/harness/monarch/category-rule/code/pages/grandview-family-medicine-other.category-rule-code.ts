import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const grandviewFamilyMedicineOther = {
  id: "01a0655b-fcd0-7017-9eaf-3b2cf2df5a0e",
  type: "page-type/category-rule-code",
  slug: "grandview-family-medicine-other",
  title: "Grandview family medicine other",
  matches: [
    { key: "merchant", comparison: "is", values: ["grandview family medicine"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
