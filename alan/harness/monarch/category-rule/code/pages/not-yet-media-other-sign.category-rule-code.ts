import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const notYetMediaOtherSign = {
  id: "01a0655b-fcd0-702d-92f5-0bca45000569",
  type: "page-type/category-rule-code",
  slug: "not-yet-media-other-sign",
  title: "Not yet media other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["not yet media"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
