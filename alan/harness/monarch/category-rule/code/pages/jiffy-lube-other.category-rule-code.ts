import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const jiffyLubeOther = {
  id: "01a0655b-fcd0-701d-ac5d-c580b10962ee",
  type: "page-type/category-rule-code",
  slug: "jiffy-lube-other",
  title: "Jiffy lube other",
  matches: [
    { key: "merchant", comparison: "is", values: ["jiffy lube"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
