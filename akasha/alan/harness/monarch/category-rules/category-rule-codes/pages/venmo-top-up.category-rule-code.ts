import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const venmoTopUp = {
  id: "01a0655b-fcdb-7007-ad7e-4719109a7d45",
  pageTypeSlug: "category-rule-code",
  slug: "venmo-top-up",
  title: "Venmo top up",
  matches: [
    { key: "merchant", comparison: "is", values: ["venmo"] },
    { key: "account", comparison: "is", values: ["4042", "7151"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "transfer",
} as const satisfies CategoryRuleCode
