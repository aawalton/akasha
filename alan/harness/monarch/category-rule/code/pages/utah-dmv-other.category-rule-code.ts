import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const utahDmvOther = {
  id: "01a0655b-fcdb-7002-a63a-53b4259f1e3f",
  type: "page-type/category-rule-code",
  slug: "utah-dmv-other",
  title: "Utah dmv other",
  matches: [
    { key: "merchant", comparison: "is", values: ["utah dmv"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.459Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
