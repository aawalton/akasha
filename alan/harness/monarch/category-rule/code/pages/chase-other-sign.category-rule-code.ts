import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const chaseOtherSign = {
  id: "01a0655b-fccf-7016-9bf1-c3715968b450",
  type: "page-type/category-rule-code",
  slug: "chase-other-sign",
  title: "Chase other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["chase"] },
    { key: "account", comparison: "is", values: ["7882"] },
    { key: "sign", comparison: "is-not", values: ["positive"] },
  ],
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
