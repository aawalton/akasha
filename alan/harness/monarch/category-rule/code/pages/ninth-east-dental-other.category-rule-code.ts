import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const ninthEastDentalOther = {
  id: "01a0655b-fcd0-702a-bbdc-9a990623e274",
  type: "page-type/category-rule-code",
  slug: "ninth-east-dental-other",
  title: "Ninth east dental other",
  matches: [
    { key: "merchant", comparison: "is", values: ["ninth east dental"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
