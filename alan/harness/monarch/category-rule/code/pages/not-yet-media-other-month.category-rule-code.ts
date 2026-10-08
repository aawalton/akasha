import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const notYetMediaOtherMonth = {
  id: "01a0655b-fcd0-702c-b4a1-73359a43919f",
  type: "page-type/category-rule-code",
  slug: "not-yet-media-other-month",
  title: "Not yet media other month",
  matches: [
    { key: "merchant", comparison: "is", values: ["not yet media"] },
    { key: "sign", comparison: "is", values: ["negative"] },
    { key: "month", comparison: "is-not", values: ["july", "september"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
