import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const jiffyLubeOther = {
  id: "01a0655b-fcd0-701d-ac5d-c580b10962ee",
  pageTypeSlug: "category-rule-code",
  slug: "jiffy-lube-other",
  title: "Jiffy lube other",
  matches: [
    { key: "merchant", comparison: "is", values: ["jiffy lube"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
