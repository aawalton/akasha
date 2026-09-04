import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const notYetMediaOtherMonth = {
  id: "01a0655b-fcd0-702c-b4a1-73359a43919f",
  pageTypeSlug: "category-rule-code",
  slug: "not-yet-media-other-month",
  title: "Not yet media other month",
  matches: [
    { key: "merchant", comparison: "is", values: ["not yet media"] },
    { key: "sign", comparison: "is", values: ["negative"] },
    { key: "month", comparison: "is-not", values: ["july", "september"] },
  ],
} as const satisfies CategoryRuleCode
