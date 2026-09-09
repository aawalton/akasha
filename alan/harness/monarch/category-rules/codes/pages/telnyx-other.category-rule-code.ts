import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const telnyxOther = {
  id: "01a0655b-fcda-7007-b5cd-8856c88b19e6",
  pageTypeSlug: "category-rule-code",
  slug: "telnyx-other",
  title: "Telnyx other",
  matches: [
    { key: "merchant", comparison: "is", values: ["telnyx"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
