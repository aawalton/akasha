import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const venmoOtherSign = {
  id: "01a0655b-fcdb-7006-bb68-0673fa1a2d33",
  pageTypeSlug: "category-rule-code",
  slug: "venmo-other-sign",
  title: "Venmo other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["venmo"] },
    { key: "account", comparison: "is", values: ["4042", "7151"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
