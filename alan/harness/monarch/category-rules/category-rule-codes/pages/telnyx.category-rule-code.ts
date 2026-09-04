import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const telnyx = {
  id: "01a0655b-fcda-7008-b71e-34c6fe66189d",
  pageTypeSlug: "category-rule-code",
  slug: "telnyx",
  title: "Telnyx",
  matches: [
    { key: "merchant", comparison: "is", values: ["telnyx"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "alans-spending",
} as const satisfies CategoryRuleCode
