import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const ninthEastDentalOther = {
  id: "01a0655b-fcd0-702a-bbdc-9a990623e274",
  pageTypeSlug: "category-rule-code",
  slug: "ninth-east-dental-other",
  title: "Ninth east dental other",
  matches: [
    { key: "merchant", comparison: "is", values: ["ninth east dental"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
