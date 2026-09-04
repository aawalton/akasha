import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const questarGas = {
  id: "01a0655b-fcd1-7007-afd0-00c18223dfa3",
  pageTypeSlug: "category-rule-code",
  slug: "questar-gas",
  title: "Questar gas",
  matches: [
    { key: "merchant", comparison: "is", values: ["questar gas"] },
    { key: "account", comparison: "is", values: ["7151"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "utilities",
  ruleNote: "Natural gas bill",
} as const satisfies CategoryRuleCode
