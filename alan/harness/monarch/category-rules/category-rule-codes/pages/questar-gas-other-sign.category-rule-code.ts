import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const questarGasOtherSign = {
  id: "01a0655b-fcd1-7006-98b4-442723a0cd01",
  pageTypeSlug: "category-rule-code",
  slug: "questar-gas-other-sign",
  title: "Questar gas other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["questar gas"] },
    { key: "account", comparison: "is", values: ["7151"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
