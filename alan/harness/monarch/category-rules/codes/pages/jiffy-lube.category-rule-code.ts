import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const jiffyLube = {
  id: "01a0655b-fcd0-701e-9713-4e00a8b1ba31",
  type: "category-rule-code",
  slug: "jiffy-lube",
  title: "Jiffy lube",
  matches: [
    { key: "merchant", comparison: "is", values: ["jiffy lube"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "transportation",
} as const satisfies CategoryRuleCode
