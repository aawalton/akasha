import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const ninthEastDental = {
  id: "01a0655b-fcd0-702b-95f8-e828c5c4168e",
  pageTypeSlug: "category-rule-code",
  slug: "ninth-east-dental",
  title: "Ninth east dental",
  matches: [
    { key: "merchant", comparison: "is", values: ["ninth east dental"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "medical",
  ruleNote: "Ninth East Dental",
} as const satisfies CategoryRuleCode
