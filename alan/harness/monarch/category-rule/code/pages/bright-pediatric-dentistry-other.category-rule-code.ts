import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const brightPediatricDentistryOther = {
  id: "01a0655b-fccf-700c-9700-31f4a3f22e47",
  type: "page-type/category-rule-code",
  slug: "bright-pediatric-dentistry-other",
  title: "Bright pediatric dentistry other",
  matches: [
    { key: "merchant", comparison: "is", values: ["bright pediatric dentistry"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
