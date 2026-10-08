import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const telnyxOther = {
  id: "01a0655b-fcda-7007-b5cd-8856c88b19e6",
  type: "page-type/category-rule-code",
  slug: "telnyx-other",
  title: "Telnyx other",
  matches: [
    { key: "merchant", comparison: "is", values: ["telnyx"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.458Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
