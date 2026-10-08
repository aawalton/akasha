import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const citiOtherSign = {
  id: "01a0655b-fcd0-7001-bb00-0b2a174dbf38",
  type: "page-type/category-rule-code",
  slug: "citi-other-sign",
  title: "Citi other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["citi"] },
    { key: "account", comparison: "is", values: ["1425"] },
    { key: "sign", comparison: "is-not", values: ["positive"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
