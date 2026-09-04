import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const venmoCashOut = {
  id: "01a0655b-fcdb-7004-a0e8-2eabacb1cfc0",
  pageTypeSlug: "category-rule-code",
  slug: "venmo-cash-out",
  title: "Venmo cash out",
  matches: [
    { key: "merchant", comparison: "is", values: ["standard transfer"] },
    { key: "account", comparison: "is", values: ["Personal Profile"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "transfer",
  counterpartWithinDays: 7,
} as const satisfies CategoryRuleCode
