import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const momsFixedExpenses = {
  id: "01a0655b-fcd0-7026-9ada-ae8a4c287ed9",
  pageTypeSlug: "category-rule-code",
  slug: "moms-fixed-expenses",
  title: "Moms fixed expenses",
  matches: [
    { key: "merchant", comparison: "is", values: ["mom's fixed expenses"] },
    { key: "account", comparison: "is", values: ["Personal Profile"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "ann-rent-assistance",
} as const satisfies CategoryRuleCode
