import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const utahDmvRegistration = {
  id: "01a0655b-fcdb-7003-9c50-79517c4f504f",
  type: "page-type/category-rule-code",
  slug: "utah-dmv-registration",
  title: "Utah dmv registration",
  matches: [
    { key: "merchant", comparison: "is", values: ["utah dmv"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  category: "monarch-category/transportation",
  createdAt: "2026-09-03T03:42:02.459Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
