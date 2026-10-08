import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const provoCityUtilitiesOther = {
  id: "01a0655b-fcd1-7003-974b-2ec616e52600",
  type: "page-type/category-rule-code",
  slug: "provo-city-utilities-other",
  title: "Provo city utilities other",
  matches: [
    { key: "merchant", comparison: "is", values: ["provo city utilities"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.449Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
