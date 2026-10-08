import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const jaredJessopConstruction = {
  id: "01a0655b-fcd0-701c-a49a-24214fd2b76c",
  type: "page-type/category-rule-code",
  slug: "jared-jessop-construction",
  title: "Jared jessop construction",
  matches: [{ key: "merchant", comparison: "is", values: ["jared jessop"] }],
  category: "monarch-category/house",
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
