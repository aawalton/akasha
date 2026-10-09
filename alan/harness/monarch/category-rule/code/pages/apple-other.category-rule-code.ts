import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const appleOther = {
  id: "01a0655b-fccf-7009-ad67-36ad2415b608",
  type: "page-type/category-rule-code",
  slug: "apple-other",
  title: "Apple other",
  matches: [
    { key: "merchant", comparison: "is", values: ["apple"] },
    { key: "amount", comparison: "is-not", values: ["-106.36", "-21.49"] },
  ],
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-10-09T19:29:44.296Z",
} as const satisfies CategoryRuleCode
