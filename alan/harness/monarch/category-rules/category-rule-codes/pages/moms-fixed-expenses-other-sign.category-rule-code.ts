import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const momsFixedExpensesOtherSign = {
  id: "01a0655b-fcd0-7025-9a01-569a778d72f4",
  pageTypeSlug: "category-rule-code",
  slug: "moms-fixed-expenses-other-sign",
  title: "Moms fixed expenses other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["mom's fixed expenses"] },
    { key: "account", comparison: "is", values: ["Personal Profile"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
