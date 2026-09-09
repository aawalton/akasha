import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const questarGasOtherAccount = {
  id: "01a0655b-fcd1-7005-a8e9-e7fe9ca0902d",
  pageTypeSlug: "category-rule-code",
  slug: "questar-gas-other-account",
  title: "Questar gas other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["questar gas"] },
    { key: "account", comparison: "is-not", values: ["7151"] },
  ],
} as const satisfies CategoryRuleCode
