import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const edgemontAutoOther = {
  id: "01a0655b-fcd0-700f-b1a8-210d547ac9e7",
  pageTypeSlug: "category-rule-code",
  slug: "edgemont-auto-other",
  title: "Edgemont auto other",
  matches: [
    { key: "merchant", comparison: "is", values: ["edgemont auto"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
